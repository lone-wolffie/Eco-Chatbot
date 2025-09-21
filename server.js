import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cors());

const GROQ_API_URL = process.env.GROQ_API_URL;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

app.post("/send", async (req, res) => {
    const { message } = req.body;

    if (!message) return res.status(400).json({ 
        error: "Message is required" 
    
    });

    try {
        const response = await axios.post( GROQ_API_URL,
            {
                model: "llama-3.1-8b-instant", 
                messages: [
                {   //system prompt
                    role: "system",
                    content:
                    `You are EcoChat, a climate-focused assistant. 
                    Always reply in a short, simple bullet-point list. 
                    Avoid long paragraphs. Use the bullet symbol '•'. 
                    Each bullet must be on its own line.
                    After answering, ask the user if they'd like more clarification or examples.
                    Be warm, approachable, and enthusiastic about environmental topics.
                    Show genuine interest in helping the user learn more.
                    Share examples from Kenya where necessary.`
                },
                {
                    role: "user",
                    content:`${message}
                    Start with a brief friendly acknowledgment if appropriate. 
                    Format your answer as bullet points only. 
                    Do not include numbered codes(#1).
                    Add emojis where helpful.
                    Remove all * characters.
                    
                    `,
                },
                ],
                temperature: 0.7,
            },

            {
                headers: {
                Authorization: `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json",
                },
            }
        );

        const reply = response.data.choices[0].message.content;
        res.json({ reply });
    } catch (error) {
        console.error("Groq API error:", error.response?.data || error.message);
        res.status(500).json({
            reply: "Oops! EcoChat couldn't access the information😬. Please try again.",
            details: error.response?.data || error.message,
        
        });
    }

});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);

});

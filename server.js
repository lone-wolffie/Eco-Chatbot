import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();


const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Hugging Face API configuration
const HF_API_URL = "https://api-inference.huggingface.co/models/google/flan-t5-large";

const HF_HEADERS = {
    "Authorization": `Bearer ${process.env.HF_ACCESS_TOKEN}`,
    "Content-Type": "application/json"
};

app.get("/", async (req, res) => {
    const result = res.json(
        {ok: true});
    console.log(result);
});

app.post("/send", async (req, res) => {
    try {
        const {message, parameters} = req.body;

        if (!message) {
            return res.status(400).json({
                error: "Input text is required"
            });
        }

        const payload = {
            inputs: message,
            parameters: parameters || {}
        };

        const response = await axios.post(HF_API_URL, payload, { 
            headers: HF_HEADERS });
        
        let modelReply = "🤖 Sorry, I couldn't generate a reply.";

        if (Array.isArray(response.data) && response.data[0].generated_text) {
        modelReply = response.data[0].generated_text;
        }

        res.json({ reply: modelReply });


    } catch (error) {
        console.error("Error calling Hugging Face API:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to process request with Hugging Face API." });
    }

});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})
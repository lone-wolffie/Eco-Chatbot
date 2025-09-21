# 🌍 EcoChat – AI Climate Assistant

EcoChat is a chatbot web app that helps users learn about climate change, recycling and sustainability.

## Tech Stack Used
1. Frontend
   - HTML5
   - CSS3
   - JavaScript (Vanilla)
2. Backend
   - Node.js + Express.js
   - GroqAI API Key and Url

## 🌐 Deployment
The project is deployed on Render and can be accessed using https://eco-chatbot-jw6x.onrender.com

## 🚀 Features
- Ask questions about climate, recycling, or sustainability
- AI-powered responses from GroqAI

- Light/Dark mode toggle (🔆 / 🌙)

- Timestamps on messages

- User(🧑🏽‍🦱) and Bot(🤖) avatars

- Tracks number of answered questions

- Responsive and modern UI

## Project Structure
```bash
ecochat/
├── public/         
│   ├── index.html    
│   ├── styles.css     
│   └── script.js       
├── server.js            
├── .env               
├── package.json         
└── README.md            
```

## How It Works
1. Frontend
- `index.html` renders the chatbot interface.
- `styles.css` defines light/dark mode and styling.
-  `script.js` handles sending/receiving messages, typing indicators, and avatars.
2. Backend(server.js)
- Runs an Express server on http://localhost:3000.
- Uses the GroqAI API to generate chatbot responses.
- Receives user messages via /send endpoint and sends back AI replies.
3. Environment Variables
- `.env` file stores your GroqAI API key, GroqAI Url and port number.

## 🛠️ Installation & Setup
1. Clone the repository
```bash
git clone https://github.com/your-username/Eco-Chatbot.git
cd Eco-Chatbot
```

2. Install all dependecies
```bash
npm install
```

3. Set up `.env` file
```bash
GROQ_API_KEY=your-secret-api-key
GROQ_API_URL=your-groq-url
PORT=your-port-number
```

4. Start the server
```bash
node server.js
```
OR
```bash
nodemon server.js
```
5. Open the App
- Go to `http://localhost:3000` in your browser

### Scripts
In `package.json` you can define
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```
- Run normally `npm start` or `npm run dev`

## Contribution
Feel free to fork the repository and submit pull requests for improvements or additional features.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


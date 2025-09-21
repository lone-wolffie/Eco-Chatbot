const chatbox = document.getElementById("chatbox");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const questionsAnsweredElement = document.getElementById("questionsAnswered");

let questionsAnswered = 0;

// Add message to the chat
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", isUser ? "user-message" : "bot-message");

    const avatar = document.createElement("div");
    avatar.classList.add("user-avatar");
    avatar.textContent = isUser ? "🧑🏽‍🦱" : "🤖";

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("message-content");

    const bubble = document.createElement("div");
    bubble.classList.add("message-bubble");
    bubble.innerHTML = text;

    const timestamp = document.createElement("div");
    timestamp.classList.add("timestamp");
    timestamp.textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    contentDiv.appendChild(bubble);

    // Create container for timestamp & avatar
    const metaRow = document.createElement("div");
    metaRow.classList.add("meta-row");
   
    // Add avatar to metaRow class if it's a user message
    if (isUser) {
        metaRow.appendChild(timestamp);
        metaRow.appendChild(avatar);
    } else {
        messageDiv.appendChild(avatar);
        metaRow.appendChild(timestamp);
    }

    contentDiv.appendChild(bubble);
    contentDiv.appendChild(metaRow);
    messageDiv.appendChild(contentDiv);

    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight;

}

// Typing indicator
function addTypingIndicator() {
    const indicator = document.createElement("div");
    indicator.id = "typingIndicator";
    indicator.classList.add("message", "bot-message");

    indicator.innerHTML = `
        <div class="avatar">🤖</div>
        <div class="message-content">
        <div class="message-bubble">. . .</div>
        </div>
    `;

    chatbox.appendChild(indicator);
    chatbox.scrollTop = chatbox.scrollHeight;

}

function removeTypingIndicator() {
    const indicator = document.getElementById("typingIndicator");
    if (indicator) indicator.remove();

}

// Send message
async function sendMessage(message) {
    if (!message.trim()) {
        return "Please enter a text.";
    }

    addMessage(message, true);
    userInput.value = "";

    addTypingIndicator();

    try {
        const res = await fetch("http://localhost:3000/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });

        const data = await res.json();

        removeTypingIndicator();
        addMessage(data.reply.replace(/\n/g, "<br>"));

        questionsAnswered++;
        questionsAnsweredElement.textContent = questionsAnswered;
    } catch (err) {
        console.error("Backend error:", err);
        removeTypingIndicator();
        addMessage("Sorry, I'm having trouble connecting to my brain right now.");
    }
}

// Form submission
chatForm.addEventListener("submit", e => {
    e.preventDefault();
    sendMessage(userInput.value);
});

// Suggestion chip 
function fillSuggestion(text) {
    userInput.value = text;
    sendMessage(text);
}

// Light/Dark Mode Toggle
const toggleBtn = document.getElementById("toggleTheme");
const body = document.body;

toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Change icon depending on mode
    if (body.classList.contains("dark-mode")) {
        toggleBtn.textContent = "🔆"; // Sun for light mode
        toggleBtn.title = "Switch to Light Mode";
    } else {
        toggleBtn.textContent = "🌙"; // Moon for dark mode
        toggleBtn.title = "Switch to Dark Mode";
    }
});

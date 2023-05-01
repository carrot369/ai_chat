const form = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");
const chatWindow = document.getElementById("chat-window");

const API_ENDPOINT = "https://api.openai.com/v1/chat/completions";
const OPENAI_API_KEY = "<YOUR_OPENAI_API_KEY>";

function sendMessage(message) {
  const requestParams = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: message }],
  };
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify(requestParams),
  };

  fetch(API_ENDPOINT, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      const message = data.choices[0].text.trim();
      appendMessage("incoming", message);
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });
}

function appendMessage(role, text) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("chat-message", role);
  messageElement.innerText = text;
  chatWindow.appendChild(messageElement);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value.trim();
  if (message !== "") {
    appendMessage("outgoing", message);
    sendMessage(message);
    messageInput.value = "";
  }
});

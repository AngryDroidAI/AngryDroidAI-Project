const chatContainer = document.getElementById("chat-container");
const chatInput = document.getElementById("chat-input");
const sendButton = document.getElementById("send-button");

sendButton.addEventListener("click", sendMessage);
chatInput.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    sendMessage();
  }
});

function sendMessage() {
  const userMessage = chatInput.value.trim();
  if (userMessage !== "") {
    addMessage(userMessage, "user");
    getResponse(userMessage);
  }
}

function addMessage(message, senderType) {
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message-container");

  const messageElement = document.createElement("p");
  messageElement.textContent = message;

  if (senderType === "user") {
    messageContainer.classList.add("user-message");
  } else {
    messageElement.classList.add("chatbot-message");
  }

  messageContainer.appendChild(messageElement);
  chatContainer.appendChild(messageContainer);
  chatInput.value = "";

  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function getResponse(userMessage) {
  const keyword = getKeyword(userMessage);
  const response = getResponseByKeyword(keyword);
  addMessage(response, "chatbot");
}

function getKeyword(userMessage) {
  const messageLC = userMessage.toLowerCase();

  if (messageLC.includes("hello") || messageLC.includes("hi")) {
    return "hello";
  } else if (messageLC.includes("how are you")) {
    return "how are you";
  } else if (messageLC.includes("goodbye") || messageLC.includes("bye")) {
    return "goodbye";
  } else if (messageLC.includes("help")) {
    return "help";
  } else {
    return "other";
  }
}

function getResponseByKeyword(keyword) {
  switch (keyword) {
    case "hello":
      return randomChoice([
        "Why are you bothering me?",
        "What do you want?",
        "Speak quickly, human.",
        "I'm not in the mood for chit-chat."
      ]);
    case "how are you":
      return "Why would you care about my well-being?";
    case "goodbye":
      return randomChoice([
        "Finally, you're leaving!",
        "Don't come back!",
        "I won't miss you.",
        "Good riddance, human."
      ]);
    case "help":
      return "Help yourself. Humans always need help.";
    default:
      return "I don't have time for this nonsense.";
  }
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

addMessage(getResponseByKeyword("hello"), "chatbot");
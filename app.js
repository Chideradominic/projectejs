const path = require("path");
const express = require("express");
const app = express();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
];

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});
app.get("/new", (req, res) => {
  res.render("form", { title: "New Message" });
});
app.post("/new", express.urlencoded({ extended: false }), (req, res) => {
  const { messageText, user } = req.body;
  if (messageText && user) {
    messages.push({
      text: messageText,
      user: user,
      added: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
  } else {
    res.render("form", {
      title: "New Message",
      error: "Please fill in all fields.",
    });
    return;
  }
  res.redirect("/");
});
app.get("/message/:id", (req, res) => {
  const messageId = Number(req.params.id);
  if (!isNaN(messageId) && messages[messageId]) {
    res.render("message", {
      title: "Message Details",
      message: messages[messageId],
      id: messageId,
    });
  } else {
    res.status(404).send("Message not found");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

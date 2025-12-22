const express = require("express");
const app = express();

app.get("/hello", (req, res) => {
  res.send("Hello World");
});

app.post("/login", (req, res) => {
  res.send("Login");
});

app.listen(3000);


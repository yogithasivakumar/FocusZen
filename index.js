const express = require("express");
const app = express();

app.get("/status", (req, res) => res.send("ok"));
app.post("/login", (req, res) => {});
app.put("/users/:id", (req, res) => {});

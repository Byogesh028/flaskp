const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fetch = require("node-fetch"); // for POST to Flask

const app = express();
const PORT = process.env.PORT || 3000;

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// GET: render form (similar to Flask Assignment 2)
app.get("/", (req, res) => {
  res.render("form");
});

// POST: receive form, forward to Flask backend
app.post("/submit", async (req, res) => {
  const formData = {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    message: req.body.message,
  };

  try {
    // IMPORTANT: use service name "backend" (from docker-compose) not localhost
    // const response = await fetch("http://backend:5000/process-form", {

    const response = await fetch("http://172.31.5.67:5000/process-form", {

      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    console.log("Response status from Flask backend:", response);
    const result = await response.json();
    // For assignment, either show raw JSON or render a result page
    res.render("form", { result });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error communicating with Flask backend");
  }
});

app.listen(PORT, () => {
  console.log(`Frontend listening on port ${PORT}`);
});

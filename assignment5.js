const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 8000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Serve index.html as the main page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Route to serve Weapons.html as an HTML snippet
app.get("/weapons-html", (req, res) => {
    fs.readFile(path.join(__dirname, "public", "data", "Weapons.html"), "utf8", (err, data) => {
        if (err) {
            res.status(500).send("Error loading Weapons.html");
            return;
        }
        res.setHeader("Content-Type", "text/html");
        res.send(data);
    });
});

// Route to serve weapons.js as JSON data
app.get("/weapons-json", (req, res) => {
    fs.readFile(path.join(__dirname, "public", "data", "weapons.json"), "utf8", (err, data) => {
        if (err) {
            res.status(500).send("Error loading weapons.js");
            return;
        }
        res.setHeader("Content-Type", "application/json");
        res.send(data);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});

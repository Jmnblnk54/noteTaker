// Dependencies
// =============================================================
var express = require("express");
var db = require ("../db.json");
var path = require("path");
var fs = require ("fs");

console.log(db);

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

// If no matching route is found default to home
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});




app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
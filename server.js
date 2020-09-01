// Dependencies
// =============================================================
var express = require("express");
var db = require("./data/db.json");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/api/notes", function (req, res) {
  res.json(db);
});

app.post("/api/notes", function (req, res) {
  let newNote = req.body;
  db.push(newNote);
  console.log(db, "NOTES");
  res.send(db)
});

app.delete("/api/notes/:id", function (req, res) {
    const noteId = req.params.id;
    console.log("Here's the noteID: ", noteId)
    db.splice(noteId-1, 1);
    res.send(db)
});

// If no matching route is found default to home
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});

// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
import { v4 as uuidv4 } from "uuid";

// Sets up the Express App
// =============================================================
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static(path.join(__dirname, './public')));

// GET Routes
// =============================================================

// Return the notes.html page.
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});

// Webpage after get notes button is hit.
app.get("/api/notes", function (req, res) {
  // TODO get the notes contained in the notes.db
  // Read the notes into a variable and return the variable.
});

// Home route.
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// POST Routes
// =============================================================

app.post("/api/notes", function (req, res) {
  // TODO get the notes contained in the notes.db
  // -- add the current note being sent to the "database" to the other notes
  // -- write all the notes with fs.writefile with a unique id.
});

// DELETE Routes
// =============================================================

app.delete("/api/notes/:id", function (req, res) {
  // Get the current notes in notes.db.
  // Loop over them and delete the one equal to id being provided.
  // Write notes back into db.
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});

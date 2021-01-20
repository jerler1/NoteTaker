// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const { stringify } = require("querystring");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));

// GET Routes
// =============================================================

// Return the notes.html page.
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Webpage after get notes button is hit.
app.get("/api/notes", function (req, res) {
  // TODO get the notes contained in the notes.db
  const data = JSON.parse(
    fs.readFileSync("./db/db.json", { encoding: "utf-8" })
  );
  // Read the notes into a variable and return the variable.
  return res.json(data);
});

// POST Routes
// =============================================================

app.post("/api/notes", function (req, res) {
  // Get the notes contained in the notes.db
  const dataStored = JSON.parse(
    fs.readFileSync("./db/db.json", { encoding: "utf-8" })
  );
  // -- add the current note being sent to the "database" to the other notes
  const dataIncoming = req.body;
  dataIncoming.id = uuidv4();
  dataStored.push(dataIncoming);
  const stringData = JSON.stringify(dataStored);
  fs.writeFileSync("./db/db.json", stringData, {
    encoding: "utf-8",
  });

  // -- write/return all the notes with fs.writefile with a unique id.
  res.end();
  return stringData;
});

// DELETE Routes
// =============================================================

app.delete("/api/notes/:id", function (req, res) {
  // Get the current notes in notes.db.
  const currentData = JSON.parse(
    fs.readFileSync("./db/db.json", { encoding: "utf-8" })
  );
  const idGiven = req.params.id;
  // Loop over them and delete the one equal to id being provided.
  const newData = currentData.filter(function (note) {
    return note.id !== idGiven;
  });
  const mapData = currentData.map(function (note) {
    if (note.id !== idGiven) {
      return note;
    }
  });
  console.log(mapData);
  // Write notes back into db.
  const stringData = JSON.stringify(newData);
  fs.writeFileSync("./db/db.json", stringData, {
    encoding: "utf-8",
  });
  res.end();
  return stringData;
});

// Home route.
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});

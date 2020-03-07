// Global Variables
//================================
const express = require("express");
const path = require("path");
var http = require("http");
var fs = require("fs");

// Create Server
//==============================
var PORT = 3060;
var server = http.createServer(handleRequest);
function handleRequest(req, res) {
  var path = req.url;
}

// sets up the express app 
//===============================
var app = express();
var port = process.env.PORT || 3060;

// sets up Express App to Handle Data Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Data
//=========================

//=========================

//Routes
//=========================
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
    });

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
    });   

app.post("/db.json"), (req, res) => {
    res.send("/api/notes")
}


// Listener
// ===========================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
// Global Librarys we are Calling
//================================
const express = require("express");
const path = require("path");
var http = require("http");
// var fs = require("fs");
const apiRoutes = require("./apiRoutes");
const htmlRoutes = require("./htmlRoutes");


// Create Server
//==============================
var app = express();
// var PORT = process.env.PORT || 3060;

// sets up the express app 
//===============================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("Develop"));// says that the static folder where 
app.use("/api", apiRoutes); // so this tells the server sees /api it will know to use API routes
app.use("/", htmlRoutes);

// Listener
// ===========================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
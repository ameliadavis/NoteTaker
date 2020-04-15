const router = require("express").Router();
const fs = require("fs");
const HTTP = require("http");
const util = require("util");
const uuidv1 = require('uuid/v1')
//var uuidv1 = require('uuidv1')
var uuid = require('uuid');
//const uuidv1 = require('uuid/v1');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
let count = 0;
// API routes (what to do when actions happen)
router.get("/notes", (req, res) => {
    //readNotes().then(data => res.json(console.log(data)))
    readNotes().then((notes) => {res.json(notes)})
    .catch(err => res.status(500).json(err));//filter function);
    });
router.post("/notes", (req, res) => {
    console.log("in post router");
    writetoAPI(req.body)
    .then((notes) => {res.json(notes)})
    .catch(err => res.status(500).json(err));
});
//"/api/notes"
router.delete('/notes/:id', function (req, res) {
    deleteNote(req)
    .then((notes) => {res.json(notes)})
    .catch(err => res.status(500).json(err));
})
//================================================
// Functions Logic _ Where we actually tell it what to do
//================================================
function readNotes() {
    return readFileAsync("./Develop/db/db.json", "utf8").then(notes => {
      let parsedFile;
      // If notes isn't an array or can't be turned into one, send back a new empty array
      try {
        parsedFile = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedFile = [];
      }
     console.log(parsedFile);
      return parsedFile;
    });
  }
//write api to json  
//function writetoAPI(){
function writetoAPI (enteredNote){
    const { title, text } = enteredNote;
    // var count = 0
    // readNotes().then(function(value){
    //   console.log("Value" + value)
    //   count = value.length
    // })
    // // console.log("readNotes array "+ totalNotes)
    // count++;
    // console.log("count"+ count);
    const newNotesObj = { id: uuidv1(), title, text };
    return readNotes()
    // .then(count= notes.length, console.log("count length"+ count))
    .then(notes => [...notes, newNotesObj])
    .then(file => writeFileAsync("./Develop/db/db.json", JSON.stringify(file))
    .then(() => newNotesObj)
    //.then(readNotes())
    )};


 function deleteNote (req,res){ 
        var filteredNotes = []
        console.log("Inside delete Note function")
        console.log(req.params.id);
        let requestId = parseInt(req.params.id)
      readNotes().then(function(value){
      for(var i = 0; i < value.length; i++){
            console.log("Value at i")
            console.log(value[i]);
            console.log(value[i].id);
            console.log("requestID")
            console.log(requestId)
          if(parseInt(value[i].id) !== requestId){
            filteredNotes.push(value[i]);
          }
      }
      console.log("filtered Notes")
      console.log(filteredNotes)
        writeFileAsync("./Develop/db/db.json", JSON.stringify(filteredNotes))
        console.log("Filtered Notes in the write file")
        console.log(filteredNotes); 
    })
    // console.log("Filtered Notes after Delete " + JSON.stringify(filteredNotes)))
    .then(() => filteredNotes)
    //  )}
     };
    
console.log("InAPI routes");
module.exports = router;
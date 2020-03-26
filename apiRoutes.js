const router = require("express").Router();
const fs = require("fs");
const HTTP = require("http");
const util = require("util");
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
    //deleteNote(req).then() ;
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
    count++;
    const newNotesObj = { id: count, title, text };
    return readNotes()
    .then(notes => [...notes, newNotesObj])
    .then(file => writeFileAsync("./Develop/db/db.json", JSON.stringify(file))
    .then(() => newNotesObj)
    //.then(readNotes())
    )};
 
 function deleteNote (req,res){ 
        console.log("Inside delete Note function")
        console.log(req.params.id);
        let requestId = parseInt(req.params.id)
        // readNotes()
        //all this should go after readNotes... 
        //.then(randomVariable => randomVariable.filter(newRandomVariable => newRandomVariable.id !== req.params.id)) 
        //.then(file => writeFileAsync("./Develop/db/db.json", JSON.stringify(file))// this should go anythere after read
      readNotes(requestId).then(function(value){
      var filteredNotes = []
      for(var i = 0; i < value.length; i++){
        console.log("Value at i")
        console.log(value[i]);
        console.log(value[i].id);
        console.log("requestID")
        console.log(requestId)
        //console.log("req.params.id here")
        //console.log(req.params.id)
          if(parseInt(value[i].id) !== requestId){
            filteredNotes.push(value[i]);
          }
      }
      console.log("filtered Notes")
      console.log(filteredNotes)})
    // on this line note => is the same as a for loop or foreach
    .then(filteredNotes => writeFileAsync("./Develop/db/db.json", JSON.stringify(filteredNotes)),
    console.log("Filtered Notes after Delete" + filteredNotes)
    .then(() => filteredNotes)
    //.then(readNotes())
    //.then(() => notes)
    )};
    
console.log("InAPI routes");
module.exports = router;
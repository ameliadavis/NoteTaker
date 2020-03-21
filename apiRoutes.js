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
    writetoAPI(req.body);
    //writetoAPI().then(notes => res.json(JSON.parse(notes)))
    //.catch(err => console.log(err));;
});
//"/api/notes"
router.delete('/notes/:id', function (req, res) {
    //deleteNote(req).then() ;
    deleteNote(req);
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
    )};
 
 function deleteNote (req,res){ 
        console.log("Inside delete Note function")
        console.log(req.params.id);
    readNotes().then(function(value){
      var filteredNotes = []
      for(var i = 0; i < value.length; i++){
        console.log("Value at i")
        console.log(value[i]);
        console.log(value[i].id);
        console.log("req.params.id")
        console.log(req.params.id)
          if(parseInt(value[i].id) !== parseInt(req.params.id)){
            filteredNotes.push(value[i]);
          }
      }
      console.log("filtered Notes")
      console.log(filteredNotes)})
    // on this line note => is the same as a for loop or foreach
    .then(notes => writeFileAsync("./Develop/db/db.json", JSON.stringify(notes)),
    )};
    
console.log("InAPI routes");
module.exports = router;
// const router = require("express").Router();
// const fs = require("fs");
// const HTTP = require("http");
// const util = require("util");
// const notesArray = []
// const readFileAsync = util.promisify(fs.readFile);
// const writeFileAsync = util.promisify(fs.writeFile);


// // API routes (what to do when actions happen)
// router.get("/notes", (req, res) => {
//     //readNotes().then(data => res.json(console.log(data)))
//     readNotes().then((notes) => {res.json(JSON.parse(notes))})
//     .catch(err => res.status(500).json(err));//filter function);
//     });

// router.post("/notes", (req, res) => {
//     console.log("in post router");
//     writetoAPI(req,res);
//     //writetoAPI().then(notes => res.json(JSON.parse(notes)))
//     //.catch(err => console.log(err));;
// });
// //"/api/notes"

// router.delete('/notes/:id', function (req, res) {
//     deleteNote().then() ;
// })

// //================================================
// // Functions Logic _ Where we actually tell it what to do
// //================================================
// function readNotes(req,res){
//     console.log("inReadNote");
//         return readFileAsync("./Develop/db/db.json", "utf8"); 
// }
// //write api to json  
// //function writetoAPI(){
// function writetoAPI (req, res){
//     console.log("in WritetoAPI");
//     readFileAsync("./Develop/db/db.json","utf8")
//     // .then((file) => {res.json(JSON.parse(file))})
//     .then((file) => {let parsedFile;
//         try{ console.log("write file: " + file)
//             var newNote = "title: " + req.body.title + "text: "+ req.body.text;
//             //var newNoteTitle = {};
//             // var newNoteText = {}
//             // var newArray = [];
//             newNoteTitle = req.body.title
//             newNoteText = req.body.text
//             console.log(newNoteTitle + " " + newNoteText);
//             // newArray.push(newNoteTitle,newNoteText);
//             //console.log("newArray" + newArray);
//             //var newNote = req.json(JSON.parse(req.body))
//             var newNote = { title: newNoteTitle, text: newNoteText}
//             //var newNote = {id: lastNote++, "'title: '" + req.body.title, "'text: '"req.body.text}
//             console.log("New Note " + newNote);
//             //lastNote = file.length + 1 || 1;
//             //console.log("last note"  + lastNote);
//             var testArray = [...file,newNote];
//             console.log(testArray);
//             file.push(newNote);
//             console.log ("new File "+ file);
//              fs.writeFile("./Develop/db/db.json","utf8", JSON.stringify(file)).then(
//                  function(){
//                     console.log("success - file written")
//                      res.json(req.body);
//                  }
//               )
//         } catch(err) { parsedFile= [];
//             //throw err
//         } 
//       // need a post here 
//     });
//  };
// //}

// //  async function readNotes(req,res){
// //    console.log("inReadNote");
// //    let file = await fs.readFile("./Develop/db/db.json", "utf8", (err) => {
// //        req.json(JSON.parse(file))
// //        console.log("Got file: " + file)
// //    });
// //  }

 
//  function deleteNote (req,res){ 
//      console.log(req);
//     const originalArray = JSON.parse(dbJson)
//         console.log(originalArray);
//         console.log(req.params.id)
//         for (var i = 0; i < originalArray.length; i++){
//             if(req.params.id === originalArray.id){
//             console.log("ID selected to delete");
//             originalArray.filter()
//             } else{
//             console.log(res);
//             }
//         }
//      // req.params.id Will be passed into this function to make it work
//      // parse the json array and then loop through by the ID and remove that ID then restringify and write the file
   
//  }

// console.log("InAPI routes");
// module.exports = router;

const router = require("express").Router();
const fs = require("fs");
const HTTP = require("http");
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
let count = 2;
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
    deleteNote().then() ;
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
     console.log(req);
    const originalArray = JSON.parse(dbJson)
        console.log(originalArray);
        console.log(req.params.id)
        for (var i = 0; i < originalArray.length; i++){
            if(req.params.id === originalArray.id){
            console.log("ID selected to delete");
            originalArray.filter()
            } else{
            console.log(res);
            }
        }
     // req.params.id Will be passed into this function to make it work
     // parse the json array and then loop through by the ID and remove that ID then restringify and write the file
   
 }
console.log("InAPI routes");
module.exports = router;
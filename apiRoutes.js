const router = require("express").Router();
const fs = require("fs");
// const index = require("index.js")
// const dbJson = require("db.json")

// API routes (what to do when actions happen)
router.get("/notes", (req, res) => {
    readNotes(req.body);// read current notes, parse and display 
    // console.log("response in get route" + res);
    // return res.send();
    });

router.post("/notes", (req, res) => {
    writetoAPI(req);
});
//"/api/notes"

router.delete('/notes/:id', function (req, res) {
    deleteNote();
})

// Functions Logic _ Where we actually tell it what to do
//================================================

//write api to json  
function writetoAPI (note){
    var test = JSON.parse(note)
    console.log("write to API file" + test); // since we are passing the whole body HTML
    infoToWrite = JSON.parse(test);
    fs.writeFile("Develop/db/db.json", test, (err)=>{ //read JSON, parse JSON into an array, append the array, then stringify the array then write to the file 
     if(err) throw err; 
     
     })
     // need a post here 
 };
 
 function readNotes(data){
   console.log("inReadNote");
   fs.readFile("./Develop/db/db.json", (err, data)=> {
       if (err) throw err;
       let readMe = JSON.parse(data);
       console.log(readMe);
       // how the hell do I send it to the html to display? 
        // return JSON.stringify(readMe);
        //return readMe;
        //send to getnotes function in index.js
   });
  
 }
 
 function deleteNote (req,res){ 
     console.log(req);
    // const originalArray = JSON.parse(dbJson)
    //     console.log(originalArray);
    //     console.log(req.params.id)
    // for (var i = 0; i < originalArray.length; i++){
    //     if(req.params.id === originalArray.id){
    //        console.log("ID selected to delete");
    //     } else{
    //        console.log(res);
    //     }
    // }
     // req.params.id Will be passed into this function to make it work
     // parse the json array and then loop through by the ID and remove that ID then restringify and write the file
   
 }

console.log("InAPI routes");
module.exports = router;
const path = require("path");
const router = require("express").Router();


router.get("/", (req, res) => {
    console.log(__dirname);
      res.sendFile(path.join(__dirname, "Develop/public/index.html"));
    });
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "Develop/public/notes.html"));
      });// correct!! 

module.exports = router;
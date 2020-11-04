const fs = require("fs");
let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));


module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
        res.json(notes);
    });
 
    app.post("/api/notes", function(req, res) {

        let newNote = req.body;
        let noteID = (notes.length).toString();
        newNote.id = noteID;
        notes.push(newNote);

        fs.writeFileSync("./db/db.json", JSON.stringify(notes), function(err) {
            if (err) throw (err);        
        });
        res.json(notes);
        console.log(newNote, "Has been successfully added to your notes!");
        console.log("Here are your updated notes:",notes);    
    });

    app.delete("/api/notes/:id", function(req, res) {

        let noteId = req.params.id;
        let newId = 0;
        console.log(`Deleting note with ID number = ${noteId}`);
        notes = notes.filter(currentNote => {
           return currentNote.id != noteId;
        });
        for (currentNote of notes) {
            currentNote.id = newId.toString();
            newId++;
        }
        fs.writeFileSync("./db/db.json", JSON.stringify(notes));
        res.json(notes);
        console.log("Here are your updated notes:", notes);
    }); 

}



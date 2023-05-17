const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Note = require('../models/Note');
const { query, validationResult, body } = require('express-validator');



// Route 1 : Get all the notes  using GET : "/api/notes/fetchallnotes" login required 

router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route 2 : Add a new note using POST : "/api/notes/addnote" login required 

router.post('/addnote', fetchUser, [
    body('title').isLength({ min: 2 }).withMessage('Enter a valid title, title should be atleast 2 characters'),
    body('description').isLength({ min: 5 }).withMessage('Enter a valid description, description should be atleast 5 characters'),

], async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // If there is any error return Bad Request and the error 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save();
        res.json(saveNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route 3 : Update a new note using POST : "/api/notes/updatenote" login required 
router.put('/updatenote/:id', fetchUser, [], async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //create a new note object 
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };
        // Find the note to be updated and update the note
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

// Route 4 : delete a new note using delete : "/api/notes/deletenote" login required 
router.delete('/deletenote/:id', fetchUser, [], async (req, res) => {
    try {
        // Find the note to be delete and delete the note
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }
        // Allow deleteion if the user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted Successfully " });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

module.exports = router
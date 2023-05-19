import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext"

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleclick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Notes added Successfully","success")
    }

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className="container my-3" style={{ maxWidth: "750px" }}>
                <form>
                    <h2 className='text-center text-primary font-monospace fw-bolder'>Add New Note</h2>
                    <div className="my-2">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" onChange={onchange} placeholder="Enter Title of your note here..." minLength={5} required value={note.title}/>
                    </div>
                    <div className="my-2">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" name="description" rows="3" value={note.description} onChange={onchange} minLength={5} required  ></textarea>
                    </div >
                    <div className="input-group flex-nowrap my-4">
                        <span className="input-group-text" id="tag"><i className="fa-solid fa-tag"></i></span>
                        <input type="text" className="form-control" placeholder="Tag" name='tag' aria-label="tag" value={note.tag} aria-describedby="addon-wrapping" onChange={onchange} minLength={3} required />
                    </div>
                    <div className="d-grid gap-2 col-6 mx-auto">
                        <button className="btn btn-primary" type="submit" onClick={handleclick}>Save Note</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddNote

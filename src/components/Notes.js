import React, { useContext, useEffect, useRef, useState } from 'react'
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import noteContext from "../context/notes/noteContext"
import { useNavigate } from 'react-router-dom';



const Notes = (props) => {
    let navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;

    useEffect(() => {
        if (localStorage.getItem('token')) {
            // console.log((localStorage.getItem('token')));
            getNotes()
        }else{
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [])
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const ref = useRef(null)
    const refClose = useRef(null)

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }
    const handleclick = () => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        props.showAlert("Notes updated Successfully", "success")


    }

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <AddNote showAlert={props.showAlert} />
            {/* Modal  */}

            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 font-monospace fw-bolder" id="exampleModalLabel">Update Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="my-2">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onchange} placeholder="Enter Title of your note here..." minLength={5} required />
                                </div>
                                <div className="my-2">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea className="form-control" id="edescription" name="edescription" value={note.edescription} rows="3" onChange={onchange} minLength={5} required></textarea>
                                </div >
                                <div className="input-group flex-nowrap my-4">
                                    <span className="input-group-text" id="etag"><i className="fa-solid fa-tag"></i></span>
                                    <input type="text" className="form-control" placeholder="Tag" name='etag' value={note.etag} aria-label="etag" aria-describedby="addon-wrapping" onChange={onchange} minLength={3} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleclick} className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" row my-2">
                <h2>Your Notes</h2>
                <div className="contaner text-muted font-monospace fw-bolder ">
                    {notes.length === 0 && "No notes to diplay"}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />;
                })}
            </div>
        </>

    )
}

export default Notes

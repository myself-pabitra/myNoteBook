import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext"

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;

    const { note,updateNote } = props;
    return (
                <div className="col-md-3">
                    <div className="card my-3">
                        <div className="card-body">
                            <h5 className="card-title">{note.title}</h5>
                            <p className="card-text">{note.description}</p>
                            <div className="tag">
                            <i className="fa-solid fa-tag me-1"></i>
                            <p>{note.tag}</p>
                            </div>
                            <i className="fa-sharp fa-solid fa-trash fa-lg mx-2" onClick={()=>{deleteNote(note._id);props.showAlert("Notes deleted Successfully","success")}}></i>
                            <i className="fa-regular fa-pen-to-square fa-lg mx-2" onClick={()=>{updateNote(note)}}></i>
                        </div>
                    </div>
                </div>

    )
}

export default Noteitem

//child
import React, { useContext } from 'react'
import noteContext from '../../Context/Note/NoteContext';

const Noteitem = (props) => {

    const context = useContext(noteContext);
    const { deleteNote, savednotes} = context;
    const { note, updatenote } = props;

    return (
        <div className='col-md-3'>
            <div className="card">
                <div className="card-body">

                    <div className='d-flex align-items-center justify-content-between'>

                        <h5 className="card-title">{note.title}</h5>
                        <div className='d-flex align-items-center'>
                            <i className="fa-solid fa-trash mx-2" onClick={() => {
                                deleteNote(note._id);
                            }}></i>
                            <i className="fa-solid fa-pen-to-square mx-2" onClick={() => {
                                updatenote(note);
                            }}></i>
                            <i className="fa-solid fa-floppy-disk  mx-2" onClick={() => {
                                savednotes(note._id)
                            }}></i>
                        </div>

                    </div>
                    <p className="card-text">{note.description}</p>

                </div>
            </div>
        </div>
    )
}

export default Noteitem

import React, { useContext, useState } from 'react';
import noteContext from '../../Context/Note/NoteContext';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote, savednotes } = context;
    const { note, updatenote } = props;
    const [showFullNote, setShowFullNote] = useState(false);

    const toggleShowFullNote = () => {
        setShowFullNote(!showFullNote);
    }

    return (
        <div className='col-md-3'>
            <div className="card">
                <div className="card-body">

                    <div className='d-flex align-items-center justify-content-between'>
                        <h5 className="card-title">{note.title.length > 5 ? (
                            <div>
                                <p className="card-text">{note.title.substring(0, 10)}...</p>
                            </div>) : (
                            <p className="card-text">{note.title}</p>

                        )}</h5>
                        <div className='d-flex align-items-center'>
                            <i className="fa-solid fa-trash mx-2" onClick={() => deleteNote(note._id)}></i>
                            <i className="fa-solid fa-pen-to-square mx-2" onClick={() => updatenote(note)}></i>
                            <i className="fa-solid fa-floppy-disk  mx-2" onClick={() => savednotes(note._id)}></i>
                        </div>
                    </div>

                    {note.description.length > 10 ? (
                        <div>
                            {showFullNote ? (
                                <div>
                                    <p className="card-text">{note.description}</p>
                                    <button className="btn btn-link" onClick={toggleShowFullNote}>
                                        Show Less
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <p className="card-text">{note.description.substring(0, 10)}...</p>
                                    <button className="btn btn-link" onClick={toggleShowFullNote}>
                                        Show More
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p className="card-text">{note.description}</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Noteitem;

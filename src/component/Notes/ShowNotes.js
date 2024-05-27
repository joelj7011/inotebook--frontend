import React, { useContext, useEffect, useRef } from 'react';
import alertContext from '../../Context/Alert/AlertContext';
import { useNavigate } from 'react-router-dom';
import noteContext from '../../Context/Note/NoteContext';

const ShowNotes = ({ navigate }) => {
    const { showAlert } = useContext(alertContext);
    const context = useContext(noteContext);
    const { notes, fetcshNotes, delSavNotes } = context;
    navigate = useNavigate();
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            fetcshNotes();
            isInitialMount.current = false;
        }
        showAlert("saved notes fetched", "success");
    }, [])

    return (
        <div className="row d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
            <div className='row py-6 justify-content-center align-items-center'>
                {notes.length === 0 ? (
                    <div className="text-center" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                        no notes saved
                    </div>
                ) : (
                    notes.map((note) => (
                        <div className='col-md-3' key={note._id}>
                            <div className="card">
                                <div className="card-body">
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <h5 className="card-title">{note.title}</h5>
                                        <div className='d-flex align-items-center'>
                                            <i className="fa-solid fa-trash mx-2" onClick={() => delSavNotes(note._id)}></i>
                                        </div>
                                    </div>
                                    <p className="card-text">{note.description}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>



    )
}

export default ShowNotes;


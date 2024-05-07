import React, { useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import alertContext from '../../Context/Alert/AlertContext';
import { withRouter } from 'react-router-dom';
import noteContext from '../../Context/Note/NoteContext';

const ShowNotes = ({ history }) => {
    const { showAlert } = useContext(alertContext);
    const context = useContext(noteContext);
    const { notes, fetcshNotes } = context;

    useEffect(() => {
        if (Cookies.get("refreshToken") && Cookies.get("accessToken")) {
            fetcshNotes();
            showAlert("saved notes fetched", "success");
        } else if (!Cookies.get("refreshToken") && !Cookies.get("accessToken")) {
            showAlert("please login", "danger")
            history.push('/login')
        }
    }, [])

    return (
        <div className=" row d-flex justify-content-center align-items-center vh-100">
            <div className='row py-6 justify-content-center align-items-center'>
                {notes.map((note) => (
                    <div className='col-md-3' key={note._id}>
                        <div className="card">
                            <div className="card-body">
                                <div className='d-flex align-items-center justify-content-between'>
                                    <h5 className="card-title">{note.title}</h5>
                                    <div className='d-flex align-items-center'></div>
                                </div>
                                <p className="card-text">{note.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>


    )
}

export default withRouter(ShowNotes);


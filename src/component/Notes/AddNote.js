import React, { useContext, useState } from 'react';
import noteContext from '../.././Context/Note/NoteContext';

const AddNote = () => {
    const context = useContext(noteContext);
    const [loading, setLoading] = useState(false);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "default" });

    const onChange = (e) => {
        setNote({ ...note, [e.target.id]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            addNote(note.title, note.description, note.tag);
        } catch (error) {
            console.log("Something went wrong", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='container my-3 '>
            <h2>Your Notes</h2>
            <form className='my-3'>

                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        aria-describedby="emailHelp"
                        required={true}
                        value={note.title}
                        onChange={onChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Note</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name='description'
                        required={true}
                        value={note.description}
                        onChange={onChange}
                        rows={5}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input
                        type="text"
                        className="form-control"
                        id="tag"
                        name='tag'
                        required={true}
                        value={note.tag}
                        onChange={onChange} />
                </div>
                <button disabled={note.title.length < 5 || note.description.length < 5} type="button" className="btn btn-primary" onClick={handleSubmit}>
                    {loading ? `Adding..` : `Add`}
                </button>
            </form>
        </div>
    );
}

export default AddNote;

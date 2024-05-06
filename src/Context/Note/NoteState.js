import React, { useContext, useState } from "react";
import NoteContext from "./NoteContext";
import alertContext from "../Alert/AlertContext";


const NoteState = (props) => {
  const host = "http://localhost:5000";
  const { showAlert } = useContext(alertContext);

  const notesinitial = [];

  const [notes, Setnotes] = useState(notesinitial);


  const FetchNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/getnotes`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }
      const responseData = await response.json();
      if (Array.isArray(responseData.notes)) {
        Setnotes(responseData.notes);
      } else {
        Setnotes([]);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);

    }
  }


  //--add-Note---//
  const addNote = async (title, description, tag) => {

    try {

      //API_call
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const responseData = await response.json();
      console.log('response->', responseData.message);

      if (response.ok) {
        const newNote = [{
          "_id": responseData._id || "",
          "user": responseData.user || "",
          "title": title || "",
          "description": description || "",
          "tag": tag || "",
          "date": responseData.date || "",
          "__v": responseData.__v || 0
        }];

        Setnotes((prevNotes) => { return prevNotes.concat(newNote) });
        showAlert(responseData.message, "success");

      } else {
        console.error("Error:", responseData);
      }

    } catch (error) {
      console.error("error adding note", error.message);
    }
  }

  //---delete-note--//
  const deleteNote = async (id) => {

    try {
      const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("failed to delete note");
      }

      const newNote = notes.filter((note) => note._id !== id);
      Setnotes(newNote);
    }
    catch (error) {
      console.error("error deleting note", error.message);
    }

  }

  //---update-note--//
  const updateNote = async (id, title, description, tag) => {

    if (!title || !description) {
      alert("title and description is missing");
    }

    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    await response.json();
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        const updatedNotes = [...notes];
        updatedNotes[index] = { ...updatedNotes[index], title, description, tag };
        Setnotes(updatedNotes);
      }
      break;
    }
    Setnotes(notes);
  }


  const savednotes = async (id) => {
    console.log(id);
    try {
      const response = await fetch(`${host}/api/notes/savenotes/${id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log(json);
      console.log(json.message)
      if (json.success) {
        showAlert(json.message, "success");
        Setnotes(notes);
      } else {
        showAlert(json.message, "danger");
      }
    } catch (error) {
      console.log("something went wrong", error);
    }
  }

  return (
    <NoteContext.Provider value={{ notes, Setnotes, addNote, deleteNote, updateNote, FetchNotes, savednotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}


export default NoteState;
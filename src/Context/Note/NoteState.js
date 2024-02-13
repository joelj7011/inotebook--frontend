import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesinitial = [];

  const [notes, Setnotes] = useState(notesinitial);

  const FetchNotes = async () => {
    const response = await fetch(`${host}/api/notes/getnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViZmMxZDQ1MGJjNTYxNGQ5MzQ0NDNiIn0sImlhdCI6MTcwNzA2NTgxMn0.BSYj7fYe6UdEP37TIdbJQpyBuToqB2PagypaXnhTp0s"
      }
    });
    const responseData = await response.json();

    Setnotes(responseData);

  }


  //--add-Note---//
  const addNote = async (title, description, tag, id) => {

    try {
      if (!title.trim() || !description.trim()) {
        alert("title and description is missing");
      }
      //API_call
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViZmMxZDQ1MGJjNTYxNGQ5MzQ0NDNiIn0sImlhdCI6MTcwNzA2NTgxMn0.BSYj7fYe6UdEP37TIdbJQpyBuToqB2PagypaXnhTp0s"
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const responseData = await response.json();

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
        Setnotes(notes.concat(newNote));
      } else {
        console.error("Error:", responseData);
      }

    } catch (error) {
      console.error("error adding note", error.message);
    }
  }

  //---delete-note--//
  const deleteNote = async (id) => {

    //API_CALL
    try {
      const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViZmMxZDQ1MGJjNTYxNGQ5MzQ0NDNiIn0sImlhdCI6MTcwNzA2NTgxMn0.BSYj7fYe6UdEP37TIdbJQpyBuToqB2PagypaXnhTp0s"
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
    console.log("hello");
    //API call
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViZmMxZDQ1MGJjNTYxNGQ5MzQ0NDNiIn0sImlhdCI6MTcwNzA2NTgxMn0.BSYj7fYe6UdEP37TIdbJQpyBuToqB2PagypaXnhTp0s"
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const responseData = response.json();
    console.log(responseData);

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        notes[index].title = title;
        notes[index].description = description;
        notes[index].tag = tag;
      }
      break;
    }
    console.log(id, notes);
    Setnotes(notes);
  }


  return (
    <NoteContext.Provider value={{ notes, Setnotes, addNote, deleteNote, updateNote, FetchNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
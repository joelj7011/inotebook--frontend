import React, { useContext, useState } from "react";
import NoteContext from "./NoteContext";
import alertContext from "../Alert/AlertContext";
import useJwtInterceptors from "../../Hooks/useJwtInterceptors";
import AuthContext from "../Auth/AuthContext";


const NoteState = (props) => {
  const { showAlert } = useContext(alertContext);
  const notesinitial = [];
  const [notes, Setnotes] = useState(notesinitial);
  const axiosPrivateInstance = useJwtInterceptors();

  const FetchNotes = async () => {
    try {
      const response = await axiosPrivateInstance.get(`/api/notes/getnotes`);
      console.log("response", response);
      if (!response) {
        showAlert(response?.data?.message, "danger");
      }
      const responseData = response?.data?.notes;
      if (Array.isArray(responseData)) {
        Setnotes(responseData);
      } else {
        Setnotes([]);
      }
    } catch (error) {
      showAlert(error.response, "danger");
    }
  }

  const addNote = async (title, description, tag) => {
    try {
      const response = await axiosPrivateInstance.post(`/api/notes/addnotes`, {
        title: title,
        description: description,
        tag: tag,
      });
      const { data } = response.data;
      if (response) {
        const newNote = {
          _id: data.note._id || "",
          user: data.note.user || "",
          title,
          description,
          tag,
          date: data.note.date || "",
          __v: data.note.__v || 0
        };

        Setnotes(prevNotes => [...prevNotes, newNote]);
        showAlert(response?.data?.message, "success");

      }

    } catch (error) {
      showAlert("An error occurred while adding the note", "danger");
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await axiosPrivateInstance.delete(`/api/notes/deleteNote/${id}`);
      console.log(response);
      const newNote = notes.filter((note) => note._id !== id);
      Setnotes(newNote);
    }
    catch (error) {
      showAlert(error?.response?.message, "danger");
    }

  }

  const updateNote = async (id, title, description, tag) => {

    if (!title || !description) {
      alert("title and description is missing");
    }

    const response = await axiosPrivateInstance.put(`/api/notes/updateNote/${id}`, {
      title: title,
      description: description,
      tag: tag
    });
    console.log(response);
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

    const response = await axiosPrivateInstance.post(`/api/notes/savenotes/${id}`);
    const json = response;
    if (json) {
      showAlert(json?.data?.message, "success");
    } else {
      showAlert(json?.data?.message, "danger");
    }

  };

  const fetcshNotes = async () => {
    try {
      const response = await axiosPrivateInstance.get(`/api/notes/markednotes`);
      const json = response.data?.data?.note;
      if (json) {
        showAlert(json?.data?.message, "success");
        Setnotes(json);
      } else {
        showAlert(json?.data?.data?.message, "danger");
      }
    } catch (error) {
      showAlert(error?.response?.data?.message, "danger");
    }
  };

  const delSavNotes = async (id) => {
    try {
      console.log(id)
      const response = await axiosPrivateInstance(`/api/notes/deletesavnote/${id}`);
      console.log(response);
      const delNote = notes.filter((note) => {
        return note._id !== id
      });
      Setnotes(delNote);
    } catch (error) {
      console.log(error.response);
    }

  };

  return (
    <NoteContext.Provider value={{ notes, Setnotes, addNote, deleteNote, updateNote, FetchNotes, savednotes, fetcshNotes, delSavNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}


export default NoteState;
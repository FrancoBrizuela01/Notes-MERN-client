import React, { useReducer } from "react";
import noteContext from "./noteContext";
import noteReducer from "./noteReducer";
import {
  GET_NOTES,
  ADD_NOTE,
  VALIDATE_FORM,
  DELETE_NOTE,
  CURRENT_NOTE,
  UPDATE_NOTE,
  ARCHIVE_NOTE,
  NOTE_ERROR,
} from "../../types";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

const NoteState = (props) => {
  const initialState = {
    notes: [],
    errorform: false,
    selectednote: null,
    message: null,
  };

  const [state, dispatch] = useReducer(noteReducer, initialState);

  const getNotes = async () => {
    try {
      const result = await clienteAxios.get("/api/notes");

      dispatch({
        type: GET_NOTES,
        payload: result.data.notes,
      });
    } catch (error) {
      const alert = {
        msg: "There was a mistake",
      };
      dispatch({
        type: NOTE_ERROR,
        payload: alert,
      });
    }
  };

  const addNote = async (note) => {
    console.log(note);
    try {
      const result = await clienteAxios.post("/api/notes", note);
      console.log(result);

      dispatch({
        type: ADD_NOTE,
        payload: result.data,
      });
    } catch (error) {
      const alert = {
        msg: "There was a mistake",
      };
      dispatch({
        type: NOTE_ERROR,
        payload: alert,
      });
    }
  };

  const showError = () => {
    dispatch({
      type: VALIDATE_FORM,
    });
  };

  const deleteNote = async (_id) => {
    try {
      await clienteAxios.delete(`/api/notes/${_id}`);
      dispatch({
        type: DELETE_NOTE,
        payload: _id,
      });
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    } catch (error) {
      const alert = {
        msg: "There was a mistake",
      };
      dispatch({
        type: NOTE_ERROR,
        payload: alert,
      });
    }
  };

  const saveCurrentNote = (note) => {
    dispatch({
      type: CURRENT_NOTE,
      payload: note,
    });
  };

  const updateNote = async (note) => {
    try {
      const result = await clienteAxios.put(`/api/notes/${note._id}`, note);
      dispatch({
        type: UPDATE_NOTE,
        payload: result.data.note,
      });
    } catch (error) {
      const alert = {
        msg: "There was a mistake",
      };
      dispatch({
        type: NOTE_ERROR,
        payload: alert,
      });
    }
  };

  const archiveNote = (note) => {
    dispatch({
      type: ARCHIVE_NOTE,
      payload: note,
    });
  };

  return (
    <noteContext.Provider
      value={{
        notes: state.notes,
        errorform: state.errorform,
        selectednote: state.selectednote,
        message: state.message,
        getNotes,
        addNote,
        showError,
        deleteNote,
        saveCurrentNote,
        updateNote,
        archiveNote,
      }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;

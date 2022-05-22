import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import Swal from "sweetalert2";

const Note = ({ note, showArchived, notes }) => {
  const notesContext = useContext(noteContext);
  const { deleteNote, saveCurrentNote, archiveNote } = notesContext;

  const noteDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteNote(_id);
      }
    });
  };

  const selectNote = (note) => {
    saveCurrentNote(note);
  };

  return (
    <div className="mb-3">
      <div className="card container">
        <div className="card-body">
          <div className="list-group">
            <div className="list-group-item">
              <h3>{note.title}</h3>
              <p className="mb-3">{note.description}</p>
              {note.categories.map((category) => (
                <span className="p-2 rounded-pill span-category">
                  {category.name}
                </span>
              ))}
              <div className="container"></div>
              <div className="mt-5 ">
                <button
                  type="button"
                  className="btn btn-modify"
                  onClick={() => selectNote(note)}
                >
                  Modify
                </button>
                <button
                  type="button"
                  className="btn btn-delete"
                  onClick={() => noteDelete(note._id)}
                >
                  Delete
                </button>

                <button
                  type="button"
                  className="btn btn-archive"
                  onClick={() => archiveNote(note)}
                >
                  {!showArchived ? "Archive" : "Activate"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;

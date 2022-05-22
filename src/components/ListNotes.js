import React, { useContext, useEffect, useState } from "react";
import Note from "./Note";
import noteContext from "../context/notes/noteContext";
import AlertContext from "../context/alerts/alertContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ListNotes = () => {
  const notesContext = useContext(noteContext);
  const { message, notes, getNotes } = notesContext;

  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    if (message) {
      showAlert(message.msg);
    }
    getNotes();
    // eslint-disable-next-line
  }, [message]);

  const showArchivedNotes = () => setShowArchived(!showArchived);

  return (
    <>
      {alert ? (
        <div className="alert alert-danger container" role="alert">
          {alert.msg}ERROR
        </div>
      ) : null}
      {notes.length === 0 ? (
        <div className="alert alert-success container mt-5 w-50" role="alert">
          There are no notes, create one!
        </div>
      ) : (
        <TransitionGroup>
          <div className="container mb-3 mt-5 ">
            <div className="row align-items-start">
              <h1 className="h1-notes col">
                {" "}
                {!showArchived ? "Active notes" : "Archived notes"}
              </h1>
              <button className="btn" onClick={() => showArchivedNotes()}>
                {!showArchived ? "Archived notes" : "Active notes"}
              </button>
            </div>
          </div>

          {notes.map((note) =>
            !note.archived && !showArchived ? (
              <CSSTransition key={note._id} timeout={200} classNames="tarea">
                <Note note={note} notes={notes} />
              </CSSTransition>
            ) : (
              showArchived &&
              note.archived && (
                <CSSTransition key={note._id} timeout={200} classNames="tarea">
                  <Note note={note} showArchived={showArchived} />
                </CSSTransition>
              )
            )
          )}
        </TransitionGroup>
      )}
    </>
  );
};

export default ListNotes;

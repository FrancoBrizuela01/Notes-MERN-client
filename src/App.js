import React from "react";
import FormNote from "./components/FormNote";
import ListNotes from "./components/ListNotes";
import NoteState from "./context/notes/noteState";
import AlertState from "./context/alerts/alertState";
import CategoryState from "./context/categories/categoryState";

function App() {
  return (
    <>
      <NoteState>
        <CategoryState>
          <AlertState>
            <FormNote />
            <ListNotes />
          </AlertState>
        </CategoryState>
      </NoteState>
    </>
  );
}

export default App;

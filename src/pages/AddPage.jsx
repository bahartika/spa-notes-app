import React from "react";
import NoteInput from "../components/NoteInput";
import { addNote } from "../utils/network-data";
import { useNavigate } from "react-router-dom";

function AddPage() {
  const navigate = useNavigate();

  function onAddNoteEventHandler(note) {
    addNote(note)
      .then(() => navigate("/"))
      .catch((error) => console.error("Gagal menambahkan catatan:", error));
  }

  return (
    <section className="add-new-page">
      <div className="add-new-page__input">
        <NoteInput addNote={onAddNoteEventHandler} />
      </div>
    </section>
  );
}

export default AddPage;

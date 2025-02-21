import React from "react";
import NoteItem from "./NoteItem";
import PropTypes from "prop-types";
import LocaleContext from "../Context/LocaleContext";

function NoteList({ notes }) {
  const { locale } = React.useContext(LocaleContext);

  if (notes.length === 0) {
    return (
      <section className="notes-list-empty">
        <p>{locale === "id" ? "Tidak ada catatan..." : "No notes..."}</p>
      </section>
    );
  }

  return (
    <section className="notes-list">
      {notes.map((note) => (
        <NoteItem key={note.id} {...note} />
      ))}
    </section>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default NoteList;

import React, { useRef, useContext } from "react";
import { FaCheck } from "react-icons/fa";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";
import LocaleContext from "../Context/LocaleContext";

function NoteInput({ addNote }) {
  const { locale } = useContext(LocaleContext);
  const [title, onTitleChange, resetTitle] = useInput("");
  const [body, onBodyChange, resetBody] = useInput("");
  const bodyRef = useRef(null);

  const onSubmit = (event) => {
    event.preventDefault();
    addNote({ title, body });
    resetTitle();
    resetBody();
    if (bodyRef.current) bodyRef.current.textContent = "";
  };

  return (
    <form onSubmit={onSubmit}>
      <input className="add-new-page__input__title" type="text" placeholder={locale === "id" ? "Catatan Rahasia" : "Secret note"} value={title} onChange={onTitleChange} />

      <div className="add-new-page__input__body" contentEditable="true" data-placeholder={locale === "id" ? "Sebenarnya saya adalah ...." : "Actually, I am a ..."} onInput={onBodyChange} ref={bodyRef}></div>

      <div className="add-new-page__action">
        <button className="action" type="submit">
          <FaCheck />
        </button>
      </div>
    </form>
  );
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;

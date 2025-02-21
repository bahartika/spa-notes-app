import React from "react";
import { showFormattedDate } from "../utils";
import ArchiveButton from "./ArchiveButton";
import UnarchiveButton from "./UnArchiveButton";
import DeleteButton from "./DeleteButton";
import parser from "html-react-parser";
import PropTypes from "prop-types";

function NoteDetail({ title, createdAt, body, archived, id, onArchive, onUnarchive, onDelete }) {
  return (
    <section className="detail-page">
      <h3 className="detail-page__title">{title}</h3>
      <p className="detail-page__createdAt">{showFormattedDate(createdAt)}</p>
      <div className="detail-page__body">{parser(body)}</div>
      <div className="detail-page__action">
        {archived ? <UnarchiveButton id={id} onUnarchive={onUnarchive} /> : <ArchiveButton id={id} onArchive={onArchive} />}
        <DeleteButton id={id} onDelete={onDelete} />
      </div>
    </section>
  );
}

NoteDetail.propTypes = {
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  onUnarchive: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NoteDetail;

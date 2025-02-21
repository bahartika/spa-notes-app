import React from "react";
import { IoMdArchive } from "react-icons/io";
import PropTypes from "prop-types";

function ArchiveButton({ id, onArchive }) {
  return (
    <button className="action" onClick={() => onArchive(id)}>
      <IoMdArchive />
    </button>
  );
}

ArchiveButton.propTypes = {
  id: PropTypes.string.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default ArchiveButton;

import React from "react";
import { FaTrashCan } from "react-icons/fa6";
import PropTypes from "prop-types";

function DeleteButton({ id, onDelete }) {
  return (
    <button className="action" type="button" title="Hapus" onClick={() => onDelete(id)}>
      <FaTrashCan />
    </button>
  );
}

DeleteButton.propTypes = {
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteButton;

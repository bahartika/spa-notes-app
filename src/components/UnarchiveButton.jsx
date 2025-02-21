import React from "react";
import { MdUnarchive } from "react-icons/md";
import PropTypes from "prop-types";

function UnarchiveButton({ id, onUnarchive }) {
  return (
    <button className="action" onClick={() => onUnarchive(id)}>
      <MdUnarchive />
    </button>
  );
}

UnarchiveButton.propTypes = {
  id: PropTypes.string.isRequired,
  onUnarchive: PropTypes.func.isRequired,
};

export default UnarchiveButton;

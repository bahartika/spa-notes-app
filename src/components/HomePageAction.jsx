import React from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

function HomePageAction() {
  return (
    <Link to="/AddPage">
      <div className="homepage__action">
        <button className="action">
          <FiPlus />
        </button>
      </div>
    </Link>
  );
}

export default HomePageAction;

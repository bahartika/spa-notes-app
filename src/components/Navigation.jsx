import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import PropTypes from "prop-types";
import LocaleContext from "../Context/LocaleContext";
import LocaleButton from "./LocaleButton";
import ThemeButton from "./ThemeButton";

const Navigation = ({ logout, name }) => {
  const { locale } = useContext(LocaleContext);

  return (
    <>
      <nav className="navigation">
        <ul>
          <li>
            <Link to="/archive">{locale === "id" ? "Arsip" : "Archive"}</Link>
          </li>
        </ul>
      </nav>
      <LocaleButton />
      <ThemeButton />
      <button onClick={logout} className="button-logout">
        <FiLogOut />
        {name}
      </button>
    </>
  );
};

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Navigation;

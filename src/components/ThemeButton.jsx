import React, { useContext } from "react";
import ThemeContext from "../Context/ThemeContext";
import { FaMoon } from "react-icons/fa";
import { CiSun } from "react-icons/ci";

const ThemeButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button className="toggle-theme" onClick={toggleTheme}>
      {theme === "light" ? <FaMoon /> : <CiSun />}
    </button>
  );
};

export default ThemeButton;

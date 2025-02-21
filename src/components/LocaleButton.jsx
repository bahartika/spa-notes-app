import React, { useContext } from "react";
import LocaleContext from "../Context/LocaleContext";
import { BsTranslate } from "react-icons/bs";

const LocaleButton = () => {
  const { toggleLocale } = useContext(LocaleContext);
  return (
    <button className="toggle-locale" onClick={toggleLocale}>
      <BsTranslate />
    </button>
  );
};

export default LocaleButton;

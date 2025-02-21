import React from "react";
import PropTypes from "prop-types";
import LocaleContext from "../Context/LocaleContext";

function SearchInput({ keyword, keywordChange }) {
  const { locale } = React.useContext(LocaleContext);
  return (
    <div className="search-bar">
      <input type="text" placeholder={locale === "id" ? "Mencari judul..." : "Search by title..."} value={keyword} onChange={(event) => keywordChange(event.target.value)} />
    </div>
  );
}

SearchInput.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};

export default SearchInput;

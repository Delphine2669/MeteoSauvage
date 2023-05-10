import React, { useState } from "react";
import PropTypes from "prop-types";

function SearchBar({ setCitySearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setCitySearch(searchTerm);
    setSearchTerm("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search city"
      />
      <button type="submit">Search</button>
    </form>
  );
}

SearchBar.propTypes = {
  setCitySearch: PropTypes.func.isRequired,
};

export default SearchBar;

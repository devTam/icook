import React, { useState } from "react";
import './search.css';

const Search = ({ getSearchedTerm }) => {
  const [text, setText] = useState('')

  const handleChange = e => {
    setText(e.target.value);
  }
  const handleSubmit = e => {
    e.preventDefault();
    getSearchedTerm(text);
  }

  return (
    <div className="container">
      <form className="search-box mt-4" onSubmit={handleSubmit}>
        <input
        required
          type="search"
          className="search-input"
          placeholder="Search Recipe"
          name="searchRecipe"
          onChange={handleChange}
        />

        <button className="search-btn">
          <i className="fas fa-search"></i>
        </button>
      </form>
    </div>
  );
};

export default Search;

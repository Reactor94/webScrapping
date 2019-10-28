import React from 'react';
import SearchField from './SearchField';

const Search = ({ value, onChange }) => {
  return (
    <div className="create-todo">
      <h2>Search repositories</h2>
      <SearchField onChange={onChange} value={value} />
    </div>
  );
};

export default Search;

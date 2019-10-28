import React from 'react';
import getAllMovies from '../services/Imdb';

const SearchField = ({value, onChange}) => {
  return (
    <input type="text" value={value} onChange={e => onChange(e.target.value)} />
  );
};

export default SearchField;

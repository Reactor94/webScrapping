import React, { useState, useEffect } from 'react';
import Button from './components/Button';
import Search from '../src/components/Search';
import getAllMovies from './services/Imdb';
import { MoviesList } from './components/MoviesList';

const App = () => {
  const [search, setSearch] = useState('');
  function handleClick() {
    
  }
  return (
    <div className="container">
      <Button genre="top-rated">Top rated movies</Button>
      <Button genre="indian-movies">Indian movies</Button>
      <Button genre="american-movies" onClick={handleClick}>American movies</Button>
      <Search value={search} onChange={setSearch} />
      <MoviesList searchName={search} />
    </div>
  );
};
export default App;

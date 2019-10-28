import React, { useEffect, useState } from 'react';
import { getAllMovies } from '../services/Imdb';

export const MoviesList = ({ searchName }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchApi() {
      const items = await getAllMovies(searchName);
      setMovies(items);
    }

    console.log(searchName);
    if (searchName !== '') {
      fetchApi();
    }
  }, [searchName]);

  return (
    <div className="movies-list">
      <h3>Top rated movies</h3>
      <table>
        <thead>
          <tr>
            <th> Name</th>
          </tr>
        </thead>
        <tbody>
          {movies.length === 0 && (
            <tr>
              <td>No repositories found</td>
            </tr>
          )}

          {movies.map(movie => (
            <tr key={movie.movieName}>
              <td>{movie.movieName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

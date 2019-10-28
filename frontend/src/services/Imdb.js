import axios from 'axios';
 
const baseUrl = 'http://localhost:4000'
export const getAllMovies = async (searchName) => {
  const { data } = await axios.get(`${baseUrl}/movies?name=${searchName}`);
  return data;
};

import axios from "axios";
const apiUrl = 'https://api.themoviedb.org/3'
const apiKey = 'api_key=f4404614bb14fca97d0aeceffd8422e2&language=en-US&page=1'
// pass in a path to get the desired movies
export const getMovies = async path => {
    const resp = await axios.get(
      `${apiUrl}/movie/${path}?${apiKey}`,
    );
    return resp.data.results;
  };
  
export const getTvSeries = async path => {
    const resp = await axios.get(
        `${apiUrl}/tv/${path}?${apiKey}`,
    );

    const {data} = resp
    const  {results} = data
    return results
}


export const getMovieByGenre = async (genre, path) =>{
  const resp = await axios.get(
    `${apiUrl}/${path}?${apiKey}&with_genres=${genre}`
  );
    console.log(`${apiUrl}/${path}?${apiKey}&with_genres=${genre}`)
  return resp.data.results
}
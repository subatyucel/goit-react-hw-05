import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import styles from "./MoviesPage.module.css";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import Navigation from "../../components/Navigation/Navigation";

const OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTEyMWQyMzM0N2I4MWViZGVhNDBjMWRlM2M4ZTk5NSIsIm5iZiI6MTczNDE5MDM5Mi45MTkwMDAxLCJzdWIiOiI2NzVkYTUzODczZTk1N2EwMWE4N2U0MmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.klw_g1a2Msu0LbPnt3oqBJYFJnHacWMAVv-cZtEn6as",
  },
};

function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const query = searchParams.get("query") || "";

  const URL = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${query}`;

  async function fetchMoviesByQuery() {
    try {
      setIsLoading(true);
      const res = await axios.get(URL, OPTIONS);
      const data = res.data.results;
      setMovies(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    setSearchParams({ query: inputRef.current.value });
  }

  useEffect(
    function () {
      fetchMoviesByQuery();
    },
    [searchParams]
  );

  return (
    <>
      <Navigation />
      <form onSubmit={(e) => handleSearch(e)}>
        <input type="text" ref={inputRef} />
        <button>Search</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </>
  );
}

export default MoviesPage;

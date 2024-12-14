import { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import axios from "axios";
import Navigation from "../../components/Navigation/Navigation";
import MovieList from "../../components/MovieList/MovieList";

const OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTEyMWQyMzM0N2I4MWViZGVhNDBjMWRlM2M4ZTk5NSIsIm5iZiI6MTczNDE5MDM5Mi45MTkwMDAxLCJzdWIiOiI2NzVkYTUzODczZTk1N2EwMWE4N2U0MmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.klw_g1a2Msu0LbPnt3oqBJYFJnHacWMAVv-cZtEn6as",
  },
};

const URL = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";

function HomePage() {
  const [trendMovies, setTrendMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchTrendMovies() {
    try {
      setIsLoading(true);
      const res = await axios.get(URL, OPTIONS);
      const data = res.data.results;
      setTrendMovies(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(function () {
    fetchTrendMovies();
  }, []);

  return (
    <>
      <Navigation />
      <h1>Trending Movies</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {trendMovies && <MovieList movies={trendMovies} />}
    </>
  );
}

export default HomePage;

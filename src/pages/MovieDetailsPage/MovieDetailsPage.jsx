import axios from "axios";
import styles from "./MovieDetailsPage.module.css";
import { useState, useEffect, useRef } from "react";
import { useParams, Link, NavLink, Outlet, useLocation } from "react-router";

const OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTEyMWQyMzM0N2I4MWViZGVhNDBjMWRlM2M4ZTk5NSIsIm5iZiI6MTczNDE5MDM5Mi45MTkwMDAxLCJzdWIiOiI2NzVkYTUzODczZTk1N2EwMWE4N2U0MmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.klw_g1a2Msu0LbPnt3oqBJYFJnHacWMAVv-cZtEn6as",
  },
};

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/movies");

  useEffect(
    function () {
      async function fetchMovieDetails() {
        try {
          setLoading(true);
          const res = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}`,
            OPTIONS
          );
          const data = await res.data;
          setMovieDetails(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }

      fetchMovieDetails();
    },
    [movieId]
  );

  return (
    <>
      <Link to={backLinkRef.current}>Go back</Link>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {movieDetails && (
        <div className={styles.container}>
          <img
            src={`https://image.tmdb.org/t/p/w200${movieDetails.poster_path}`}
            alt={`${movieDetails.title} poster`}
          />
          <div>
            <h2>{movieDetails.title}</h2>
            <p>Score: {movieDetails.vote_average.toFixed(2)}</p>
            <h3>Overview</h3>
            <p>{movieDetails.overview}</p>
            <h3>Genres</h3>
            <p>{movieDetails.genres.map((g) => g.name + ", ")}</p>
            <nav className={styles.nav}>
              <NavLink to="cast">Cast</NavLink>
              <NavLink to="reviews">Reviews</NavLink>
            </nav>
          </div>
        </div>
      )}
      <Outlet context={movieId} />
    </>
  );
}

export default MovieDetailsPage;

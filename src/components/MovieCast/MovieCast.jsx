import { useEffect, useState } from "react";
import styles from "./MovieCast.module.css";
import { useOutletContext } from "react-router";
import axios from "axios";

const OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTEyMWQyMzM0N2I4MWViZGVhNDBjMWRlM2M4ZTk5NSIsIm5iZiI6MTczNDE5MDM5Mi45MTkwMDAxLCJzdWIiOiI2NzVkYTUzODczZTk1N2EwMWE4N2U0MmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.klw_g1a2Msu0LbPnt3oqBJYFJnHacWMAVv-cZtEn6as",
  },
};

function Cast() {
  const movieId = useOutletContext();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(function () {
    async function fetchMovieCast() {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          OPTIONS
        );
        const data = await res.data.cast;
        if (data.length === 0) throw new Error("Can not find cast members");
        setCast(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovieCast();
  }, []);

  return (
    <>
      {loading && <p>Loading cast members...</p>}
      {error && <p>{error.message}</p>}
      {cast.length > 0 && (
        <ul>
          {cast.map((actor) => (
            <li key={actor.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={`${actor.name} profile`}
              />

              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Cast;

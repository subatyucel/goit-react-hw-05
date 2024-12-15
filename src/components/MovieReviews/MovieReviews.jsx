import { useEffect, useState } from "react";
import styles from "./MovieReviews.module.css";
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

function Reviews() {
  const movieId = useOutletContext();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function fetchReviews() {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
          OPTIONS
        );
        const data = await res.data;
        if (data.length === 0) throw new Error("Can not find any review");
        setReviews(data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, []);

  return (
    <>
      {loading && <p>Loading reviews...</p>}
      {error && <p>{error.message}</p>}
      {reviews.length > 0 && (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <h2>Author: {review.author}</h2>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Reviews;

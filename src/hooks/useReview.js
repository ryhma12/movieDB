import { useState } from "react";
import { useUser } from "./useUser";

export const useReview = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  const review = async (movieId, content, stars) => {
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:3001/user/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          movieId: movieId,
          content: content,
          stars: stars,
        }),
      });
      if (!res.ok) throw new Error("Something went wrong", 500);

      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { review, isLoading, error };
};

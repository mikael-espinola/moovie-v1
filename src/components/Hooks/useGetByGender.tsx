import React, { useEffect, useRef, useState } from "react";
import { Movie } from "../Main/Main";

interface ByGenderProps {
  genreId: number | null;
  setMoviesList: React.Dispatch<React.SetStateAction<Movie[]>>;
  setSearchInputValue: React.Dispatch<React.SetStateAction<string | null>>;
}

export const useGetByGender: React.FC<ByGenderProps> = ({
  genreId,
  setMoviesList,
  setSearchInputValue,
}) => {
  const [page, setPage] = useState(1);
  const loadingRef = useRef(false);
  const [prevGenreId, setPrevGenreId] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      let totalHeight = document.documentElement.scrollHeight;
      let visibleHeight = window.innerHeight;
      let scroll = window.scrollY;
      const percentage = (scroll / (totalHeight - visibleHeight)) * 100;

      if (percentage > 60 && !loadingRef.current) {
        setPage((prevPage) => prevPage + 1);
        loadingRef.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (genreId !== null) {
      if (genreId === 0) {
        return window.location.reload();
      } else {
        setSearchInputValue(null);
        if (genreId !== prevGenreId) {
          setMoviesList([]);
          setPage(1);
        }
        fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&with_genres=${genreId}&page=${page}`
        )
          .then((resp) => resp.json())
          .then((data) => {
            if (page === 1) {
              setMoviesList(data.results);
            } else {
              setMoviesList((prevDataMovie) => [
                ...prevDataMovie,
                ...data.results,
              ]);
            }
          })
          .finally(() => {
            loadingRef.current = false;
          });
      }
      setPrevGenreId(genreId);
    }
  }, [genreId, page, prevGenreId]);

  return null;
};

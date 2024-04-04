import React, { useEffect, useRef, useState } from "react";
import { Genres } from "../../App";
import { Movie } from "../Main/Main";

interface ByGenreProps {
  genreId: number | undefined;
  setMoviesList: (mutator: ((movie: Movie[]) => Movie[]) | Movie[]) => void;
  setStatusLoader: (status: boolean) => void;
}

function useGetByGenre({
  genreId,
  setMoviesList,
  setStatusLoader,
}: ByGenreProps) {
  let [prevId, setPrevId] = useState<number>();
  let [page, setPage] = useState(1);
  let loadingRef = useRef(false);
  // let [statusLoader, setStatusLoader] = useState(false);
  let [categoryBar, setCategoryBar] = useState<string>();

  const getCategoryId = () => {
    const urlParam = new URLSearchParams(window.location.search);
    return urlParam.get("category");
  };

  useEffect(() => {
    const handleScroll = () => {
      let totalHeight = document.documentElement.scrollHeight;
      let visibleHeight = window.innerHeight;
      let scroll = window.scrollY;
      const percentage = (scroll / (totalHeight - visibleHeight)) * 100;

      if (percentage > 70 && !loadingRef.current) {
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
    if (genreId) {
      setStatusLoader(true);
      if (genreId !== prevId) {
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
          setStatusLoader(false);
          setPrevId(genreId);
          loadingRef.current = false;
        });
    }
  }, [genreId, page]);
}

export default useGetByGenre;

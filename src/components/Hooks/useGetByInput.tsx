import React, { useEffect, useRef, useState } from "react";
import { Movie } from "../Main/Main";
import useScrollToUp from "./useScrollToUp";

interface GetByInput {
  searchByInput?: string;
  setMoviesList: (mutator: ((movieList: Movie[]) => Movie[]) | Movie[]) => void;
  setStatusLoader: (newStatus: boolean) => void;
  setGenreStatus: (genreStatus: boolean) => void;
  setGenreId: (genreI: number | undefined) => void;
}

const useGetByInput = ({
  searchByInput,
  setMoviesList,
  setStatusLoader,
  setGenreStatus,
  setGenreId,
}: GetByInput) => {
  const [page, setPage] = useState(1);
  const loadingRef = useRef(false);
  const [prevSearch, setPrevSearch] = useState<string>();

  const scrollToUp = useScrollToUp;

  useEffect(() => {
    if (searchByInput !== prevSearch) {
      setMoviesList([]);
      setPage(1);
      setPrevSearch(searchByInput);
      scrollToUp();
    }
  }, [searchByInput, prevSearch]);

  useEffect(() => {
    const handleScroll = () => {
      let totalHeight = document.documentElement.scrollHeight;
      let visibleHeight = window.innerHeight;
      let scroll = window.scrollY;
      const percentage = (scroll / (totalHeight - visibleHeight)) * 100;

      if (percentage > 20 && !loadingRef.current) {
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
    if (searchByInput) {
      setGenreStatus(false);
      setGenreId(undefined);

      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchByInput}&api_key=${process.env.REACT_APP_TMDB_KEY}&page=${page}`
      )
        .then((resp) => resp.json())
        .then((data) => {
          if (page === 1) {
            scrollToUp();
            setMoviesList(data.results);
          } else {
            setMoviesList((prevList) => [...prevList, ...data.results]);
          }
        })
        .finally(() => {
          setStatusLoader(false);
          loadingRef.current = false;
        });
    }
  }, [page, searchByInput]);

  return;
};

export default useGetByInput;

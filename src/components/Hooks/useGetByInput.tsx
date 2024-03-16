import React, { useEffect } from "react";
import { Movie } from "../Main/Main";
import useScrollToUp from "./useScrollToUp";

interface GetByInput {
  searchByInput: string | null;
  setMoviesList: React.Dispatch<React.SetStateAction<Movie[]>>;
  setStatusLoader: React.Dispatch<React.SetStateAction<boolean>>;
  setGenreStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const useGetByInput: React.FC<GetByInput> = ({
  searchByInput,
  setMoviesList,
  setStatusLoader,
  setGenreStatus,
}) => {
  useEffect(() => {
    const scrollToUp = useScrollToUp;
    if (!searchByInput) return;
    setStatusLoader(true);
    setGenreStatus(false);
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchByInput}&api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        scrollToUp();
        setMoviesList(data.results);
      })
      .finally(() => {
        setStatusLoader(false);
      });
  }, [searchByInput]);

  return null;
};

export default useGetByInput;

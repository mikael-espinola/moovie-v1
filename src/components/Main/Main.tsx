import React, { useEffect, useRef, useState } from "react";
import {
  Average,
  Button,
  Buttoncontainer,
  Container,
  Image,
  ImageContainer,
  MovieItem,
  MovieList,
  Title,
  TitleContainer,
} from "./style";
import { FaStar } from "react-icons/fa";
import Modal from "./Modal/Modal";
import Loader from "../Loader/Loader";
import useGetByGenre from "../Hooks/useGetByGenre";
import useGetByInput from "../Hooks/useGetByInput";
import { Genres } from "../../App";

export interface Movie {
  genre_ids: number;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
}

interface MainProps {
  setMoviesGenresList: (genresList: Genres[]) => void;
  setGenreStatus: (genreStatus: boolean) => void;
  genreId?: number;
  searchByInput?: string;
  restart: boolean;
  setGenreId: (newGenreId: number | undefined) => void;
}

const Main = ({
  setMoviesGenresList,
  genreId,
  searchByInput,
  setGenreStatus,
  setGenreId,
  restart,
}: MainProps) => {
  const [MoviesList, setMoviesList] = useState<Movie[]>([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie>();
  const loadingRef = useRef(false);
  const [statusLoader, setStatusLoader] = useState(false);
  const [genresList, setGenresList] = useState<Genres[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [restart]);

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
      loadingRef.current = false;
    };
  }, []);

  useEffect(() => {
    setPage(1);
  }, [restart]);

  useEffect(() => {
    if (genreId === undefined && searchByInput === undefined) {
      setStatusLoader(true);
      Promise.all([
        fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&page=${page}`
        ),
        fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_KEY}&page=1`
        ),
      ])
        .then(([moviesListResp, genresListResp]) =>
          Promise.all([moviesListResp.json(), genresListResp.json()])
        )
        .then(([dataMovie, dataGenre]) => {
          if (page === 1) {
            setMoviesList([]);
            setMoviesList(dataMovie.results);
          } else {
            setMoviesList((prevDataMovie) => [
              ...prevDataMovie,
              ...dataMovie.results,
            ]);
          }
          setGenresList(dataGenre.genres);
          setMoviesGenresList(dataGenre.genres);
        })
        .finally(() => {
          loadingRef.current = false;
          setStatusLoader(false);
        });
    }
  }, [page, restart]);

  useGetByGenre({
    genreId,
    setMoviesList,
    setStatusLoader,
  });

  useGetByInput({
    searchByInput,
    setMoviesList,
    setStatusLoader,
    setGenreStatus,
    setGenreId,
  });

  // useGetByInput({
  //   searchByInput,
  //   setMoviesList,
  //   setStatusLoader,
  //   setGenreStatus,
  // });

  const getSelectedMovie = (movie: Movie) => {
    setModalStatus(true);
    setSelectedMovie(movie);
  };

  return (
    <Container>
      {statusLoader && <Loader />}
      <MovieList>
        {MoviesList &&
          MoviesList.map((movie: Movie, index) => (
            <MovieItem key={index}>
              <ImageContainer>
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                />
              </ImageContainer>
              <TitleContainer>
                <Title>{movie.title} </Title>
              </TitleContainer>
              <Average>
                <FaStar />
                <p>{parseInt(movie.vote_average.toString())} </p>
              </Average>
              <Buttoncontainer>
                <Button onClick={() => getSelectedMovie(movie)}>+ info</Button>
              </Buttoncontainer>
            </MovieItem>
          ))}
        {modalStatus && selectedMovie && (
          <Modal
            setModalStatus={setModalStatus}
            movieItem={selectedMovie}
            genresList={genresList}
          />
        )}
      </MovieList>
    </Container>
  );
};

export default Main;

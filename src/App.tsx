import React, { useEffect, useState } from "react";
import { Container } from "./style.app";
import { GlobalStyle } from "./GlobalStyle";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import ButtonToUp from "./components/ButtonToUp/ButtonToUp";

export interface Genres {
  id: number;
  name: string;
}

const App = () => {
  const [moviesGenresList, setMoviesGenresList] = useState<Genres[]>([]);
  const [searchByGenreId, setSearchByGenreId] = useState<number>();
  const [searchByInput, setSearchByInput] = useState<string>();
  const [searchInputValue, setSearchInputValue] = useState<string>();
  const [genreStatus, setGenreStatus] = useState<boolean>(false);
  const [genresContainerState, setGenresContainerState] = useState(false);
  const [restart, setRestart] = useState(false);

  return (
    <Container>
      <Header
        genresContainerState={genresContainerState}
        setGenresContainerState={setGenresContainerState}
        searchInputValue={searchInputValue}
        setSearchInputValue={setSearchInputValue}
        moviesGenresList={moviesGenresList}
        setSearchByGenreId={setSearchByGenreId}
        setSearchByInput={setSearchByInput}
        genreStatus={genreStatus}
        setGenreStatus={setGenreStatus}
        setRestart={setRestart}
        restart={restart}
      />
      <Main
        genreId={searchByGenreId}
        setGenreId={setSearchByGenreId}
        setMoviesGenresList={setMoviesGenresList}
        searchByInput={searchByInput}
        setGenreStatus={setGenreStatus}
        restart={restart}
        setGenresContainerState={setGenresContainerState}
      />
      <ButtonToUp />
      <GlobalStyle />
    </Container>
  );
};

export default App;

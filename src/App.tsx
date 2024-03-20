import React, { useState } from "react";
import { Container } from "./style.app";
import { GlobalStyle } from "./GlobalStyle";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import ButtonToUp from "./components/ButtonToUp/ButtonToUp";

export interface Genres {
  id: number;
  name: string;
}

const App: React.FC = () => {
  const [moviesGenresList, setMoviesGenresList] = useState<Genres[]>([]);
  const [searchByGenreId, setSearchByGenreId] = useState<number | null>(null);
  const [searchByInput, setSearchByInput] = useState<string | null>(null);
  const [searchInputValue, setSearchInputValue] = useState<string | null>(null);
  const [genreStatus, setGenreStatus] = useState<boolean>(false);

  return (
    <Container>
      <Header
        searchInputValue={searchInputValue}
        setSearchInputValue={setSearchInputValue}
        moviesGenresList={moviesGenresList}
        setSearchByGenreId={setSearchByGenreId}
        setSearchByInput={setSearchByInput}
        genreStatus={genreStatus}
        setGenreStatus={setGenreStatus}
      />
      <Main
        genreId={searchByGenreId}
        setMoviesGenresList={setMoviesGenresList}
        searchByInput={searchByInput}
        setGenreStatus={setGenreStatus}
        setSearchInputValue={setSearchInputValue}
      />
      <ButtonToUp />
      <GlobalStyle />
    </Container>
  );
};

export default App;

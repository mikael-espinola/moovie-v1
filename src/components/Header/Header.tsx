import React, { useEffect, useState } from "react";
import {
  Arrow,
  Container,
  DropDown,
  DropdownContainer,
  GenreName,
  Link,
  LogoContainer,
  Menu,
  MenuItem,
  MenuList,
  OptionId,
  SearchBar,
  Text,
  Title,
} from "./style";
import useDebounce from "../Hooks/useDebounce";
import { Genres } from "../../App";
import useScrollToUp from "../Hooks/useScrollToUp";
import { IoMdArrowDropdown } from "react-icons/io";

interface HeaderProps {
  moviesGenresList: Genres[];
  setSearchByGenreId: (genreId: number | undefined) => void;
  setSearchByInput: (nameInputed: string | undefined) => void;
  setSearchInputValue: (inputValue: string | undefined) => void;
  setGenreStatus: (genreStatus: boolean) => void;
  setRestart: (genreStatus: boolean) => void;
  searchInputValue?: string;
  genreStatus: boolean;
  restart: boolean;
}

const Header = ({
  moviesGenresList,
  setSearchByGenreId,
  setSearchByInput,
  setGenreStatus,
  genreStatus,
  searchInputValue,
  setSearchInputValue,
  setRestart,
  restart,
}: HeaderProps) => {
  const [genresState, setGenresState] = useState(false);
  const [selectedGenreId, setSelectedGenreId] = useState<number>();
  const [selectedGenreName, setSelectedGenreName] = useState<string>();

  const scrollToUp = useScrollToUp;
  const toggleGenresState = () => {
    setGenresState(!genresState);
  };

  const reloadPage = () => {
    scrollToUp();
    setRestart(!restart);
    setSearchByGenreId(undefined);
    setSearchByInput(undefined);
    setSearchInputValue(undefined);
    setGenreStatus(false);
    window.history.pushState({}, "", `?Home`);
  };

  const setUrlById = (categoryName?: string, categoryId?: number) => {
    if (categoryId !== undefined) {
      let param = new URLSearchParams({ category: `${categoryId}` });
      window.history.pushState({}, "", `?${param.toString()}`);
    } else {
      window.history.pushState({}, "", `?Home`);
      return;
    }
  };

  const getSelectedGenre = (genreName: string, genreId?: number) => {
    if (genreName === "All") {
      setSearchByInput(undefined);
      setSearchByGenreId(undefined);
      setGenreStatus(false);
      setGenresState(false);
      scrollToUp();
      setUrlById(undefined, undefined);

      return;
    } else {
      setSelectedGenreName(genreName);
      setSearchByGenreId(genreId);
      setSelectedGenreId(genreId);
      setGenresState(false);
      setGenreStatus(true);
      scrollToUp();
      setUrlById(undefined, genreId);
    }
  };

  const debounceChange = useDebounce((searchInputValue) => {
    setSearchByInput(searchInputValue);
  }, 400);

  const getSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let text = e.target.value;
    setSearchInputValue(text);
    debounceChange(text);
  };

  return (
    <>
      <Container>
        <LogoContainer>
          <Title>Moovie</Title>
        </LogoContainer>
        <Menu>
          <SearchBar
            onChange={getSearchInput}
            value={searchInputValue ? searchInputValue : ""}
            placeholder={"Search..."}
            type={"search"}
          />
          <MenuList>
            <MenuItem>
              <Link onClick={reloadPage}>Home</Link>
            </MenuItem>
            <MenuItem>
              <Link onClick={() => toggleGenresState()}>
                Categories{" "}
                <Arrow>
                  <IoMdArrowDropdown />
                </Arrow>
              </Link>
              <DropdownContainer>
                {genresState && (
                  <DropDown>
                    <OptionId
                      key={"001"}
                      onClick={() => getSelectedGenre("All")}
                    >
                      <Link>All</Link>
                    </OptionId>
                    {moviesGenresList.map((genre, index) => (
                      <OptionId key={index}>
                        <Link
                          onClick={() => getSelectedGenre(genre.name, genre.id)}
                        >
                          {genre.name}
                        </Link>
                      </OptionId>
                    ))}
                  </DropDown>
                )}
              </DropdownContainer>
            </MenuItem>
            {genreStatus && (
              <MenuItem>
                <Text>Genre: {selectedGenreName}</Text>
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      </Container>
    </>
  );
};

export default Header;

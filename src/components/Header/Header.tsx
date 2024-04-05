import React, { useEffect, useState } from "react";
import {
  Arrow,
  Container,
  DropDown,
  DropdownContainer,
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
  setGenresContainerState: (state: boolean) => void;
  genresContainerState: boolean;
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
  setGenresContainerState,
  genresContainerState,
}: HeaderProps) => {
  const [selectedGenreId, setSelectedGenreId] = useState<number>();
  const [selectedGenreName, setSelectedGenreName] = useState<string>();

  const scrollToUp = useScrollToUp;

  const handleGenreContainerState = () => {
    setGenresContainerState(!genresContainerState);
  };

  const setUrlParam = (categoryName?: string, categoryId?: number) => {
    if (categoryId !== undefined) {
      let param = new URLSearchParams({ category: `${categoryId}` });
      window.history.pushState({}, "", `?${param.toString()}`);
    } else if (categoryName !== undefined) {
      let param = new URLSearchParams({ search: `${categoryName}` });
      window.history.pushState({}, "", `?${param.toString()}`);
    }
  };

  const reloadPage = () => {
    scrollToUp();
    setGenresContainerState(false);
    setRestart(!restart);
    setSearchByGenreId(undefined);
    setSearchByInput(undefined);
    setSearchInputValue(undefined);
    setGenreStatus(false);
    window.history.pushState({}, "", `?Home`);
  };

  const getSelectedGenre = (genreName: string, genreId?: number) => {
    setSearchInputValue(undefined);
    if (genreName === "All") {
      reloadPage();
      return;
    } else {
      setSelectedGenreName(genreName);
      setSearchByGenreId(genreId);
      setSelectedGenreId(genreId);
      setGenresContainerState(false);
      setGenreStatus(true);
      scrollToUp();
      setUrlParam(undefined, genreId);
    }
  };

  const debounceChange = useDebounce((searchInputValue) => {
    if (searchInputValue === "") {
      setUrlParam(searchInputValue, undefined);
      setSearchByInput(undefined);
      return;
    }
    setSearchByInput(searchInputValue);
    setUrlParam(searchInputValue, undefined);
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
              <Link onClick={() => handleGenreContainerState()}>
                Categories{" "}
                <Arrow>
                  <IoMdArrowDropdown />
                </Arrow>
              </Link>
              <DropdownContainer>
                {genresContainerState && (
                  <DropDown onMouseLeave={() => setGenresContainerState(false)}>
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

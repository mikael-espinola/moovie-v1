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
  setSearchByGenreId: React.Dispatch<React.SetStateAction<number | null>>;
  setSearchByInput: React.Dispatch<React.SetStateAction<string | null>>;
  setSearchInputValue: React.Dispatch<React.SetStateAction<string | null>>;
  setGenreStatus: React.Dispatch<React.SetStateAction<boolean>>;
  searchInputValue: string | null;
  genreStatus: boolean;
}

const Header: React.FC<HeaderProps> = ({
  moviesGenresList,
  setSearchByGenreId,
  setSearchByInput,
  setGenreStatus,
  genreStatus,
  searchInputValue,
  setSearchInputValue,
}) => {
  const [genresState, setGenresState] = useState(false);
  const [selectedGenreId, setSelectedGenreId] = useState<number>(0);
  const [selectedGenreName, setSelectedGenreName] = useState<string | null>(
    null
  );

  const scrollToUp = useScrollToUp;
  const toggleGenresState = () => {
    setGenresState(!genresState);
  };

  const reloadPage = () => {
    window.location.reload();
  };

  const getSelectedGenre = (genreName: string, genreId: number) => {
    if (genreName === "All") {
      setSelectedGenreName("");
      setSearchByGenreId(genreId);
      setGenreStatus(false);

      return setGenresState(false);
    }
    setSelectedGenreName(genreName);
    setSearchByGenreId(genreId);
    setSelectedGenreId(genreId);
    setGenresState(false);
    setGenreStatus(true);
    scrollToUp();
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
                      onClick={() => getSelectedGenre("All", 0)}
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
                <Text status={genreStatus}>
                  Genre: <GenreName> {selectedGenreName}</GenreName>
                </Text>
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      </Container>
    </>
  );
};

export default Header;

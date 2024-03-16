import styled from "styled-components";

export const Container = styled.div`
  border: 2px solid gray;
  background-color: #e4d7d7;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  padding: 0.3em;
  width: 100%;

  @media screen and (min-width: 750px) {
    flex-direction: row;
  }
`;
export const LogoContainer = styled.section`
  width: 30%;
`;
export const Title = styled.h1`
  font-size: 2em;
  padding: 0.2em;
  text-align: center;

  @media screen and (max-width: 750px) {
    padding: 0;
    margin-bottom: 0.4em;
  }
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media screen and (min-width: 750px) {
    flex-direction: row;
    width: 70%;
  }
`;
export const SearchBar = styled.input`
  padding: 0.2em;
  margin: 0 1em;
  width: 80%;
  border-radius: 6px;
  border: none;
  border-bottom: 1px solid black;
  background-color: #e4d7d7;
  position: relative;

  &::placeholder {
    color: #000;
  }

  @media screen and (min-width: 750px) {
    width: 50%;
  }
`;
export const MenuList = styled.ul`
  width: 100%;
  margin-top: 0.4em;
  display: flex;
  justify-content: space-evenly;
`;
export const MenuItem = styled.li`
  align-items: center;
  display: flex;
  align-items: center;
`;

export const Link = styled.a`
  padding: 0.5em;
  font-size: 12px;
  @media screen and (min-width: 750px) {
    top: 3em;
    font-size: 15px;
    cursor: pointer;
  }
`;

export const DropDown = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1em;
  position: absolute;
  padding: 0.6em;
  background-color: #e4d7d7;
  border-radius: 8px;
  color: #fff;
  top: 7em;

  @media screen and (min-width: 750px) {
    top: 3em;
  }
`;

export const OptionId = styled.li`
  text-align: center;
  cursor: pointer;
  border: 1px solid #000;
  padding: 0.1em;
  border-radius: 5px;
  color: #000;
`;

interface TextProps {
  status: boolean;
}

export const Text = styled.p<TextProps>`
  display: ${(props) => (props.status ? "flex" : "none")};
  align-self: center;
  font-family: Impact;
  font-size: 13px;
  justify-content: space-evenly;
  width: 10em;
  border: 2px solid red;
`;

export const GenreName = styled.p`
  font-family: Impact, Haettenschweiler, "Arial Narrow", sans-serif;
  text-decoration: none;
  font-size: 13px;
`;

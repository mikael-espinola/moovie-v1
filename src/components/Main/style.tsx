import styled from "styled-components";

export const Container = styled.div`
  @media screen and (max-width: 750px) {
    margin-top: 7em;
    padding: 0;
  }
  margin-top: 3.7em;
  display: flex;
  padding: 0.5em;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const MovieList = styled.ul`
  width: 100%;
  gap: 0.2em;
  display: grid;

  grid-template-columns: repeat(2, 1fr);
  @media screen and (min-width: 551px) and (max-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (min-width: 801px) and (max-width: 1100px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (min-width: 1101px) and (max-width: 1600px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media screen and (min-width: 1601px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;
export const MovieItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.2em;
  border: 1px solid black;
  border-radius: 10px;
  background-color: #e4d7d7;
`;
export const ImageContainer = styled.div`
  width: 130px;
  height: 180px;

  @media screen and (min-width: 700px) {
    width: 180px;
    height: 280px;
  }
`;
export const Image = styled.img`
  width: 100%;
  height: 100%;
`;
export const TitleContainer = styled.div`
  width: 100%;
  margin: 0.5em 0;
  display: flex;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: 13px;
  text-align: center;

  @media screen and (min-width: 750px) {
    font-size: 17px;
  }
`;

export const Average = styled.div`
  display: flex;
  width: 20%;
  justify-content: space-evenly;
  margin-bottom: 0.2em;
`;

export const Buttoncontainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0.5em;
`;

export const Button = styled.button`
  cursor: pointer;
  width: 60%;
  height: 100%;
  border: none;
  padding: 0.5em;
  border-radius: 6px;
  font-family: "Carrois Gothic SC", sans-serif;
  &:hover {
    background-color: #d4caca;
  }
`;

// export const Container = styled.div``
// export const Container = styled.div``
// export const Container = styled.div``

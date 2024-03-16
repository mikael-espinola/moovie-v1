import React, { useState } from "react";
import {
  AvarengeContainer,
  Average,
  Button,
  CloseButtonContainer,
  Container,
  Details,
  Iframe,
  Image,
  ImageContainer,
  Item,
  Overview,
  OverviewContainer,
  Rate,
  Title,
  TitleContainer,
} from "./style";
import { FaStar } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface Movie {
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

interface ModalProps {
  movieItem: Movie;
  setModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({ movieItem, setModalStatus }) => {
  const [movieObj, setMovieObj] = useState<Movie>(movieItem);

  const closeModal = () => {
    setModalStatus(false);
  };

  return (
    <Container>
      <CloseButtonContainer>
        <Button onClick={closeModal}>
          <IoIosCloseCircleOutline size={35} />
        </Button>
      </CloseButtonContainer>
      <Item>
        <ImageContainer>
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movieItem.poster_path}`}
          />
        </ImageContainer>
        <Details>
          <TitleContainer>
            <Title>{movieItem.title} </Title>
          </TitleContainer>
          <Average>
            <Rate>
              <FaStar size={15} /> {parseInt(movieItem.vote_average.toString())}
            </Rate>
          </Average>
          <OverviewContainer>
            <Overview>{movieItem.overview}</Overview>
          </OverviewContainer>
          <Iframe>
            <h1>YOUTUBE</h1>
          </Iframe>
        </Details>
      </Item>
    </Container>
  );
};

export default Modal;

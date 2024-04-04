import React, { useEffect, useState } from "react";
import {
  Average,
  Button,
  Categories,
  CategoriesContainer,
  CategoriesItem,
  CategoriesList,
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
  RelasedTime,
  Title,
  TitleContainer,
} from "./style";
import { FaStar } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Loader from "../../Loader/Loader";
import { Genres } from "../../../App";

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
  genresList: Genres[];
}

const Modal: React.FC<ModalProps> = ({
  movieItem,
  setModalStatus,
  genresList,
}) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [urlTrailer, setUrlTrailer] = useState<string>();
  const [statusLoader, setStatusLoader] = useState<boolean>(false);

  const closeModal = () => {
    setModalStatus(false);
  };

  const formatDate = (date: string) => {
    const formattedDate = date.split("-").reverse().join("/");
    return formattedDate;
  };

  useEffect(() => {
    if (genresList) {
      const movieIds: number[] = Array.isArray(movieItem.genre_ids)
        ? movieItem.genre_ids
        : [movieItem.genre_ids];
      const result = genresList
        .filter((genreId) => movieIds.includes(genreId.id))
        .map((genre) => genre.name);
      setCategories(result);
      // setStatusLoader(false);
    }
  }, []);

  useEffect(() => {
    setStatusLoader(true);

    const movieTitle = `${movieItem.title} Official movie trailer`;
    let movieTrailerName = movieTitle.replace(/ /g, "+");

    fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_KEY}&q=${movieTrailerName}&type=video`
    )
      .then((resp) => resp.json())
      .then((json) => {
        setStatusLoader(true);
        let videoId = json.items[0].id.videoId;
        let urlTrailer = `https://www.youtube.com/embed/${videoId}`;
        setUrlTrailer(urlTrailer);
      })
      .catch((err) => {
        return;
      })
      .finally(() => {
        setStatusLoader(false);
      });
  }, []);

  return (
    <Container>
      {statusLoader ? (
        <Loader />
      ) : (
        <>
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
                  <FaStar size={15} />{" "}
                  {parseInt(movieItem.vote_average.toString())}
                </Rate>
                <RelasedTime>
                  Released: {formatDate(movieItem.release_date)}
                </RelasedTime>
              </Average>
              <OverviewContainer>
                <Overview>{movieItem.overview}</Overview>
              </OverviewContainer>
              <CategoriesContainer>
                <Categories>Categories: {categories.join(", ")}</Categories>
              </CategoriesContainer>
              {statusLoader ? (
                <Loader />
              ) : (
                <Iframe
                  name="trailer"
                  allowFullScreen
                  src={urlTrailer}
                ></Iframe>
              )}
            </Details>
          </Item>
        </>
      )}
    </Container>
  );
};

export default Modal;

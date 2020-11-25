import React from "react";
import {
  Text,
  Image,
  CircularProgress,
  Center,
  Container,
  Box,
  HStack,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { ChevronLeftIcon, AddIcon, CheckIcon } from "@chakra-ui/icons";
import { useParams, useHistory } from "react-router-dom";
import useMovie from "../hooks/useMovie";
import { buildImageUrl, imageFallback } from "../connectors/tmdb";
import { getYear, STATUS } from "../utils";
import FavoriteButton from "../components/FavoriteButton";
import HistoryButton from "../components/HistoryButton";
import { Rating } from "@material-ui/lab";
import { MovieGenre } from "./style";
import { withStyles } from "@material-ui/core/styles";
import FavoriteIcon from '@material-ui/icons/Favorite';

const StyledRating = withStyles({
  iconFilled: {
    color: "#3457D5",
  },
  iconEmpty: {
    color: "white",
  }
})(Rating);

export default function Movie() {
  const { movieId } = useParams();
  const history = useHistory();

  const { movie, status, error, updateStatus, updateMovie } = useMovie(movieId);

  if (status === STATUS.IDLE) {
    return null;
  }
  if (status === STATUS.PENDING) {
    return (
      <Center minH="50vh">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }
  if (status === STATUS.REJECTED) {
    return (
      <Container p={3}>
        <Text>
          Error fetching movie with ID {movieId}: {JSON.stringify(error)}
        </Text>
      </Container>
    );
  }

  const renderMovieGenre = () => {
    return movie.genres.map(({ name }) => {
      return <MovieGenre>{name}</MovieGenre>;
    });
  };

  return (
    <Container p={3} maxW="80em">
      <HStack mb={3} justify="space-between">
        <IconButton
          aria-label="Back"
          icon={<ChevronLeftIcon />}
          variant="outline"
          fontSize={36}
          colorScheme="teal"
          onClick={history.goBack}
        />
        <HStack>
          <FavoriteButton
            movie={movie}
            status={updateStatus}
            update={updateMovie}
          />
          <HistoryButton
            movie={movie}
            status={updateStatus}
            update={updateMovie}
          />
        </HStack>
      </HStack>
      <HStack spacing={3} align="flex-start">
        <Box>
          <Image
            src={buildImageUrl(movie.poster_path, "w300")}
            alt="Poster"
            w="35vw"
            maxW={300}
            fallbackSrc={imageFallback}
          />
        </Box>
        <Box w="100%">
          <Heading
            as="h2"
            style={{ display: "flex", alignItems: "center", width: "100%", marginBottom: "10px" }}
          >
            {movie.title} ({getYear(movie.release_date)})
          </Heading>
          <StyledRating
            value={movie.vote_average / 2}
            getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
            precision={0.5}
            readOnly
            icon={<FavoriteIcon fontSize="inherit" />}
            style={{
              marginBottom: "10px"
            }}
          />
          <Text
            as="span"
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "1rem",
              fontWeight: 400,
              marginBottom: "10px"
            }}
          >
            Votes: {movie.vote_count}
          </Text>
          <Text
            as="span"
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: ".5rem",
              flex: 1,
              fontSize: "1rem",
              fontWeight: 400,
              justifyContent: "flex-end",
              marginBottom: "10px"
            }}
          >
            {renderMovieGenre()}
          </Text>
          <Text>{movie.overview}</Text>
        </Box>
      </HStack>
    </Container>
  );
}

import React from "react";
import { IconButton, Tooltip } from "@chakra-ui/react";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { STATUS } from "../utils";
import { WATCHLIST } from "../connectors/api";

export default function FavoriteButton({ movie, status, update }) {
  const toggleWatchlist = () => {
    update({
      ...movie,
      watchlist:
        movie.watchlist === WATCHLIST.LISTED
          ? WATCHLIST.REMOVED
          : WATCHLIST.LISTED,
    });
  };

  const isListed = movie.watchlist === WATCHLIST.LISTED; // we don't care if watchlist is REMOVED or undefined, both means it's not listed
  const label = isListed ? "Remove from favorites" : "Add to favorites";
  return (
    <Tooltip label={label}>
      <IconButton
        aria-label={label}
        icon={<FavoriteIcon />}
        colorScheme="teal"
        variant={isListed ? "solid" : "outline"}
        isLoading={status === STATUS.PENDING}
        onClick={toggleWatchlist}
      />
    </Tooltip>
  );
}

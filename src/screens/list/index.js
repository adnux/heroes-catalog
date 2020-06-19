import { Link } from "@reach/router";
import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { usePaginatedQuery, queryCache } from "react-query";
import axios from "axios";
import api, { fetchCharacters, fetchComicsPage } from "../../api";
import ListItem from "./listItem";


const List = (props) => {
  const [page, setPage] = useState(0);
  const [name, setName] = useState("");
  const [characters, setCharacters] = useState();

  const fetchComics = useCallback(
    async (key, page) => await fetchComicsPage(page, characters),
    [page]
  );

  const {
    status,
    resolvedData,
    latestData,
    error,
    isFetching,
  } = usePaginatedQuery(["heroes", page], fetchComics, {});

  useEffect(() => {
    if (latestData?.hasMore) {
      queryCache.prefetchQuery(["projects", page + 1, characters], fetchComics);
    }
  }, [latestData, fetchCharacters, page]);

  return (
    <div>
      Heroes List
      {status === "loading" ? (
        <div>Loading...</div>
      ) : status === "error" ? (
        <div>Error: {error.message}</div>
      ) : (
        <ul>
          {resolvedData.results.map((comic) => (
              <ListItem key={comic.id} comic={comic} />
            ))}
        </ul>
      )}
      {/*  */}
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Previous Page
      </button>{" "}
      <button
        onClick={() =>
          setPage((old) => (!latestData || !latestData.hasMore ? old : old + 1))
        }
        disabled={!latestData || !latestData.hasMore}
      >
        Next Page
      </button>
      {/*  */}
    </div>
  );
};

List.propTypes = {};

export default List;

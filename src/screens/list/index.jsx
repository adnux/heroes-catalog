import { List, Row, Pagination } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { queryCache, usePaginatedQuery } from "react-query";
import { fetchCharacters, fetchComicsPage } from "../../api";
import ListItem from "./listItem";

const ComicsList = (props) => {
  const { page, setPage } = props;
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
  console.log("status", status);
  // console.log("resolvedData", resolvedData);
  // console.log("latestData", latestData);
  return (
    <div>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : status === "error" ? (
        <div>Error: {error.message}</div>
      ) : (
        <div className="site-card-wrapper">
          <Row gutter={8}>
            {resolvedData.results.map((comic) => (
              <ListItem key={comic.id} comic={comic} />
            ))}
          </Row>
        </div>
      )}
      {/*  */}
      {resolvedData && (
        <Pagination
          defaultCurrent={1}
          current={page}
          showSizeChanger={false}
          showQuickJumper
          total={resolvedData.total}
          onChange={(page) => {
            setPage(page);
            window.scrollTo(0, 0);
          }}
        />
      )}
    </div>
  );
};

ComicsList.propTypes = {};

export default ComicsList;

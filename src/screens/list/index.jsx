import { List, Row, Pagination } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { queryCache, usePaginatedQuery } from "react-query";
import { fetchCharacters, fetchComicsPage } from "../../api";
import ListItem from "./listItem";
import useHeader from "../header/use";

const ComicsList = (props) => {
  const {
    state: { loading, comics, page, characters, selected },
    actions: { setLoading, fetchComics, setPage, setCharacters, handleCharFieldChange },
  } = useHeader();

  useEffect(() => {
    fetchComics(page, selected);
  }, [page, selected, fetchComics]);

  // const {
  //   status,
  //   resolvedData,
  //   latestData,
  //   error,
  //   isFetching,
  // } = usePaginatedQuery(["heroes", page], fetchComics, {});

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="site-card-wrapper">
          <Row gutter={8}>
            {comics?.results?.map((comic) => (
              <ListItem key={comic.id} comic={comic} />
            ))}
          </Row>
        </div>
      )}
      {/*  */}
      {comics && (
        <Pagination
          defaultCurrent={1}
          current={page}
          showSizeChanger={false}
          showQuickJumper
          total={comics.total}
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

import { Space, Col } from "antd";
import React, { useCallback } from "react";
import { useQuery } from "react-query";
import { fetchComicDetais } from "../../api";
import Comic from "./comic";
/**
 * Comic {
 *   id (int, optional): The unique ID of the comic resource.,
 *   title (string, optional): The canonical title of the comic.,
 *   thumbnail (Image, optional): The representative image for this comic.,
 *   images (Array[Image], optional): A list of promotional images associated with this comic.,
 *   description (string, optional): The preferred description of the comic.,
 *   creators (CreatorList, optional): A resource list containing the creators associated with this comic.,
 *   characters (CharacterList, optional): A resource list containing the characters which appear in this comic.,
 *   stories (StoryList, optional): A resource list containing the stories which appear in this comic.,
 *   format (string, optional): The publication format of the comic e.g. comic, hardcover, trade paperback.,
 *   pageCount (int, optional): The number of story pages in the comic.,
 *   issn (string, optional): The ISSN barcode for the comic.,
 *   isbn (string, optional): The ISBN for the comic (generally only populated for collection formats).,
 *   prices (Array[ComicPrice], optional): A list of prices for this comic.,
 * }
 */

const Details = ({ id }) => {
  const fetchComic = useCallback(
    async (key, id) => await fetchComicDetais(id),
    [id]
  );

  const { status, data, error, isFetching } = useQuery(
    id && ["comic", id],
    fetchComic
  );
  return (
    <Col align="center">
      {!id || status === "loading" ? (
        <span>"Loading ..."</span>
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <Comic comic={data} />
      )}
    </Col>
  );
};

Details.propTypes = {};

export default Details;

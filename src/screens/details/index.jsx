import { Card, Descriptions } from "antd";
import React, { useCallback } from "react";
import { useQuery } from "react-query";
import { fetchComicDetais } from "../../api";
import { cutString } from "../../utils/strings";

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
    <div>
      {!id || status === "loading" ? (
        <span>"Loading ..."</span>
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <Comic comic={data} />
      )}
    </div>
  );
};

Details.propTypes = {};

const Comic = ({ comic }) => {
  console.log('comic', comic)
  const {
    title,
    thumbnail: { path, extension },
    images,
    description,
    creators,
    characters,
    format,
  } = comic;
  const authors = cutString(
    creators.items.map((creator) => creator.name).join(", ")
  );
  const desc = cutString(description);
  // const
  return (
    <>
      <Card
        title={title}
        cover={<img alt={title} src={`${path}.${extension}`} />}
        style={{ maxWidth: "800px" }}
      >
        <Descriptions layout="vertical">
          {description && (
            <Descriptions.Item label="Description">{desc}</Descriptions.Item>
          )}
          {authors && (
            <Descriptions.Item label="Authors">{authors}</Descriptions.Item>
          )}
          {format && (
            <Descriptions.Item label="Format">{format}</Descriptions.Item>
          )}
          {images && (
            <Descriptions.Item label="Images">
              {images.map((image) => (
                <div key={image.path}>
                  <img src={`${image.path}.${image.extension}`} style={{ width: "50px" }} />
                </div>
              ))}
            </Descriptions.Item>
          )}
          {characters && characters.available > 0 && (
            <Descriptions.Item label="characters">
              {characters.items.map((char) => (
                <div>
                  {char.name}
                </div>
              ))}
            </Descriptions.Item>
          )}
        </Descriptions>
      </Card>
    </>
  );
};

Comic.propTypes = {};

export default Details;

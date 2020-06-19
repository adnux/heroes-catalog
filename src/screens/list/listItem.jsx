import { Link } from "@reach/router";
import { Avatar, List, Skeleton, Col, Card, Descriptions } from "antd";
import React from "react";
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

const ListItem = ({ comic }) => {
  const {
    id,
    title,
    thumbnail: { path, extension },
    images,
    creators,
    description,
    format,
    modified,
  } = comic;
  // Título, imagem, thumbnail e autores
  let authors = creators.items.map((creator) => creator.name).join(", ");
  authors = cutString(authors);
  let desc = cutString(description);
  return (
    <Col sm={12} md={8} xl={4}>
      <Card
        title={title}
        alt={title}
        type="inner"
        cover={<img alt={title} src={`${path}.${extension}`} />}
        extra={<Link to={`hero/${id}`}>More</Link>}
      >
        <Link to={`hero/${id}`}>
          <Descriptions bordered layout="vertical">
            {description && (
              <Descriptions.Item span={3} label="Description">
                {desc}
              </Descriptions.Item>
            )}
            {authors && (
              <Descriptions.Item span={3} label="Authors">
                {authors}
              </Descriptions.Item>
            )}
            {format && (
              <Descriptions.Item label="Format">{format}</Descriptions.Item>
            )}
            {images && (
              <Descriptions.Item label="Images">
                {images.length}
              </Descriptions.Item>
            )}
            {/* {modified && (
              <Descriptions.Item label="Modified">{modified}</Descriptions.Item>
            )} */}
          </Descriptions>
        </Link>
      </Card>
    </Col>
  );
};

ListItem.propTypes = {};

export default ListItem;

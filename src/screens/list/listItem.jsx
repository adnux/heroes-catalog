import React from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";

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
  } = comic;
  // Título, imagem, thumbnail e autores
  let authors = creators.items.map((creator) => creator.name).join(", ");
  const maxLenth = 60;
  if (authors.length > maxLenth) {
    authors = `${authors.substring(0, maxLenth)}...`;
  }
  return (
    <li>
      <span>
        <img src={`${path}.${extension}`} style={{ width: "50px" }} />
        <Link to={`hero/${id}`}>Title: {title}</Link>
      </span>
      <div>
        {images.map((image) => (
          <img src={`${path}.${extension}`} style={{ width: "50px" }} />
        ))}
      </div>
      <div>{authors}</div>
    </li>
  );
};

ListItem.propTypes = {};

export default ListItem;

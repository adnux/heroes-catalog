import { Card, Descriptions, Carousel, Space } from "antd";
import React from "react";
import { cutString } from "../../utils/strings";

const Comic = ({ comic }) => {
  const {
    title,
    thumbnail: { path, extension },
    images,
    description,
    creators,
    characters,
    format,
  } = comic;
  const authors = creators?.items?.map((creator) => creator.name).join(", ");
  const heroes = characters?.items?.map((char) => char.name).join(", ");
  console.log("authors", authors);
  console.log("heroes", heroes);

  return (
    <>
      <Card
        title={title}
        cover={<img alt={title} src={`${path}.${extension}`} />}
        style={{ maxWidth: "800px" }}
      >
        <Descriptions bordered layout="vertical">
          {description && (
            <Descriptions.Item span={3} label="Description">
              {description}
            </Descriptions.Item>
          )}
          {authors && (
            <Descriptions.Item label="Authors">{authors}</Descriptions.Item>
          )}
          {format && (
            <Descriptions.Item label="Format">{format}</Descriptions.Item>
          )}
          {heroes && (
            <Descriptions.Item label="heroes">{heroes}</Descriptions.Item>
          )}
        </Descriptions>
        {images &&
          images.map((image) => (
            <Space
              key={`${image.path}.${image.extension}`}
              align="center"
              style={{ margin: "10px" }}
            >
              <a href={`${image.path}.${image.extension}`} target="_blank">
                <img
                  src={`${image.path}.${image.extension}`}
                  style={{ width: "200px" }}
                />
              </a>
            </Space>
          ))}
      </Card>
    </>
  );
};

Comic.propTypes = {};

export default Comic;

import { navigate } from "@reach/router";
import { PageHeader, Select, Spin } from "antd";
import "antd/dist/antd.css";
import React, { useState } from "react";
import useHeader from "./use";
const { Option } = Select;

const Header = (props) => {
  const {
    state: { characters },
    actions: { handleSelectChar, handleCharFieldChange },
  } = useHeader();

  return (
    <PageHeader
      theme="dark"
      className="site-page-header"
      onBack={() => navigate("/")}
      title="Marvel Heroes"
      subTitle="A list of Comics"
      extra={[
        <Select
          showSearch
          style={{ width: 300 }}
          // size="large"
          placeholder="Find a character"
          optionFilterProp="children"
          allowClear
          notFoundContent={characters?.length < 1 ? <Spin size="small" /> : null}
          onSearch={handleCharFieldChange}
          onChange={(id) => handleSelectChar(id)}
        >
          {characters?.map((char) => (
            <Option key={char.id}>{char.id + "-" + char.name}</Option>
          ))}
        </Select>,
      ]}
    />
  );
};

Header.propTypes = {};

export default Header;

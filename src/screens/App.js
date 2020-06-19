import { navigate, Router } from "@reach/router";
import { Layout, PageHeader, Select } from "antd";
import "antd/dist/antd.css";
import React, { useState } from "react";
import "./App.css";
import Details from "./details/index.jsx";
import ComicsList from "./list";
import { ScrollToTop } from "./ScrollToTop";

const { Option } = Select;

const { Header, Footer, Sider, Content } = Layout;

function App() {
  const [page, setPage] = useState(100);
  return (
    <div className="App">
      <Layout>
        <PageHeader
          theme="dark"
          className="site-page-header"
          onBack={() => navigate("/")}
          title="Marvel Heroes"
          subTitle="A list of Comics"
          extra={[
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a person"
              optionFilterProp="children"
              // onChange={onChange}
              // onFocus={onFocus}
              // onBlur={onBlur}
              // onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>,
          ]}
        />
        <Content>
          <Router
            primary={false}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ScrollToTop path="/">
              <ComicsList path="/" page={page} setPage={setPage} />
              <Details path="hero/:id" />
            </ScrollToTop>
          </Router>
        </Content>
        <Footer>Marvel</Footer>
      </Layout>
    </div>
  );
}

export default App;

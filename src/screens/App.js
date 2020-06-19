import { Router } from "@reach/router";
import { Layout, Select } from "antd";
import "antd/dist/antd.css";
import React from "react";
import "./App.css";
import Details from "./details/index.jsx";
import Header from './header';
import HeaderProvider from './header/provider';
import ComicsList from "./list";
import { ScrollToTop } from "./ScrollToTop";

const { Option } = Select;

const {  Footer, Sider, Content } = Layout;

function App() {
  return (
    <div className="App">
      <HeaderProvider>
        <Layout>
          <Header/>
          <Content>
            <Router primary={false}>
              <ScrollToTop path="/">
                <ComicsList path="/" />
                <Details path="hero/:id" />
              </ScrollToTop>
            </Router>
          </Content>
          <Footer>Marvel</Footer>
        </Layout>
      </HeaderProvider>
    </div>
  );
}

export default App;

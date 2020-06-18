import { Link } from "@reach/router";
import React from "react";
import PropTypes from "prop-types";

const List = (props) => {
  return (
    <div>
      Heroes List
      <ul>
        <li>
          <Link to={`hero/1`}>Hero 1</Link>
        </li>
        <li>
          <Link to={`hero/2`}>Hero 2</Link>
        </li>
        <li>
          <Link to={`hero/3`}>Hero 3</Link>
        </li>
      </ul>
    </div>
  );
};

List.propTypes = {};

export default List;

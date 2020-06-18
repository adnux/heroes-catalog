import React from "react";
import PropTypes from "prop-types";

const Details = (props) => {
  const { id } = props;
  console.log('Heroe id', id)
return <div>Heroe {id}</div>;
};

Details.propTypes = {};

export default Details;

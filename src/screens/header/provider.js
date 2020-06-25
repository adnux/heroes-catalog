import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { HeaderContext } from "./context";
import { fetchCharacters, fetchComicsPage } from "../../api";

const HeaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [comics, setComics] = useState([]);
  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState([]);
  const [selected, setSelected] = useState();

  const handleSelectChar = (id) => {
    setPage(1);
    setSelected(id);
  };

  const handleCharFieldChange = useCallback(async (value) => {
    const chars = await fetchCharacters(0, value);
    setCharacters(chars);
  }, []);

  const fetchComics = useCallback(
    async (page, selected) => {
      setLoading(true);
      let result = await fetchComicsPage(page, selected);
      setComics(result);
      setLoading(false);
    },
    [page, selected]
  );

  const value = {
    state: {
      loading,
      comics,
      page,
      characters,
      selected,
    },
    actions: {
      setLoading,
      fetchComics,
      setPage,
      setCharacters,
      handleSelectChar,
      handleCharFieldChange,
    },
  };
  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
};

HeaderProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default HeaderProvider;

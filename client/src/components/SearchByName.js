import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import Results from "./Results";
import Pagination from "./Pagination";

const SearchByName = () => {
  const [text, setText] = useState();
  const [viewResults, setViewResults] = useState(false);
  let history = useHistory();

  const handleChange = (ev) => {
    setText(ev.target.value);
  };

  const handleClick = (ev) => {
    history.push(`/search/${text}`);
  };

  return (
    <>
      <form>
        <Search>
          <Input
            placeholder="Search drinks by name..."
            onChange={handleChange}
          />
          <Searchbutton onClick={handleClick}>Search</Searchbutton>
        </Search>
      </form>
    </>
  );
};

const Search = styled.div`
  width: 500px;
  display: flex;

  justify-content: space-between;
`;
const Input = styled.input`
  width: 80%;
  height: 20px;
  padding: 10px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border: 1px solid #d1d1d1;
  text-transform: capitalize;
  background: none;
  color: #a9a9a9;
  outline: none;
`;
const Searchbutton = styled.button`
  width: 20%;
  height: 40px;
  padding: 10px 20px;
  border: none;
  outline: none;
  cursor: pointer;
  background: #383838;
  color: #fff;
  text-transform: capitalize;
  font-size: 15px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export default SearchByName;

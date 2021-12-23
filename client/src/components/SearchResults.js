import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import Pagination from "./Pagination";
import Results from "./Results";

const SearchResults = () => {
  const [drinks, setDrinks] = useState(null);
  const [status, setStatus] = useState("idle");
  const { text } = useParams();

  useEffect(() => {
    setStatus("loading");
    fetch(`/api/search/name/${text}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus("idle");
        setDrinks(data.drinks);
      });
  }, []);

  return (
    <>
      {status === "loading" ? (
        <div>LOADING</div>
      ) : (
        <div>
          {drinks !== null && (
            <Pagination
              data={drinks}
              RenderComponent={Results}
              dataLimit={10}
            />
          )}
          {drinks === null && <div>Results Not Found</div>}
        </div>
      )}
    </>
  );
};

export default SearchResults;

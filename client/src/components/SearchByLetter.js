import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Results from "./Results";
import Pagination from "./Pagination";

const SearchByLetter = () => {
  const [selectedLetter, setSelectedLetter] = useState("a");
  const [status, setStatus] = useState("idle");
  const [drinks, setDrinks] = useState(null);

  useEffect(() => {
    setStatus("loading");
    fetch(`/api/search/${selectedLetter}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus("idle");
        setDrinks(data.drinks);
      });
  }, [selectedLetter]);

  const handleClick = (ev) => {
    setSelectedLetter(ev.target.value);
  };

  const letterArray = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  return (
    <>
      {status === "loading" ? (
        <div>LOADING</div>
      ) : (
        <Wrapper>
          <div>
            {letterArray.map((letter) => {
              return (
                <Span onClick={handleClick} value={letter.toLowerCase()}>
                  {letter}
                </Span>
              );
            })}
          </div>
          <PageWrapper>
            {drinks !== null && (
              <Pagination
                data={drinks}
                RenderComponent={Results}
                dataLimit={25}
              />
            )}
          </PageWrapper>
        </Wrapper>
      )}
    </>
  );
};

const Span = styled.button`
  font-weight: bold;
  font-family: "roboto", sans-serif;
`;

const Wrapper = styled.div``;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default SearchByLetter;

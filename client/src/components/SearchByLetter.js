import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { RadialProgress } from "react-radial-progress-indicator";

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
      <Wrapper>
        {status === "loading" ? (
          <LoadingDiv>
            <RadialProgress
              backgroundColour="#3b3a41"
              backgroundTransparent
              duration={10000}
              fontRatio={4}
              height={200}
              ringBgColour="#B56576"
              ringFgColour="#F5E0B7"
              ringIntermediateColour="#8B807B"
              ringThickness={0.2}
              segmented={false}
              showIntermediateProgress
              startStep={0}
              step={10}
              steps={10}
              text={function text(steps, proportion) {
                return "".concat(Math.floor(100 * proportion), "%");
              }}
              width={100}
            />
          </LoadingDiv>
        ) : (
          <>
            <Div>
              {letterArray.map((letter) => {
                return (
                  <Span
                    onClick={handleClick}
                    value={letter.toLowerCase()}
                    key={letter}
                  >
                    {letter}
                  </Span>
                );
              })}
            </Div>
            <PageWrapper>
              {drinks !== null && (
                <Pagination
                  data={drinks}
                  RenderComponent={Results}
                  dataLimit={10}
                />
              )}
            </PageWrapper>
          </>
        )}
      </Wrapper>
    </>
  );
};

const LoadingDiv = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
`;

const Span = styled.button`
  font-weight: bold;
  border: 2px solid var(--color-almond);
  background: var(--color-black);
  color: var(--color-almond);
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;

  &:hover {
    background: var(--color-almond);
    color: var(--color-black);
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 1000px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default SearchByLetter;

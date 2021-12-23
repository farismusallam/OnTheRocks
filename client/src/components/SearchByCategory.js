import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { RadialProgress } from "react-radial-progress-indicator";

import Results from "./Results";
import Pagination from "./Pagination";

const SearchByCategory = () => {
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Ordinary_Drink");
  const [status, setStatus] = useState("idle");
  const [drinks, setDrinks] = useState(null);

  useEffect(() => {
    setStatus("loading");
    fetch("/api/list/categories")
      .then((res) => res.json())
      .then((data) => {
        setStatus("idle");
        const items = Object.values(data.drinks);
        const array = items.map((obj) => {
          return obj.strCategory;
        });
        setCategories(array);
      });
  }, []);

  useEffect(() => {
    setStatus("loading");
    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
    )
      .then((res) => res.json())
      .then((data) => {
        setStatus("idle");
        setDrinks(data.drinks);
      });
  }, [selectedCategory]);

  const handleClick = (ev) => {
    const word = ev.target.value;
    const newWord = word.split(" ").join("_");
    setSelectedCategory(newWord);
    // getDrinkCategory(selectedCategory);
  };

  return (
    <>
      <Wrapper>
        {status === "loading" || categories === null ? (
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
              {categories.map((category) => {
                return (
                  <Span onClick={handleClick} value={category} key={category}>
                    {category}
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

const Div = styled.div`
  display: flex;
  justify-content: center;
`;

const LoadingDiv = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const Span = styled.button`
  font-weight: bold;
  border: 2px solid var(--color-almond);
  background: var(--color-black);
  color: var(--color-almond);
  border-radius: 10px;
  margin-left: 5px;
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

export default SearchByCategory;

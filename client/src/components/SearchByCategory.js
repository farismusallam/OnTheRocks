import React, { useState, useEffect } from "react";
import styled from "styled-components";

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
      {status === "loading" || categories === null ? (
        <div>LOADING</div>
      ) : (
        <Wrapper>
          <div>
            {categories.map((category) => {
              return (
                <Span onClick={handleClick} value={category}>
                  {category}
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

export default SearchByCategory;

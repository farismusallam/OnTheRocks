import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { RadialProgress } from "react-radial-progress-indicator";

import Pagination from "./Pagination";
import Results from "./Results";

const SearchByIngredients = () => {
  const [status, setStatus] = useState("idle");
  const [ingredients, setIngredients] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [finalIngredients, setFinalIngredients] = useState(null);
  const [drinks, setDrinks] = useState(null);

  useEffect(() => {
    setStatus("loading");
    fetch("/api/list/ingredients")
      .then((res) => res.json())
      .then((data) => {
        setStatus("idle");
        const items = Object.values(data.drinks);
        const array = items.map((obj) => {
          return obj.strIngredient1;
        });
        setIngredients(array);
      });
  }, []);

  useEffect(() => {
    if (finalIngredients !== null) {
      setStatus("loading");
      fetch(`/api/search/ingredients/${finalIngredients}`)
        .then((res) => res.json())
        .then((data) => {
          setStatus("idle");
          setDrinks(data.drinks);
        });
    }
  }, [finalIngredients]);

  const handleChange = (ev) => {
    const word = ev.target.value;
    const newWord = word.split(" ").join("_");

    if (ev.target.checked === true) {
      setSelectedIngredients([...selectedIngredients, newWord]);
    } else {
      const selected = selectedIngredients.filter((item) => {
        if (item === newWord) return false;
        return true;
      });
      setSelectedIngredients([...selected]);
    }
  };

  const handleClick = () => {
    const newSelected = selectedIngredients.toString();
    const finalSelected = newSelected.split(" ").join("");
    setFinalIngredients(finalSelected);
    setSelectedIngredients([]);
  };

  if (ingredients === null || status === "loading") {
    return (
      <Wrapper>
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
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Span>Select ingredients:</Span>
      <Form>
        {ingredients.map((ingredient) => {
          return (
            <div key={ingredient}>
              <input
                type="checkbox"
                value={ingredient}
                onChange={handleChange}
              />
              <Label for={ingredient}> {ingredient}</Label>
            </div>
          );
        })}
      </Form>
      <Button
        onClick={handleClick}
        disabled={selectedIngredients.length > 0 ? false : true}
      >
        Search
      </Button>
      {drinks === "None Found" ? (
        <ResultsSpan>Results Not Found</ResultsSpan>
      ) : null}
      <PageWrapper>
        {drinks !== null && drinks !== "None Found" ? (
          <Pagination data={drinks} RenderComponent={Results} dataLimit={10} />
        ) : null}
      </PageWrapper>
    </Wrapper>
  );
};

const ResultsSpan = styled.div`
  margin-top: 20px;
`;

const Span = styled.span`
  margin-bottom: 20px;
`;

const LoadingDiv = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 1000px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--color-black);
`;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Label = styled.label`
  font-size: 10px;
`;

const Form = styled.form`
  display: inline-grid;
  grid-template-columns: repeat(7, 1fr);
`;

const Button = styled.button`
  font-weight: bold;
  border: 2px solid var(--color-almond);
  background: var(--color-black);
  color: var(--color-almond);
  border-radius: 30px;
  padding: 10px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background: var(--color-almond);
    color: var(--color-black);
  }
  &:disabled {
    opacity: 0.5;
    background-color: grey;
    cursor: default;
    border: none;
`;

export default SearchByIngredients;

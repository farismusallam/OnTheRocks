import React, { useEffect, useState } from "react";
import styled from "styled-components";

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
  };

  if (ingredients === null || status === "loading") {
    return <div>LOADING</div>;
  }

  if (drinks === "None Found") {
    return <div>Results Not Found</div>;
  }

  return (
    <div>
      <form>
        {ingredients.map((ingredient) => {
          return (
            <div>
              <input
                type="checkbox"
                value={ingredient}
                onChange={handleChange}
              />
              <label for={ingredient}> {ingredient}</label>
            </div>
          );
        })}
      </form>
      <button onClick={handleClick}>Search</button>
      <PageWrapper>
        {drinks !== null && (
          <Pagination data={drinks} RenderComponent={Results} dataLimit={25} />
        )}
      </PageWrapper>
    </div>
  );
};

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default SearchByIngredients;

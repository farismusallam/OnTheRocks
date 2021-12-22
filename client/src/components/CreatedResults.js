import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import whiskey from "../assets/whiskey.gif";

const CreatedResults = ({ data }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const handleRemove = (name, ingredients, instructions, category, id) => {
    fetch("/api/create/remove", {
      method: "PATCH",
      body: JSON.stringify({
        _id: user.sub,
        drinkName: name,
        drinkThumb: whiskey,
        drinkIngredients: ingredients,
        drinkInstructions: instructions,
        drinkCategory: category,
        drinkId: id,
      }),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {});
    window.location.reload();
  };

  if (data.length === 0 || data === undefined) {
    return <div>No Drinks Found</div>;
  }

  return (
    <div>
      {data.map((drink) => {
        console.log("drink", drink);
        return (
          <DrinkBox>
            <Image alt={drink.drinkName} src={drink.drinkThumb} />
            <TextBox>
              <span>{drink.drinkName}</span>
              <span>Category: {drink.drinkCategory}</span>
              <span>Ingredients: {drink.drinkIngredients}</span>
              <span>Instructions: {drink.drinkInstructions}</span>
            </TextBox>
            <button
              onClick={() =>
                handleRemove(
                  drink.drinkName,
                  drink.drinkIngredients,
                  drink.drinkInstructions,
                  drink.drinkCategory,
                  drink.drinkId
                )
              }
            >
              Delete Drink
            </button>
          </DrinkBox>
        );
      })}
    </div>
  );
};

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const DrinkBox = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const Image = styled.img`
  width: 200px;
`;

export default CreatedResults;

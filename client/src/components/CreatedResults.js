import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { FiTrash2 } from "react-icons/fi";

import whiskey from "../assets/whiskey.gif";

const CreatedResults = ({ data }) => {
  const { user } = useAuth0();

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
    <Wrapper>
      <LilDiv>
        {data.map((drink) => {
          return (
            <DrinkBox key={drink.drinkId}>
              <Image alt={drink.drinkName} src={drink.drinkThumb} />
              <TextBox>
                <Div>
                  <H2>{drink.drinkName}</H2>
                  <Details>
                    <Span>Category:</Span>
                    <span>{drink.drinkCategory}</span>
                  </Details>
                  <Details>
                    <Span>Ingredients:</Span>
                    <span>{drink.drinkIngredients}</span>
                  </Details>
                  <Details>
                    <Span>Instructions:</Span>
                    <span>{drink.drinkInstructions}</span>
                  </Details>
                </Div>
              </TextBox>
              <Button
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
                <FiTrash2 style={{ fontSize: "30px" }} />
              </Button>
            </DrinkBox>
          );
        })}
      </LilDiv>
    </Wrapper>
  );
};

const LilDiv = styled.div`
  min-height: 100px;
  overflow: scroll;
  height: 500px;
  border: 1px solid var(--color-grey);
  padding: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  background: var(--color-black);
`;

const Details = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  width: 10%;
  font-weight: bold;
  border: 2px solid var(--color-red);
  background: var(--color-black);
  color: var(--color-red);
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  cursor: pointer;

  &:hover {
    background: var(--color-red);
    color: var(--color-black);
  }
`;

const H2 = styled.h2`
  margin-top: 0;
  margin-bottom: 10px;
  text-decoration: underline;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

const Span = styled.span`
  font-weight: bold;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  min-height: 100px;
  padding-left: 20px;
  padding-right: 20px;
  border: 2px solid var(--color-grey);
  border-right: none;
  width: 100%;
`;

const DrinkBox = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const Image = styled.img`
  width: 200px;
`;

export default CreatedResults;

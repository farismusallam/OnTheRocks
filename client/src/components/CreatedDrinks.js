import React, { useState } from "react";
import styled from "styled-components";
import { HiPlus } from "react-icons/hi";

import Pagination from "./Pagination";
import CreatedResults from "./CreatedResults";

import whiskey from "../assets/whiskey.gif";

const CreatedDrinks = ({ collections, currentUser, id }) => {
  const [createDrink, setCreateDrink] = useState(false);
  const [name, setName] = useState(null);
  const [category, setCategory] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [instructions, setInstructions] = useState(null);

  const handleClick = () => {
    setCreateDrink(!createDrink);
  };

  const handleName = (ev) => {
    setName(ev.target.value);
  };

  const handleCategory = (ev) => {
    setCategory(ev.target.value);
  };

  const handleIngredients = (ev) => {
    setIngredients(ev.target.value);
  };

  const handleInstructions = (ev) => {
    setInstructions(ev.target.value);
  };

  const addCreatedDrink = (ev) => {
    fetch("/api/create/add", {
      method: "POST",
      body: JSON.stringify({
        _id: currentUser._id,
        name: name,
        thumb: whiskey,
        ingredients: ingredients,
        instructions: instructions,
        category: category,
      }),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {});
  };

  return (
    <Wrapper>
      {currentUser._id === id ? (
        <Button onClick={handleClick}>
          <ButtonDiv>
            <HiPlus />
            <Span>Create a drink!</Span>
          </ButtonDiv>
        </Button>
      ) : null}
      <div>
        {createDrink === true ? (
          <>
            <Form onSubmit={addCreatedDrink}>
              <Label for="name">Choose a Drink Name:</Label>
              <Input
                required="true"
                id="name"
                name="name"
                type="text"
                placeholder="Drink name..."
                onChange={handleName}
              />
              <Label for="category">Choose a category:</Label>
              <Select
                id="category"
                name="category"
                onChange={handleCategory}
                required="true"
              >
                <option value="">-- Select A Category --</option>
                <option value="Ordinary Drink">Ordinary Drink</option>;
                <option value="Cocktail">Cocktail</option>;
                <option value="Milk/Float/Shake">Milk/Float/Shake</option>;
                <option value="Other/Unkown">Other/Unknown</option>;
                <option value="Cocoa">Cocoa</option>;
                <option value="Shot">Shot</option>;
                <option value="Coffee/Tea">Coffee/Tea</option>;
                <option value="Homemade Liqueur">Homemade Liqueur</option>;
                <option value="Punch/Party Drink">Punch/Party Drink</option>;
                <option value="Beer">Beer</option>;
                <option value="Soft Drink/Soda">Soft Drink/Soda</option>;
              </Select>
              <Label for="ingredients">Choose ingredients:</Label>
              <Input
                required="true"
                id="ingredients"
                name="ingredients"
                type="text"
                placeholder="Please separate ingredients by commas..."
                onChange={handleIngredients}
              />
              <Label for="instructions">Input instructions:</Label>
              <Input
                required="true"
                id="instructions"
                name="instructions"
                type="text"
                placeholder="Please type out instructions..."
                onChange={handleInstructions}
              />
              <ButtonSubmit type="submit">Submit Drink!</ButtonSubmit>
            </Form>
          </>
        ) : null}
      </div>
      <div>
        <Pagination
          data={collections}
          RenderComponent={CreatedResults}
          dataLimit={10}
        />
      </div>
    </Wrapper>
  );
};

const ButtonSubmit = styled.button`
  font-weight: bold;
  border: 2px solid var(--color-almond);
  background: var(--color-black);
  color: var(--color-almond);
  border-radius: 30px;
  padding: 10px;
  cursor: pointer;
  margin-top: 10px;
  width: 40%;
  align-self: center;

  &:hover {
    background: var(--color-almond);
    color: var(--color-black);
  }
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 500px;
  margin-bottom: 10px;
`;

const Select = styled.select`
  width: 500px;
  margin-bottom: 10px;
`;

const Form = styled.form`
  border: 2px solid var(--color-grey);
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin: 15px;
  border-radius: 20px;
`;

const Span = styled.span`
  margin-left: 5px;
`;

const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.div`
  font-weight: bold;
  border: 2px solid var(--color-red);
  background: var(--color-black);
  color: var(--color-red);
  border-radius: 30px;
  padding: 10px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background: var(--color-red);
    color: var(--color-black);
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 500px;
  background: var(--color-black);
`;

export default CreatedDrinks;

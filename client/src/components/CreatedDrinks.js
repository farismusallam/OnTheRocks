import React, { useState, useEffect } from "react";
import styled from "styled-components";

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

  console.log("onchange", name, whiskey, category, ingredients, instructions);

  return (
    <div>
      {currentUser._id === id ? (
        <button onClick={handleClick}>+ Create a drink!</button>
      ) : null}
      <div>
        {createDrink === true ? (
          <>
            <form onSubmit={addCreatedDrink}>
              <label for="name">Choose a Drink Name:</label>
              <input
                required="true"
                id="name"
                name="name"
                type="text"
                placeholder="Drink name"
                onChange={handleName}
              />
              <label for="category">Choose a category:</label>
              <select
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
              </select>
              <label for="ingredients">Choose ingredients:</label>
              <input
                required="true"
                id="ingredients"
                name="ingredients"
                type="text"
                placeholder="Please separate ingredients by commas..."
                onChange={handleIngredients}
              />
              <label for="instructions">Input instructions:</label>
              <input
                required="true"
                id="instructions"
                name="instructions"
                type="text"
                placeholder="Please type out instructions..."
                onChange={handleInstructions}
              />
              <button type="submit">Submit Drink!</button>
            </form>
          </>
        ) : null}
      </div>
      <div>
        <Pagination
          data={collections}
          RenderComponent={CreatedResults}
          dataLimit={25}
        />
      </div>
    </div>
  );
};

export default CreatedDrinks;

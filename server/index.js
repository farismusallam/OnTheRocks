const path = require("path");
const express = require("express");
const cors = require("cors");

const { searchByLetter } = require("./handlers/searchByLetter");
const { listOfCategories } = require("./handlers/listOfCategories");
const { listOfIngredients } = require("./handlers/listOfIngredients");
const { searchByName } = require("./handlers/searchByName");
const { getCocktailById } = require("./handlers/getCocktailById");
const { getRandomCocktails } = require("./handlers/getRandomCocktails");
const { addUser } = require("./handlers/addUser");
const { addFriend } = require("./handlers/addFriend");
const { removeFriend } = require("./handlers/removeFriend");
const { addDrink } = require("./handlers/addDrink");
const { addRating } = require("./handlers/addRating");
const { getUser } = require("./handlers/getUser");
const { getUsers } = require("./handlers/getUsers");
const { getUsersByNick } = require("./handlers/getUsersByNick");
const { getDrinkRating } = require("./handlers/getDrinkRating");
const { updateFavorites } = require("./handlers/updateFavorites");
const { removeFavorite } = require("./handlers/removeFavorite");
const { searchByIngredients } = require("./handlers/searchByIngredients");
const { addCreated } = require("./handlers/addCreated");
const { removeCreated } = require("./handlers/removeCreated");

const PORT = 8000;

express()
  .use(express.json())
  .use(cors())

  .get("/api/search/:letter", searchByLetter)
  .get("/api/search/name/:name", searchByName)
  .get("/api/search/ingredients/:ingredients", searchByIngredients)
  .get("/api/list/categories", listOfCategories)
  .get("/api/list/ingredients", listOfIngredients)
  .post("/api/user/add", addUser)
  .post("/api/cocktail/add", addDrink)
  .post("/api/create/add", addCreated)
  .get("/api/cocktail/:id", getCocktailById)
  .get("/api/cocktails/random", getRandomCocktails)
  .get("/api/user/find/:_id", getUser)
  .get("/api/users/find", getUsers)
  .get("/api/users/find/nick/:nickname", getUsersByNick)
  .get("/api/cocktail/find/:_id", getDrinkRating)
  .patch("/api/user/add/favorites", updateFavorites)
  .patch("/api/user/remove/favorite", removeFavorite)
  .patch("/api/cocktail/rating/add", addRating)
  .patch("/api/user/friend/add", addFriend)
  .patch("/api/user/friend/remove", removeFriend)
  .patch("/api/create/remove", removeCreated)

  .listen(PORT, function () {
    console.info("🌍 Listening on port " + PORT);
  });

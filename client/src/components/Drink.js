import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Drink = ({ currentUser }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const id = useParams();
  const [status, setStatus] = useState("idle");
  const [drink, setDrink] = useState(null);
  const [drinkRating, setDrinkRating] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [hasRatings, setHasRatings] = useState(false);
  const [hasFavorite, setHasFavorite] = useState();
  let ingredients = [];
  let measurements = [];

  useEffect(() => {
    setStatus("loading");
    fetch(`/api/cocktail/${id.id}`)
      .then((res) => res.json())
      .then((data) => {
        setDrink(data.drinks[0]);
        setStatus("idle");
      });
  }, [hasFavorite]);

  useEffect(() => {
    if (hasRatings === true) {
      setStatus("loading");
      fetch(`/api/cocktail/find/${id.id}`)
        .then((res) => res.json())
        .then((data) => {
          setDrinkRating(data.data.drinkRating);
          setStatus("idle");
        });
    }
  }, [hasRatings]);

  const addDrink = () => {
    fetch("/api/cocktail/add", {
      method: "POST",
      body: JSON.stringify({
        _id: drink.idDrink,
        strDrink: drink.strDrink,
        strDrinkThumb: drink.strDrinkThumb,
        drinkRating: [],
      }),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setHasRatings(true);
      });
  };

  const addRating = () => {
    fetch("/api/cocktail/rating/add", {
      method: "PATCH",
      body: JSON.stringify({
        _id: user.sub,
        idDrink: drink.idDrink,
        rating: selectedRating,
      }),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {});
  };

  const addToFavorite = () => {
    fetch("/api/user/add/favorites", {
      method: "PATCH",
      body: JSON.stringify({
        _id: user.sub,
        idDrink: drink.idDrink,
        strDrink: drink.strDrink,
        strDrinkThumb: drink.strDrinkThumb,
      }),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {});
    setHasFavorite(true);
    window.location.reload();
  };

  const removeFromFavorite = () => {
    fetch("/api/user/remove/favorite", {
      method: "PATCH",
      body: JSON.stringify({
        _id: user.sub,
        idDrink: drink.idDrink,
        strDrink: drink.strDrink,
        strDrinkThumb: drink.strDrinkThumb,
      }),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {});
    setHasFavorite(false);
    window.location.reload();
  };

  const handleChange = (ev) => {
    setSelectedRating(ev.target.value);
  };

  const handleClick = (ev) => {
    addRating();
  };

  if (drink !== null) {
    addDrink();
  }

  if (
    drink === null ||
    drinkRating === null ||
    currentUser === null ||
    status === "loading"
  ) {
    return <div>LOADING</div>;
  }

  let total = 0;
  let avg;
  let avgRounded;

  if (drinkRating.length >= 1) {
    for (let i = 0; i < drinkRating.length; i++) {
      total += drinkRating[i];
    }
    avg = total / drinkRating.length;
    avgRounded = Math.round(avg * 10) / 10;
  }

  ingredients.push(
    drink.strIngredient1,
    drink.strIngredient2,
    drink.strIngredient3,
    drink.strIngredient4,
    drink.strIngredient5,
    drink.strIngredient6,
    drink.strIngredient7,
    drink.strIngredient8,
    drink.strIngredient9,
    drink.strIngredient10,
    drink.strIngredient11,
    drink.strIngredient12,
    drink.strIngredient13,
    drink.strIngredient14,
    drink.strIngredient15
  );

  measurements.push(
    drink.strMeasure1,
    drink.strMeasure2,
    drink.strMeasure3,
    drink.strMeasure4,
    drink.strMeasure5,
    drink.strMeasure6,
    drink.strMeasure7,
    drink.strMeasure8,
    drink.strMeasure9,
    drink.strMeasure10,
    drink.strMeasure11,
    drink.strMeasure12,
    drink.strMeasure13,
    drink.strMeasure14,
    drink.strMeasure15
  );

  let favorite = currentUser.favorites.some((item) => {
    return item.idDrink === drink.idDrink;
  });

  console.log("favorite", favorite);

  let rated = currentUser.rated.filter((item) => {
    if (item.idDrink === drink.idDrink) {
      return item;
    }
  });

  return (
    <div>
      <DrinkBox>
        <Image alt={drink.strDrink} src={drink.strDrinkThumb} />
        <TextBox>
          <span>{drink.strDrink}</span>
          <span>Category:</span>
          <span>{drink.strCategory}</span>
          <span>{drink.strTags}</span>
          <span>Ingredients:</span>
          {ingredients.map((ingredient, i) => {
            return (
              <tr>
                <Td>{ingredient}</Td>
                <Td> {measurements[i]}</Td>
              </tr>
            );
          })}
          <span>Instructions:</span>
          <span>{drink.strInstructions}</span>
          <span>Avg Rating: {avgRounded}</span>
          {isAuthenticated && (
            <>
              {rated.length > 0 ? (
                <div>You rated this drink a {rated[0].rating}!</div>
              ) : (
                <form>
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      value={1}
                      onChange={handleChange}
                    />
                    1
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      value={2}
                      onChange={handleChange}
                    />
                    2
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      value={3}
                      onChange={handleChange}
                    />
                    3
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      value={4}
                      onChange={handleChange}
                    />
                    4
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      value={5}
                      onChange={handleChange}
                    />
                    5
                  </label>
                  <button onClick={handleClick}>Rate!</button>
                </form>
              )}

              {favorite ? (
                <button onClick={removeFromFavorite}>
                  Remove from Favorites!
                </button>
              ) : (
                <button onClick={addToFavorite}>Add to Favorites!</button>
              )}
            </>
          )}
        </TextBox>
      </DrinkBox>
    </div>
  );
};

const Td = styled.td`
  padding-right: 5px;
`;

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

export default Drink;

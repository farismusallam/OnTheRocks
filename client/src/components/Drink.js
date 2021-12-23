import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { RadialProgress } from "react-radial-progress-indicator";
import { BiDrink } from "react-icons/bi";

const Drink = ({ currentUser }) => {
  const { user, isAuthenticated } = useAuth0();
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

  if (drink === null || drinkRating === null || status === "loading") {
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

  let favorite;
  let rated;

  if (currentUser) {
    favorite = currentUser.favorites.some((item) => {
      return item.idDrink === drink.idDrink;
    });

    rated = currentUser.rated.filter((item) => {
      if (item.idDrink === drink.idDrink) {
        return item;
      }
    });
  }

  return (
    <Wrapper>
      <DrinkBox>
        <Image alt={drink.strDrink} src={drink.strDrinkThumb} />
        <TextBox>
          <h2 style={{ textDecoration: "underline" }}>{drink.strDrink}</h2>
          <Sub>Category:</Sub>
          <DetailDiv>
            <span>{drink.strCategory}</span>
          </DetailDiv>

          <Sub>Ingredients:</Sub>
          <DetailDiv>
            {ingredients.map((ingredient, i) => {
              return (
                <div key={ingredient + i}>
                  <tr>
                    <Td>{ingredient}</Td>
                    <Td> {measurements[i]}</Td>
                  </tr>
                </div>
              );
            })}
          </DetailDiv>
          <Sub>Instructions:</Sub>
          <DetailDiv>
            <span>{drink.strInstructions}</span>
          </DetailDiv>
          <DetailDiv>
            <Sub>Avg Rating: </Sub>
            <span style={{ color: "var(--color-red)" }}>{avgRounded}</span>
          </DetailDiv>
          {isAuthenticated && (
            <>
              {rated !== undefined && rated.length > 0 ? (
                <DetailDiv>
                  <Italic>
                    You rated this drink a{" "}
                    <span style={{ color: "var(--color-red" }}>
                      {rated[0].rating}
                    </span>
                    !
                  </Italic>
                </DetailDiv>
              ) : (
                <DetailDiv>
                  <Form>
                    <Label>
                      <Input
                        type="radio"
                        name="rating"
                        value={1}
                        onChange={handleChange}
                      />
                      <BiDrink
                        style={
                          selectedRating > 0
                            ? { color: "var(--color-red)", fontSize: "20px" }
                            : { fontSize: "20px" }
                        }
                      />
                    </Label>
                    <Label>
                      <Input
                        type="radio"
                        name="rating"
                        value={2}
                        onChange={handleChange}
                      />
                      <BiDrink
                        style={
                          selectedRating > 1
                            ? { color: "var(--color-red)", fontSize: "20px" }
                            : { fontSize: "20px" }
                        }
                      />
                    </Label>
                    <Label>
                      <Input
                        type="radio"
                        name="rating"
                        value={3}
                        onChange={handleChange}
                      />
                      <BiDrink
                        style={
                          selectedRating > 2
                            ? { color: "var(--color-red)", fontSize: "20px" }
                            : { fontSize: "20px" }
                        }
                      />
                    </Label>
                    <Label>
                      <Input
                        type="radio"
                        name="rating"
                        value={4}
                        onChange={handleChange}
                      />
                      <BiDrink
                        style={
                          selectedRating > 3
                            ? { color: "var(--color-red)", fontSize: "20px" }
                            : { fontSize: "20px" }
                        }
                      />
                    </Label>
                    <Label>
                      <Input
                        type="radio"
                        name="rating"
                        value={5}
                        onChange={handleChange}
                      />
                      <BiDrink
                        style={
                          selectedRating > 4
                            ? { color: "var(--color-red)", fontSize: "20px" }
                            : { fontSize: "20px" }
                        }
                      />
                    </Label>
                    <Button
                      onClick={handleClick}
                      disabled={selectedRating === null ? true : false}
                    >
                      Rate!
                    </Button>
                  </Form>
                </DetailDiv>
              )}

              {favorite ? (
                <Button onClick={removeFromFavorite}>
                  Remove from Favorites!
                </Button>
              ) : (
                <Button onClick={addToFavorite}>Add to Favorites!</Button>
              )}
            </>
          )}
        </TextBox>
      </DrinkBox>
    </Wrapper>
  );
};

const Italic = styled.span`
  font-style: italic;
`;

const Button = styled.button`
  font-weight: bold;
  border: 2px solid var(--color-almond);
  background: var(--color-black);
  color: var(--color-almond);
  border-radius: 10px;
  margin-left: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  padding: 5px;

  &:hover {
    background: var(--color-almond);
    color: var(--color-black);
  }
`;

const Form = styled.form`
  display: flex;
  align-items: center;
`;

const Sub = styled.span`
  font-weight: bold;
`;

const DetailDiv = styled.div`
  padding: 0 15px;
  margin-bottom: 15px;
`;

const Label = styled.label`
  cursor: pointer;
  margin-right: 10px;
`;

const Input = styled.input`
  display: none;
  cursor: pointer;
`;

const LoadingDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 500px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  background: var(--color-black);
`;

const Td = styled.td`
  padding-right: 5px;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  border: 3px solid var(--color-grey);
  border-radius: 30px;
  width: 40%;
  min-height: 100px;
  overflow: scroll;
  align-items: center;
`;

const DrinkBox = styled.div`
  display: flex;
  margin-left: 30px;
  margin-bottom: 30px;
`;

const Image = styled.img`
  width: 50%;
  border-radius: 30px;
  border: 3px solid var(--color-almond);
`;

export default Drink;

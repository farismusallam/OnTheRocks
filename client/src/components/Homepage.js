import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { RadialProgress } from "react-radial-progress-indicator";

const Homepage = ({ users }) => {
  const [status, setStatus] = useState("idle");
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    setStatus("loading");
    fetch("/api/cocktails/random")
      .then((res) => res.json())
      .then((data) => {
        setStatus("idle");
        setDrinks(data.drinks);
      });
  }, []);

  if (status === "loading") {
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
      <Div>
        <Span>Assortment of our cocktails:</Span>
        <Grid>
          {drinks.map((drink) => {
            return (
              <StyledLink to={`/${drink.idDrink}`} key={drink.idDrink}>
                <DrinkBox>
                  <Image alt={drink.strDrink} src={drink.strDrinkThumb} />
                  <TextBox>
                    <Span>{drink.strDrink}</Span>
                  </TextBox>
                </DrinkBox>
              </StyledLink>
            );
          })}
        </Grid>
        <Line></Line>
        <Span>Current users:</Span>
        <Grid>
          {users.map((singleuser) => {
            return (
              <StyledLink
                to={`/profile/${singleuser._id}`}
                key={singleuser._id}
              >
                <DrinkBox>
                  <Image alt={singleuser.nickname} src={singleuser.picture} />
                  <TextBox>
                    <Span>{singleuser.nickname}</Span>
                  </TextBox>
                </DrinkBox>
              </StyledLink>
            );
          })}
        </Grid>
      </Div>
    </Wrapper>
  );
};

const LoadingDiv = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const Line = styled.div`
  display: block;
  height: 1px;
  border: 0;
  border-top: 2px solid var(--color-grey);
  margin: 1em 0;
  padding: 0;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Grid = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(5, 1fr);
  margin-top: 30px;
`;

const TextBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid var(--color-almond);
  border-radius: 10px;
  text-align: center;
  padding: 5px 5px;
  font-size: 12px;
  background-color: var(--color-black);
  color: var(--color-almond);
`;

const Span = styled.span`
  text-decoration: underline;
`;

const Image = styled.img`
  width: 100px;
  border-radius: 50%;
  border: 3px solid var(--color-almond);
  margin-bottom: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
`;

const DrinkBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: var(--color-grey);
  margin-left: 20px;
  padding: 10px 5px;
  width: 120px;
  height: 170px;

  &:hover ${TextBox} {
    background-color: var(--color-almond);
    color: var(--color-black);
  }
  &:hover ${Image} {
    opacity: 50%;
  }
`;

export default Homepage;

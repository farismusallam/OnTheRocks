import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const Homepage = ({ users }) => {
  const { user, isAuthenticated } = useAuth0();
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
    return <div>LOADING</div>;
  }

  return (
    <Wrapper>
      <Div>
        <Span>Assortment of our cocktails:</Span>
        <Grid>
          {drinks.map((drink) => {
            return (
              <StyledLink to={`/${drink.idDrink}`}>
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
        <Span>Current users:</Span>
        <Grid>
          {users.map((singleuser) => {
            return (
              <DrinkBox>
                <Image alt={singleuser.nickname} src={singleuser.picture} />
                <TextBox>
                  <StyledLink to={`/profile/${singleuser._id}`}>
                    <Span>{singleuser.nickname}</Span>
                  </StyledLink>
                </TextBox>
              </DrinkBox>
            );
          })}
        </Grid>
      </Div>
    </Wrapper>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
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
`;

const Span = styled.span`
  text-decoration: none;
  color: var(--color-almond);
`;

const DrinkBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 100px;
  border-radius: 50%;
  border: 3px solid var(--color-grey);
  margin-bottom: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 100px;
`;

export default Homepage;

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
      <div>
        {drinks.map((drink) => {
          return (
            <DrinkBox>
              <Image alt={drink.strDrink} src={drink.strDrinkThumb} />
              <TextBox>
                <Link to={`/${drink.idDrink}`}>{drink.strDrink}</Link>
              </TextBox>
            </DrinkBox>
          );
        })}
      </div>
      <div>
        {users.map((singleuser) => {
          return (
            <DrinkBox>
              <Image alt={singleuser.nickname} src={singleuser.picture} />
              <TextBox>
                <Link to={`/profile/${singleuser._id}`}>
                  {singleuser.nickname}
                </Link>
              </TextBox>
            </DrinkBox>
          );
        })}
      </div>
    </Wrapper>
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Homepage;

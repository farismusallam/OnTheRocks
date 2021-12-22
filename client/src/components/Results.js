import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Results = ({ data }) => {
  if (data.length === 0 || data === undefined) {
    return <div>Results Not Found</div>;
  }

  return (
    <div>
      {data.map((drink) => {
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

export default Results;

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Results = ({ data }) => {
  if (data.length === 0 || data === undefined) {
    return <div>Results Not Found</div>;
  }

  return (
    <Wrapper>
      <Div>
        <Grid>
          {data.map((drink) => {
            return (
              <DrinkBox key={drink.idDrink}>
                <StyledLink to={`/${drink.idDrink}`}>
                  <Image alt={drink.strDrink} src={drink.strDrinkThumb} />
                  <TextBox>
                    <Span>{drink.strDrink}</Span>
                  </TextBox>
                </StyledLink>
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
  justify-content: center;
  width: 100%;
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

export default Results;

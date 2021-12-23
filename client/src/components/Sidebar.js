import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Wrapper>
      <Container>
        <StyledLink to="/search-user">Search Users</StyledLink>
      </Container>
      <Container>
        <StyledLink to="/search-name">Search Drinks By Name</StyledLink>
      </Container>
      <Container>
        <StyledLink to="/search-letter">Search Drinks By Letter</StyledLink>
      </Container>
      <Container>
        <StyledLink to="/search-category">Search Drinks By Category</StyledLink>
      </Container>
      <Container>
        <StyledLink to="/search-ingredients">
          Search Drinks By Ingredients
        </StyledLink>
      </Container>
    </Wrapper>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--color-almond);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 100vh;
  border-right: 1px solid lightgrey;
  padding-top: 30px;
  font-weight: bold;
  background-color: var(--color-brown);
`;

const Container = styled.div``;

export default Sidebar;

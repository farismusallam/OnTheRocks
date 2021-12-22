import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Wrapper>
      <Container>
        <Link to="/search-user">Search Users</Link>
      </Container>
      <Container>
        <Link to="/search-name">Search Drinks By Name</Link>
      </Container>
      <Container>
        <Link to="/search-letter">Search Drinks By Letter</Link>
      </Container>
      <Container>
        <Link to="/search-category">Search Drinks By Category</Link>
      </Container>
      <Container>
        <Link to="/search-ingredients">Search Drinks By Ingredients</Link>
      </Container>
    </Wrapper>
  );
};

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

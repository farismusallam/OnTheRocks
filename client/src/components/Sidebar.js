import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MdPersonSearch, MdSearch, MdTag, MdChecklist } from "react-icons/md";
import { TiSortAlphabetically } from "react-icons/ti";

const Sidebar = () => {
  return (
    <Wrapper>
      <Container>
        <MdPersonSearch style={{ color: "var(--color-almond" }} />
        <StyledLink to="/search-user">Search Users</StyledLink>
      </Container>
      <Span>Search Drinks:</Span>
      <Container>
        <MdSearch style={{ color: "var(--color-almond" }} />
        <StyledLink to="/search-name">By Name</StyledLink>
      </Container>
      <Container>
        <TiSortAlphabetically style={{ color: "var(--color-almond" }} />
        <StyledLink to="/search-letter">By First Letter</StyledLink>
      </Container>
      <Container>
        <MdTag style={{ color: "var(--color-almond" }} />
        <StyledLink to="/search-category">By Category</StyledLink>
      </Container>
      <Container>
        <MdChecklist style={{ color: "var(--color-almond" }} />
        <StyledLink to="/search-ingredients">By Ingredients</StyledLink>
      </Container>
    </Wrapper>
  );
};

const Span = styled.span`
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  text-decoration: underline;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--color-almond);
  margin-left: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  border-right: 3px solid var(--color-grey);
  font-weight: bold;
  background-color: var(--color-brown);
  height: auto;
  padding-top: 20px;
`;

const Container = styled.div`
  display: flex;
  margin-left: 20px;
  margin-bottom: 10px;
`;

export default Sidebar;

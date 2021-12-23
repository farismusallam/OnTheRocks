import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import Pagination from "./Pagination";
import Results from "./Results";

const SearchUserResults = () => {
  const [userResults, setUserResults] = useState(null);
  const [status, setStatus] = useState("idle");
  const { username } = useParams();

  useEffect(() => {
    setStatus("loading");
    fetch(`/api/users/find/nick/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus("idle");
        setUserResults(data.data);
      });
  }, []);

  if (userResults === null) {
    return <div>LOADING</div>;
  }

  if (userResults === "Not Found") {
    return <div>Results Not Found</div>;
  }

  return (
    <>
      <Wrapper>
        {status === "loading" ? (
          <LoadingDiv>LOADING...</LoadingDiv>
        ) : (
          <Div>
            <Span>Found user:</Span>
            <DrinkBox>
              <StyledLink to={`/profile/${userResults._id}`}>
                <Image alt={userResults.nickname} src={userResults.picture} />
                <TextBox>
                  <Span>{userResults.nickname}</Span>
                </TextBox>
              </StyledLink>
            </DrinkBox>
          </Div>
        )}
      </Wrapper>
    </>
  );
};

const LoadingDiv = styled.div`
  height: 100vh;
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
  justify-content: center;
  width: 100%;
  height: 100vh;
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
  margin-top: 20px;

  &:hover ${TextBox} {
    background-color: var(--color-almond);
    color: var(--color-black);
  }
  &:hover ${Image} {
    opacity: 50%;
  }
`;
export default SearchUserResults;

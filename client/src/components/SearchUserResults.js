import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { RadialProgress } from "react-radial-progress-indicator";

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

  if (userResults === "Not Found") {
    return (
      <Wrapper>
        <Div>Results Not Found</Div>
      </Wrapper>
    );
  }

  return (
    <>
      <Wrapper>
        {status === "loading" || userResults === null ? (
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

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
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

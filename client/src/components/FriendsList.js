import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const FriendsList = ({ collections }) => {
  return (
    <Wrapper>
      <Grid>
        {collections.map((friend) => {
          return (
            <StyledLink
              to={`/profile/${friend.friendId}`}
              key={friend.nickname}
            >
              <DrinkBox>
                <Image alt={friend.nickname} src={friend.picture} />
                <TextBox>
                  <Span>{friend.nickname}</Span>
                </TextBox>
              </DrinkBox>
            </StyledLink>
          );
        })}
      </Grid>
    </Wrapper>
  );
};

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
  flex-direction: column;
  width: 100%;
  background: var(--color-black);
`;

const Grid = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(5, 1fr);
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

export default FriendsList;

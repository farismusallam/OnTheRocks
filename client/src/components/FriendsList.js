import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const FriendsList = ({ collections }) => {
  console.log("collections", collections);
  return (
    <div>
      {collections.map((friend) => {
        return (
          <DrinkBox>
            <Image alt={friend.nickname} src={friend.picture} />
            <TextBox>
              <Link to={`/profile/${friend.friendId}`}>{friend.nickname}</Link>
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

export default FriendsList;

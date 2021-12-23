import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import Favorites from "./Favorites";
import FriendsList from "./FriendsList";
import CreatedDrinks from "./CreatedDrinks";
import { useParams } from "react-router-dom";
import { MdPersonAdd, MdPersonRemove } from "react-icons/md";
import { RadialProgress } from "react-radial-progress-indicator";

const Profile = ({ currentUser, status, setStatus }) => {
  const { id } = useParams();
  const [view, setView] = useState("favorites");
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [thisUser, setThisUser] = useState(null);
  let isFollowing;

  useEffect(() => {
    setStatus("loading");
    fetch(`/api/user/find/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus("idle");
        setThisUser(data.data);
        setView("favorites");
      });
  }, [id]);

  const handleFollow = () => {
    fetch("/api/user/friend/add", {
      method: "PATCH",
      body: JSON.stringify({
        _id: user.sub,
        friendId: id,
        picture: thisUser.picture,
        nickname: thisUser.nickname,
      }),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {});
    window.location.reload();
  };

  const handleRemove = () => {
    fetch("/api/user/friend/remove", {
      method: "PATCH",
      body: JSON.stringify({
        _id: user.sub,
        friendId: id,
        picture: thisUser.picture,
        nickname: thisUser.nickname,
      }),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {});
    window.location.reload();
  };

  const handleFavorites = () => {
    setView("favorites");
  };

  const handleCreated = () => {
    setView("created");
  };

  const handleFriends = () => {
    setView("friends");
  };

  if (isLoading || status === "loading" || thisUser === null) {
    return (
      <LoadingWrap>
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
      </LoadingWrap>
    );
  }

  if (currentUser === null && isAuthenticated === true) {
    return (
      <LoadingWrap>
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
      </LoadingWrap>
    );
  }

  if (isAuthenticated) {
    isFollowing = currentUser.friends.some(
      (friend) => friend["friendId"] === id
    );
  }

  return (
    <>
      <Wrapper>
        <TextWrap>
          <Img src={thisUser.picture} alt={thisUser.name} />
          <Details>
            <H2>{thisUser.name}</H2>
            <span>{thisUser.nickname}</span>
          </Details>
        </TextWrap>
        {isAuthenticated && (
          <>
            <div>
              {currentUser._id !== id && isFollowing === false ? (
                <FollowButton onClick={handleFollow}>
                  <FollowDiv>
                    <MdPersonAdd style={{ fontSize: "20px" }} />
                    <Span>Follow</Span>
                  </FollowDiv>
                </FollowButton>
              ) : null}
              {currentUser._id !== id && isFollowing === true ? (
                <FollowButton onClick={handleRemove}>
                  <FollowDiv>
                    <MdPersonRemove style={{ fontSize: "20px" }} />
                    <Span>Unfollow</Span>
                  </FollowDiv>
                </FollowButton>
              ) : null}
            </div>
            <Div>
              <Button onClick={handleFavorites}>Favorites</Button>
              <Button onClick={handleCreated}>Created Drinks</Button>
              <Button onClick={handleFriends}>Following</Button>
            </Div>
            <Div>
              {view === "favorites" ? (
                <Favorites collections={thisUser.favorites} />
              ) : null}
              {view === "created" ? (
                <CreatedDrinks
                  collections={thisUser.created}
                  currentUser={currentUser}
                  id={id}
                />
              ) : null}
              {view === "friends" ? (
                <FriendsList collections={thisUser.friends} />
              ) : null}
            </Div>
          </>
        )}
      </Wrapper>
    </>
  );
};

const Span = styled.span`
  margin-left: 5px;
  font-size: 15px;
`;

const FollowDiv = styled.div`
  display: flex;
  align-items: center;
`;

const FollowButton = styled.button`
  font-weight: bold;
  border: 2px solid var(--color-red);
  background: var(--color-black);
  color: var(--color-red);
  border-radius: 30px;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background: var(--color-red);
    color: var(--color-black);
  }
`;

const LoadingDiv = styled.div`
  height: 100vh;
`;

const Button = styled.button`
  width: 30%;
  margin: 20px;
  height: 50%;
  border: 3px solid var(--color-almond);
  background: none;
  color: var(--color-almond);
  padding: 10px;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const H2 = styled.h2`
  margin-bottom: 0;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const TextWrap = styled.div`
  border: 3px solid var(--color-grey);
  width: 40%;
  border-radius: 30px;
  padding: 10px;
  display: flex;
  margin-bottom: 20px;
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Img = styled.img`
  width: 100px;
  border-radius: 50%;
  border: 3px solid var(--color-almond);
  margin-bottom: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 20px;
  height: 1000px;
  background: var(--color-black);
`;

const LoadingWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export default Profile;

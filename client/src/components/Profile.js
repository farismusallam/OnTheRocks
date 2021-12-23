import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import Favorites from "./Favorites";
import FriendsList from "./FriendsList";
import CreatedDrinks from "./CreatedDrinks";
import { useParams } from "react-router-dom";
import { MdPersonAdd, MdPersonRemove } from "react-icons/md";

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
    return <div>Loading ...</div>;
  }

  if (currentUser === null && isAuthenticated === true) {
    return <div>Loading ...</div>;
  }

  if (isAuthenticated) {
    isFollowing = currentUser.friends.some(
      (friend) => friend["friendId"] === id
    );
  }

  return (
    <>
      <Wrapper>
        <div>
          <img src={thisUser.picture} alt={thisUser.name} />
          <h2>{thisUser.name}</h2>
          <p>{thisUser.email}</p>
        </div>
        {isAuthenticated && (
          <>
            <div>
              {currentUser._id !== id && isFollowing === false ? (
                <button onClick={handleFollow}>
                  <MdPersonAdd style={{ color: "var(--color-almond)" }} />
                  Follow
                </button>
              ) : null}
              {currentUser._id !== id && isFollowing === true ? (
                <button onClick={handleRemove}>
                  <MdPersonRemove style={{ color: "var(--color-almond)" }} />
                  Unfollow
                </button>
              ) : null}
            </div>
            <div>
              <button onClick={handleFavorites}>Favorites</button>
              <button onClick={handleCreated}>Created Drinks</button>
              <button onClick={handleFriends}>Following</button>
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
            </div>
          </>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Profile;

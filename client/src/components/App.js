import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import { useAuth0 } from "@auth0/auth0-react";
import ScrollToTop from "./ScrollToTop";

import Homepage from "./Homepage";
import Header from "./Header";
import Sidebar from "./Sidebar";
import SearchByLetter from "./SearchByLetter";
import SearchByCategory from "./SearchByCategory";
import SearchByName from "./SearchByName";
import SearchResults from "./SearchResults";
import Profile from "./Profile";
import Drink from "./Drink";
import SearchUser from "./SearchUser";
import SearchUserResults from "./SearchUserResults";
import SearchByIngredients from "./SearchByIngredients";

const App = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("idle");
  const [hasUser, setHasUser] = useState(false);
  const [users, setUsers] = useState([]);

  console.log("user", user);

  useEffect(() => {
    if (user) {
      setStatus("loading");
      fetch(`/api/user/find/${user.sub}`)
        .then((res) => res.json())
        .then((data) => {
          setStatus("idle");
          setCurrentUser(data.data);
        });
    }
  }, [hasUser]);

  useEffect(() => {
    setStatus("loading");
    fetch("/api/users/find")
      .then((res) => res.json())
      .then((data) => {
        setStatus("idle");
        setUsers(data.users);
      });
  }, [hasUser]);

  const addUser = () => {
    fetch("/api/user/add", {
      method: "POST",
      body: JSON.stringify({
        _id: user.sub,
        nickname: user.nickname,
        rated: [],
        friends: [],
        favorites: [],
        created: [],
        name: user.name,
        email: user.email,
        picture: user.picture,
      }),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setHasUser(true);
      });
  };

  if (user) {
    addUser();
  }

  return (
    <>
      <GlobalStyles />

      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Wrapper>
          <Sidebar />
          <Switch>
            <Route exact path="/">
              <Homepage users={users} />
            </Route>
            <Route path="/search-user">
              <SearchUser />
            </Route>
            <Route path="/user/find/:username">
              <SearchUserResults />
            </Route>
            <Route path="/search-name">
              <SearchByName />
            </Route>
            <Route path="/search/:text">
              <SearchResults />
            </Route>
            <Route path="/search-letter">
              <SearchByLetter />
            </Route>
            <Route path="/search-category">
              <SearchByCategory />
            </Route>
            <Route path="/search-ingredients">
              <SearchByIngredients />
            </Route>
            <Route path="/profile/:id">
              <Profile
                currentUser={currentUser}
                status={status}
                setStatus={setStatus}
              />
            </Route>
            <Route path="/:id">
              <Drink currentUser={currentUser} />
            </Route>
          </Switch>
        </Wrapper>
      </BrowserRouter>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  background-color: var(--color-black);
  height: 100%;
`;

export default App;

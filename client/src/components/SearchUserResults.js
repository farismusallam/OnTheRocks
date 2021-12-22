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
      {status === "loading" ? (
        <div>LOADING</div>
      ) : (
        <div>
          <DrinkBox>
            <Image alt={userResults.nickname} src={userResults.picture} />
            <TextBox>
              <Link to={`/profile/${userResults._id}`}>
                {userResults.nickname}
              </Link>
            </TextBox>
          </DrinkBox>
        </div>
      )}
    </>
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

export default SearchUserResults;

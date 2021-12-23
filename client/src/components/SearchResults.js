import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { RadialProgress } from "react-radial-progress-indicator";

import Pagination from "./Pagination";
import Results from "./Results";

const SearchResults = () => {
  const [drinks, setDrinks] = useState(null);
  const [status, setStatus] = useState("idle");
  const { text } = useParams();

  useEffect(() => {
    setStatus("loading");
    fetch(`/api/search/name/${text}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus("idle");
        setDrinks(data.drinks);
      });
  }, []);

  return (
    <>
      <Wrapper>
        {status === "loading" ? (
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
          <div>
            {drinks !== null && (
              <Pagination
                data={drinks}
                RenderComponent={Results}
                dataLimit={10}
              />
            )}
            {drinks === null && <Div>Results Not Found</Div>}
          </div>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const LoadingDiv = styled.div`
  height: 100vh;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export default SearchResults;

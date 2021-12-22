import React, { useState } from "react";
import styled from "styled-components";

const Pagination = ({ data, RenderComponent, dataLimit }) => {
  const [currentPage, setCurrentPage] = useState(1);

  //nuber of pages (25 items per page) based on length of array//
  const pages = Math.round(data.length / dataLimit);

  //function to go to next page//
  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  //function to go to previous page//
  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  //function to slice data (25 per page)//
  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    const newItems = data.slice(startIndex, endIndex);
    return newItems;
  };

  return (
    <div>
      <ButtonWrapper>
        {/* previous button */}
        <Button
          onClick={goToPreviousPage}
          disabled={currentPage === 1 ? true : false}
        >
          Previous Page
        </Button>
        {/* page number */}
        <Container>
          <span>{`${currentPage}`}</span>
        </Container>
        {/* next Button */}
        <Button
          onClick={goToNextPage}
          disabled={currentPage === pages || pages === 0 ? true : false}
        >
          Next Page
        </Button>
      </ButtonWrapper>
      {/* show the items, 25 items at a time */}
      <GridWrapper>{<RenderComponent data={getPaginatedData()} />}</GridWrapper>
    </div>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  border: 3px solid #383838;
  color: #383838;
  font-size: 18px;
  font-family: "roboto", sans-serif;
  font-weight: bold;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px;
`;

const GridWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  padding: 10px 10px;
  background: #383838;
  border: none;
  color: white;
  font-size: 15px;
  cursor: pointer;
  width: 225px;

  &:disabled {
    opacity: 0.5;
    background-color: grey;
    cursor: default;
  }
`;

export default Pagination;

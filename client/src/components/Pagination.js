import React, { useState } from "react";
import styled from "styled-components";

const Pagination = ({ data, RenderComponent, dataLimit }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const pages = Math.round(data.length / dataLimit);

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    const newItems = data.slice(startIndex, endIndex);
    return newItems;
  };

  return (
    <Wrapper>
      <ButtonWrapper>
        <Button
          onClick={goToPreviousPage}
          disabled={currentPage === 1 ? true : false}
        >
          Previous Page
        </Button>

        <Container>
          <span>{`${currentPage}`}</span>
        </Container>

        <Button
          onClick={goToNextPage}
          disabled={currentPage === pages || pages === 0 ? true : false}
        >
          Next Page
        </Button>
      </ButtonWrapper>

      <GridWrapper>{<RenderComponent data={getPaginatedData()} />}</GridWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  border: 3px solid var(--color-almond);
  color: var(--color-almond);
  font-size: 18px;
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
  padding: 0px 10px;
  background: var(--color-black);
  border: 3px solid var(--color-almond);
  color: var(--color-almond);
  font-size: 15px;
  cursor: pointer;
  width: 225px;
  margin-left: 30px;
  margin-right: 30px;

  &:disabled {
    opacity: 0.5;
    background-color: grey;
    cursor: default;
    border: none;
  }

  &:hover {
    background: var(--color-almond);
    color: var(--color-black);
  }
`;

export default Pagination;

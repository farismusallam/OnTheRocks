import React, { useState } from "react";
import styled from "styled-components";

import Pagination from "./Pagination";
import Results from "./Results";

const Favorites = ({ collections }) => {
  console.log("collections", collections);

  return (
    <div>
      <div>
        <Pagination
          data={collections}
          RenderComponent={Results}
          dataLimit={25}
        />
      </div>
    </div>
  );
};

export default Favorites;

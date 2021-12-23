import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
:root {
    --color-red: #B56576;
    --color-black: #3b3a41;
    --color-almond: #F5E0B7;
    --color-grey: #8B807B;
   
  }
body {
    margin: 0px 100px;
    padding: 0;
    color: var(--color-almond);
    font-family: 'Open Sans', sans-serif;
  }
`;

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Passions Conflict', cursive;
  }

  h3 {
    font-size: 5rem;
  }

  p {
    font-size: 3rem;
  }
`;

export default GlobalStyle;

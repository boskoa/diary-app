import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Passions Conflict', cursive;
  }

  h3 {
    font-size: 4em;
  }

  p {
    font-size: 2.5em;
  }

  #theme {
    background-color: inherit;
    border-radius: 50%;
    height: 2em;
    width: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;

export default GlobalStyle;

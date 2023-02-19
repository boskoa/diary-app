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

  #user {
    background-color: inherit;
    border-radius: 50%;
    height: 2em;
    width: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: relative;
  }

  img {
    height: 100%;
    width: 100%;
  }

  .dropdown {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 3.8em;
    min-width: 80px;
    margin-right: 2em;
    overflow: hidden;
    font-size: 0.7em;
    background-color: inherit;
    padding: 0 5px;
    transition: max-height 0.2s, box-shadow 0.3s;
  }

  .dropdown-active {
    max-height: 100px;
    padding-bottom: 5px;
    box-shadow: 0 5px 5px -1px rgba(0, 0, 0, 0.5)
  }

  .dropdown-inactive {
    max-height: 0px;
  }
`;

export default GlobalStyle;

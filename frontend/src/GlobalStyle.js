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
    box-shadow: 1px 1px 5px -1px rgba(0, 0, 0, 0.5);
    height: 2em;
    width: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: box-shadow 0.2s;
  }

  #theme:active {
    box-shadow: none;
  }

  #user {
    background-color: inherit;
    box-shadow: 1px 1px 5px -1px rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    height: 2em;
    width: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: relative;
    transition: box-shadow 0.2s;
  }

  #user:active {
    box-shadow: none;
  }

  img {
    border-radius: 50%;
    height: 100%;
    width: 100%;
    object-fit: cover;
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
    z-index: 0;
    transition: max-height 0.2s, box-shadow 0.3s;
  }

  .dropdown-active {
    max-height: 100px;
    padding-bottom: 5px;
    box-shadow: 0 5px 5px -1px rgba(0, 0, 0, 0.5);
  }

  .dropdown-inactive {
    max-height: 0px;
  }

  .modal {
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 10px;
    width: 200px;
    margin: 20vh calc(50% - 100px) 0 calc(50% - 100px);
    border: 1px solid rgba(250, 250, 250, 0.1);
    box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    font-size: 1.5em;
    position: relative;
    z-index: 2001;
    animation: modal-enter 1s;
  }

  @keyframes modal-enter {
    from { margin-top: -300px; }
    to { margin-top: 20vh; }
  }

  .modal input {
    background-color: rgba(250, 250, 250, 0.3);
    border: 0.5px solid rgba(250, 250, 250, 0.1);
    border-radius: 3px;
    font-size: 1em;
  }

  #backdrop {
    height: 100vh;
    width: 100vw;
    z-index: 2000;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    pointer: none;
  }

  .modal-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .modal-buttons button {
    background: inherit;
    background-color: rgba(0, 0, 0, 0.3);
    color: inherit;
    border: 0.5px solid rgba(250, 250, 250, 0.3);
    border-radius: 5px;
    cursor: pointer;
    padding: 5px;
    font-size: 1em;
    transition: background-color 0.2s
  }

  .modal-buttons button:active {
    background-color: rgba(0, 0, 0, 0.6);
  }

  .error {
    font-size: 1em;
    color: inherit;
    animation: blink 1s infinite alternate;
  }

  @keyframes blink {
    from {
      color: inherit;
    }
    to {
      color: orange;
    }
  }

  #settings-main {
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 10px;
    margin: 5px;
    flex-wrap: wrap;
  }

  #settings {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 5px;
    max-width: 80vw;
  }

  #settings label, input {
    font-size: 2em;
  }

  #avatar-box {
    font-size: 1em;
    max-width: 80vw;
    margin: 5px;
  }

  .loader {
    border: 10px solid brown;
    border-top: 10px solid yellow;
    border-radius: 50%;
    margin: 30px calc(50% - 25px);
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.5);
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  #statistics {
    display: flex;
    flex-direction: column;
  }
`;

export default GlobalStyle;

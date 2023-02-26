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

  .buttons {
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

  .buttons:active {
    box-shadow: none;
  }

  #user {
    position: relative;
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
    background-color: rgba(255, 255, 255, 0.2);
    color: inherit;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    padding: 5px;
    font-size: 1em;
    transition: background-color 0.2s, box-shadow 0.2s;
  }

  .modal-buttons button:active {
    background-color: rgba(255, 255, 255, 0.4);
    box-shadow: none;
  }

  .error {
    font-size: 1em;
    color: inherit;
    animation: blink 1s infinite alternate;
    padding: 10px;
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
    flex-wrap: wrap;
  }

  #settings {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 5px;
    max-width: 80vw;
  }

  .settings-button {
    background: inherit;
    background-color: rgba(255, 255, 255, 0.2);
    color: inherit;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    padding: 5px;
    font-size: 1.5em;
    transition: background-color 0.2s;
    margin-top: 10px;
  }

  .settings-button:active {
    background-color: rgba(255, 255, 255, 0.4);
    box-shadow: none;
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
    box-shadow: 0px -3px 5px 0px rgba(0, 0, 0, 0.5), inset 0px 3px 5px 0px rgba(0, 0, 0, 0.5);
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .subcontainer {
    display: flex;
    flex-direction: column;
  }

  #app-name {
    position: relative;
    text-decoration: none;
    color: inherit;
    text-shadow: 0px 3px 3px rgba(0, 0, 0, 0.5);
    top: 0;
    transition: text-shadow 0.5s, top 0.5s;
    animation: 1s ease-out 3s intro;
  }

  #app-name:active {
    text-shadow: none;
    top: 1px;
  }

  @keyframes intro {
    0% {
      transform: rotateX(0deg);
    }
    100% {
      transform: rotateX(360deg);
    }
  }

  table {
    font-size: 1.7em;
  }

  #edit-button {
    position: absolute;
    bottom: 5px;
    right: 5px;
  }

  .entry-modal {
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 10px;
    width: 200px;
    margin: 10vh calc(50% - 100px) 0 calc(50% - 100px);
    border: 1px solid rgba(250, 250, 250, 0.1);
    box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    font-size: 1.5em;
    position: fixed;
    z-index: 2001;
    animation: entry-modal-enter 1s;
  }

  .entry-modal input, textarea {
    background-color: rgba(250, 250, 250, 0.3);
    border: 0.5px solid rgba(250, 250, 250, 0.1);
    border-radius: 3px;
    white-space: pre-line;
  }

  .entry-modal > input {
    font-size: 1.3em;
  }

  .entry-modal > textarea {
    font-size: 1.2em;
  }

  @keyframes entry-modal-enter {
    from { margin-top: -400px; }
    to { margin-top: 10vh; }
  }

  #filter input, select {
    background-color: rgba(255, 255, 255, 0.2);
    color: inherit;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.5);
    font-size: 1.5rem;
    height: 100%;
  }

  #filter input[type=number] { 
    -moz-appearance: textfield;
    appearance: textfield;
    margin: 0; 
}

  .filter-button {
    font-size: 1.5rem;
    background-color: rgba(30, 30, 0, 0.2);
    color: inherit;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    padding: 5px;
    transition: background-color 0.2s, box-shadow 0.2s;
  }

  .filter-button:active {
    background-color: rgba(30, 30, 0, 0.4);
    box-shadow: none;
  }

  #navbar-relative {
    top: -4em;
  }

  .dropdown-links {
    text-decoration: none;
    color: inherit;
  }

  .dropdown-links:hover {
    opacity: 0.8;
  }

  .dropdown-links:active {
    opacity: 0.5;
  }
`;

export default GlobalStyle;

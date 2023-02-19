import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./app/store";
import { getAllUsers } from "./features/users/usersSlice";
import { BrowserRouter as Router } from "react-router-dom";
import { loginUser } from "./features/login/loginSlice";

store.dispatch(getAllUsers());
//store.dispatch(loginUser({ username: "kocko", password: "lozinka" }));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

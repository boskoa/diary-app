import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginUser,
  selectLoggedUser,
  selectLoginError,
} from "../features/login/loginSlice";

function useLogin() {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const loginErrorSelector = useSelector(selectLoginError);
  const loggedUser = useSelector(selectLoggedUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedUser) {
      console.log("LOGGEDUSER", loggedUser);
      setUsername("");
      setPassword("");
      setUsernameError("");
      setPasswordError("");
      navigate("/");
    }
  }, [loggedUser, navigate]);

  useEffect(() => {
    let index;
    if (loginErrorSelector) {
      setLoginError("Wrong credentials");
      index = setTimeout(() => setLoginError(""), 4000);
    }

    return () => clearTimeout(index);
  }, [loginErrorSelector]);

  function submit() {
    if (username.length < 2 || username.length > 20) {
      return setUsernameError(
        "Username must be between 2 and 20 characters long"
      );
    } else {
      setUsernameError("");
    }

    if (password.length < 5 || password.length > 30) {
      return setPasswordError(
        "Password must be between 5 and 30 characters long"
      );
    } else {
      setPasswordError("");
    }

    dispatch(loginUser({ username, password }));
  }

  return {
    username,
    setUsername,
    password,
    setPassword,
    loginError,
    usernameError,
    setUsernameError,
    passwordError,
    setPasswordError,
    submit,
  };
}

export default useLogin;

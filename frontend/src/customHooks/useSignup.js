import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createNewUser,
  selectUserCreated,
  selectUsersError,
} from "../features/users/usersSlice";

function useSignup() {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signupError, setSignupError] = useState("");
  const signupErrorSelector = useSelector(selectUsersError);
  const userCreated = useSelector(selectUserCreated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let index;
    if (signupErrorSelector) {
      setSignupError("Error: user not created, try to change data");
      index = setTimeout(() => setSignupError(""), 4000);
    }

    return () => clearTimeout(index);
  }, [signupErrorSelector]);

  useEffect(() => {
    if (userCreated) {
      navigate("/login");
      setSignupError("");
    }
  }, [userCreated, navigate]);

  function submit() {
    if (username.length < 2 || username.length > 20) {
      return setUsernameError(
        "Username must be between 2 and 20 characters long"
      );
    } else {
      setUsernameError("");
    }

    if (name.length < 1 || name.length > 20) {
      return setNameError("Name must be between 1 and 20 characters long");
    } else {
      setNameError("");
    }

    if (password.length < 5 || password.length > 30) {
      return setPasswordError(
        "Password must be between 5 and 30 characters long"
      );
    } else {
      setPasswordError("");
    }

    dispatch(createNewUser({ name, username, password }));
  }

  return {
    username,
    setUsername,
    name,
    setName,
    password,
    setPassword,
    signupError,
    usernameError,
    setUsernameError,
    nameError,
    setNameError,
    passwordError,
    setPasswordError,
    submit,
  };
}

export default useSignup;

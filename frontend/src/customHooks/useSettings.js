import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { emptyEntries } from "../features/entries/entriesSlice";
import { logout, selectLoggedUser } from "../features/login/loginSlice";
import {
  selectUserById,
  selectUsersError,
  updateUser,
} from "../features/users/usersSlice";

function useSettings() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const loggedUser = useSelector(selectLoggedUser);
  const currentUser = useSelector((state) =>
    selectUserById(state, loggedUser.id)
  );
  const updateError = useSelector(selectUsersError);
  const [updateErrorMessage, setUpdateErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setUsername(currentUser.username);
    }
  }, [currentUser]);

  useEffect(() => {
    let index;
    if (updateError) {
      setUpdateErrorMessage("Update error");
      index = setTimeout(() => setUpdateErrorMessage(""), 4000);
    }

    return () => clearTimeout(index);
  }, [updateError]);

  function handleLogout() {
    window.localStorage.removeItem("loggedDiaryUser");
    dispatch(logout());
    navigate("/");
  }

  function submit() {
    if (username.length < 2 || username.length > 20) {
      return setUsernameError(
        "Username must be between 2 and 20 characters long"
      );
    } else {
      setUsernameError("");
    }

    if (name.length < 2 || name.length > 20) {
      return setNameError("Name must be between 2 and 20 characters long");
    } else {
      setNameError("");
    }

    if (newPassword && (newPassword.length < 5 || newPassword.length > 30)) {
      return setPasswordError(
        "Password must be between 5 and 30 characters long"
      );
    } else {
      setPasswordError("");
    }

    if (newPassword.length > 4 && !currentPassword) {
      return setPasswordError(
        "Current password must be entered in order to set a new one"
      );
    } else {
      setPasswordError("");
    }

    let newUserData = {};

    if (name) newUserData.name = name;
    if (username) newUserData.username = username;
    if (currentPassword) newUserData.password = currentPassword;
    if (newPassword) newUserData.newPassword = newPassword;

    if (newUserData.newPassword) {
      dispatch(
        updateUser({ token: loggedUser.token, newUserData, id: loggedUser.id })
      );
      handleLogout();
      dispatch(emptyEntries());
    } else {
      dispatch(
        updateUser({ token: loggedUser.token, newUserData, id: loggedUser.id })
      );
    }
  }

  return {
    name,
    setName,
    username,
    setUsername,
    newPassword,
    setNewPassword,
    currentPassword,
    setCurrentPassword,
    updateErrorMessage,
    nameError,
    usernameError,
    passwordError,
    submit,
    loggedUser,
  };
}

export default useSettings;

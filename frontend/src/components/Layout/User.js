import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  loginUser,
  logout,
  selectLoggedUser,
} from "../../features/login/loginSlice";
import UserDropdownMenu from "./UserDropdownMenu";

function User() {
  const [dropdown, setDropdown] = useState(false);
  const login = useSelector(selectLoggedUser);
  const dispatch = useDispatch();

  function handleLogout() {
    window.localStorage.removeItem("loggedDiaryUser");
    dispatch(logout());
  }

  const loggedItems = [
    <Link
      key={3}
      style={{ textDecoration: "none", color: "inherit" }}
      to="settings"
    >
      <p>Settings</p>
    </Link>,
    <Link
      key={4}
      style={{ textDecoration: "none", color: "inherit" }}
      to="Statistics"
    >
      <p>Statistics</p>
    </Link>,
    <p onClick={handleLogout} key={5}>
      Log out
    </p>,
  ];

  const logItems = [
    <p
      onClick={
        () => dispatch(loginUser({ username: "kocko", password: "lozinka" })) //prilagoditi kad se završi login modal
      }
      key={1}
    >
      Log in
    </p>,
    <p key={2}>Sign up</p>,
  ];

  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickaway(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickaway);

    return () => document.removeEventListener("mousedown", handleClickaway);
  }, [wrapperRef, setDropdown]);

  return (
    <div
      ref={wrapperRef}
      id="user"
      onClick={() => setDropdown((prev) => (prev === false ? true : false))}
    >
      <img alt="default avatar" src="/public/data/defaults/user_avatar" />
      <UserDropdownMenu
        dropdown={dropdown}
        setDropdown={setDropdown}
        items={login ? loggedItems : logItems}
      />
    </div>
  );
}

export default User;

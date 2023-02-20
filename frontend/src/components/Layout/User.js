import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout, selectLoggedUser } from "../../features/login/loginSlice";
import UserDropdownMenu from "./UserDropdownMenu";

function User() {
  const [dropdown, setDropdown] = useState(false);
  const backdrop = useLocation();
  const login = useSelector(selectLoggedUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    window.localStorage.removeItem("loggedDiaryUser");
    dispatch(logout());
    navigate("/");
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
      to="statistics"
    >
      <p>Statistics</p>
    </Link>,
    <p onClick={handleLogout} key={5}>
      Logout
    </p>,
  ];

  const logItems = [
    <Link
      key={1}
      style={{ textDecoration: "none", color: "inherit" }}
      to="login"
    >
      <p>Login</p>
    </Link>,
    <p key={2}>Signup</p>,
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
    <div ref={wrapperRef} id="user">
      <img
        height={100}
        alt="default avatar"
        src={login?.id} // `/public/data/uploads/${login?.id}`
        onError={(e) => {
          e.currentTarget.src = "/user_avatar"; // /public/data/defaults/user_avatar
        }}
        onClick={() => setDropdown((prev) => (prev === false ? true : false))}
      />
      <UserDropdownMenu
        dropdown={dropdown}
        setDropdown={setDropdown}
        items={login ? loggedItems : logItems}
      />
      {backdrop.pathname === "/login" && <div id="backdrop" />}
    </div>
  );
}

export default User;

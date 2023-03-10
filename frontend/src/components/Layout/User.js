import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { emptyEntries } from "../../features/entries/entriesSlice";
import { logout, selectLoggedUser } from "../../features/login/loginSlice";
import UserDropdownMenu from "./UserDropdownMenu";

function User() {
  const [dropdown, setDropdown] = useState(false);
  const backdrop = useLocation();
  const login = useSelector(selectLoggedUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    setDropdown(false);
    window.localStorage.removeItem("loggedDiaryUser");
    dispatch(logout());
    dispatch(emptyEntries());
    navigate("/");
  }

  const loggedItems = [
    <Link
      key={3}
      className="dropdown-links"
      to="settings"
      onClick={() => setDropdown(false)}
    >
      <p>Settings</p>
    </Link>,
    <Link
      key={4}
      className="dropdown-links"
      to="statistics"
      onClick={() => setDropdown(false)}
    >
      <p>Statistics</p>
    </Link>,
    <p className="dropdown-links" onClick={handleLogout} key={5}>
      Logout
    </p>,
  ];

  const logItems = [
    <Link key={1} className="dropdown-links" to="login">
      <p>Login</p>
    </Link>,
    <Link key={2} className="dropdown-links" to="signup">
      <p>Signup</p>
    </Link>,
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
    <div ref={wrapperRef} className="buttons" id="user">
      <img
        height={100}
        alt="user avatar"
        src={
          login
            ? `/public/data/uploads/${login?.id}` // in development: login?.id
            : "/public/data/defaults/user_avatar" // in development: "/user_avatar"
        }
        onError={(e) => {
          e.currentTarget.src = "/public/data/defaults/user_avatar"; // in development: "/user_avatar"
        }}
        onClick={() => setDropdown((prev) => (prev === false ? true : false))}
      />
      <UserDropdownMenu
        dropdown={dropdown}
        setDropdown={setDropdown}
        items={login ? loggedItems : logItems}
      />
      {["/login", "/signup"].includes(backdrop.pathname) && (
        <div id="backdrop" />
      )}
    </div>
  );
}

export default User;

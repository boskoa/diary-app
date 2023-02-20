import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedUser } from "../../features/login/loginSlice";
import { getAllEntries } from "../../features/entries/entriesSlice";
import styled from "styled-components";
import AppName from "./AppName";
import Nav from "./Nav";
import ThemeButton from "./ThemeButton";
import User from "./User";

const StyledLayout = styled.div`
  background-color: ${({ theme }) => theme.base};
  min-height: 100vh;
  min-width: 300px;
`;

function Layout({ handleTheme }) {
  const loggedUser = useSelector(selectLoggedUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedUser?.token) {
      dispatch(getAllEntries(loggedUser.token));
    }
  }, [loggedUser, dispatch]);

  return (
    <StyledLayout>
      <Nav>
        <ThemeButton handleTheme={handleTheme} />
        <AppName />
        <User />
      </Nav>
      <Outlet />
    </StyledLayout>
  );
}

export default Layout;

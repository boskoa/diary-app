import { Outlet } from "react-router-dom";
import styled from "styled-components";
import AppName from "./AppName";
import Nav from "./Nav";
import ThemeButton from "./ThemeButton";
import User from "./User";

const StyledLayout = styled.div`
  background-color: ${({ theme }) => theme.base};
  min-height: 100vh;
`;

function Layout({ handleTheme }) {
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

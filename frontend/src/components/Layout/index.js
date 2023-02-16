import styled from "styled-components";
import AppName from "./AppName";
import ThemeButton from "./ThemeButton";

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  padding: 0.3em 1em;
  font-weight: 600;
  min-width: 300px;
`;

function Layout({ handleTheme }) {
  return (
    <StyledNav>
      <ThemeButton handleTheme={handleTheme} />
      <AppName />
      <p>login</p>
    </StyledNav>
  );
}

export default Layout;

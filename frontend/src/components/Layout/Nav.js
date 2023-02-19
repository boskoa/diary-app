import styled from "styled-components";

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  padding: 0.3em 1em;
  font-weight: 600;
  min-width: 300px;
  position: relative;
  z-index: 100;
  box-shadow: 0 1px 10px 1px rgba(0, 0, 0, 0.5);
`;

function Nav({ children }) {
  return <StyledNav>{children}</StyledNav>;
}

export default Nav;

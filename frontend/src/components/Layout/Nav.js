import { useEffect, useRef } from "react";
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
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 10px 1px rgba(0, 0, 0, 0.5);
  transition: top 0.5s;
`;

function Nav({ children }) {
  const nav = useRef(null);

  useEffect(() => {
    let lastPosition = 0;

    function handleChange() {
      let newPosition = window.scrollY;
      if (newPosition >= lastPosition) {
        nav.current.id = "navbar-relative";
      } else {
        nav.current.id = "";
      }

      lastPosition = newPosition <= 0 ? 0 : newPosition;
    }

    document.addEventListener("scroll", handleChange);

    return () => document.removeEventListener("scroll", handleChange);
  }, []);

  return <StyledNav ref={nav}>{children}</StyledNav>;
}

export default Nav;

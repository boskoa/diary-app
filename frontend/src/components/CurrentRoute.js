import styled, { keyframes } from "styled-components";

const fillAnimation = keyframes`
  from {
      background-position: top left;
    }
  to {
    background-position: bottom left;
  }
`;

const RouteName = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin: 5px;
  font-size: 0.7em;
`;

const StyledParagraph = styled.p`
  font-weight: 600;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  font-size: 3em;
  background-image: ${({ theme }) =>
    `linear-gradient(to bottom, rgba(255, 255, 255, 0.5), 50%, ${theme.text} 50%)`};
  background-size: 100% 300%;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  animation: 4s ${fillAnimation} linear forwards;
`;

function CurrentRoute({ route }) {
  return (
    <RouteName>
      <StyledParagraph>{route}</StyledParagraph>
    </RouteName>
  );
}

export default CurrentRoute;

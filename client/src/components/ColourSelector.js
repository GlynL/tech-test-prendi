import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  flex-basis: 33%;

  @media (max-width: 768px) {
    order: 2;
  }
`;

const StyledButton = styled.button`
  width: 5rem;
  font-size: 1rem;
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 3px;
  border: 1px solid ${props => props.colour};
  background: ${props => (props.disabled ? props.colour : "none")};
  color: ${props => (props.disabled ? "white" : props.colour)};
  transition: all 0.3s;

  :hover:not([disabled]) {
    cursor: pointer;
    box-shadow: inset 0 -3.25em 0 0 ${props => props.colour};
    color: white;
  }
`;

const ColourSelector = ({ colour, setColour }) => {
  function handleClick({ target }) {
    const newColour = target.dataset.color;
    setColour(newColour);
  }

  return (
    <StyledDiv>
      <StyledButton
        onClick={handleClick}
        data-color="hsl(192, 100%, 50%)"
        disabled={colour === "hsl(192, 100%, 50%)"}
        colour="hsl(192, 100%, 50%)"
      >
        Iceberg
      </StyledButton>
      <StyledButton
        onClick={handleClick}
        data-color="hsl(341, 100%, 50%)"
        disabled={colour === "hsl(341, 100%, 50%)"}
        colour="hsl(341, 100%, 50%)"
      >
        Lipstick
      </StyledButton>

      <StyledButton
        onClick={handleClick}
        data-color="hsl(128, 98%, 50%)"
        disabled={colour === "hsl(128, 98%, 50%)"}
        colour="hsl(128, 98%, 50%)"
      >
        Spring
      </StyledButton>
    </StyledDiv>
  );
};

export default ColourSelector;

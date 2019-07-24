import React from "react";
import styled from "styled-components";
import StyledButton from "./StyledButton";

const StyledDiv = styled.div`
  flex-basis: 33%;

  @media (max-width: 768px) {
    order: 2;
  }
`;

// extending our StyledButton with a few styles for this use
const StyledButtonColour = styled(StyledButton)`
  width: 5rem;
  border: 1px solid ${props => props.colour};
  background: ${props => (props.disabled ? props.colour : "none")};
  color: ${props => (props.disabled ? "white" : props.colour)};

  :hover:not([disabled]) {
    cursor: pointer;
    box-shadow: inset 0 -3.25em 0 0 ${props => props.colour};
    color: white;
  }
`;

const ColourSelector = ({ colour, setColour }) => {
  // set new colour in state when clicked
  function handleClick({ target }) {
    const newColour = target.dataset.color;
    setColour(newColour);
  }

  return (
    <StyledDiv>
      <StyledButtonColour
        onClick={handleClick}
        data-color="hsl(192, 100%, 50%)"
        disabled={colour === "hsl(192, 100%, 50%)"}
        colour="hsl(192, 100%, 50%)"
        colourSelector
      >
        Iceberg
      </StyledButtonColour>
      <StyledButtonColour
        onClick={handleClick}
        data-color="hsl(341, 100%, 50%)"
        disabled={colour === "hsl(341, 100%, 50%)"}
        colour="hsl(341, 100%, 50%)"
        colourSelector
      >
        Lipstick
      </StyledButtonColour>

      <StyledButtonColour
        onClick={handleClick}
        data-color="hsl(128, 98%, 50%)"
        disabled={colour === "hsl(128, 98%, 50%)"}
        colour="hsl(128, 98%, 50%)"
        colourSelector
      >
        Spring
      </StyledButtonColour>
    </StyledDiv>
  );
};

export default ColourSelector;

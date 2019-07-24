import React from "react";
import styled from "styled-components";

const StyledSection = styled.section`
  flex-grow: 1;
  background: black;
`;

function renderClicks(newClicks, previouslySavedClicks) {
  const clicks = [...newClicks, ...previouslySavedClicks];
  return clicks.map(click => {
    const { x, y, colour, id } = click;
    return (
      <div
        key={id}
        style={{
          position: "absolute",
          background: colour,
          left: x,
          top: y,
          width: "5px",
          height: "5px"
        }}
      />
    );
  });
}

const Main = ({ clicks, setClicks, previouslySavedClicks, colour }) => {
  function handleClick({ pageX: x, pageY: y }) {
    setClicks([
      ...clicks,
      { x, y, colour, id: `${x}-${y}-${colour}-${clicks.length}` }
    ]);
  }

  return (
    <StyledSection onClick={handleClick}>
      {renderClicks(clicks, previouslySavedClicks)}
    </StyledSection>
  );
};

export default Main;

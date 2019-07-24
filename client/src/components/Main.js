import React from "react";
import styled from "styled-components";

const StyledSection = styled.section`
  flex-grow: 1;
  background: black;
`;

function renderClicks(newClicks, previouslySavedClicks) {
  // combine all session and saved clicks into one array
  const clicks = [...newClicks, ...previouslySavedClicks];
  // map over clicks returning a div to display
  return clicks.map(click => {
    // destructure click
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
  // add click to clicks array when a click is made
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

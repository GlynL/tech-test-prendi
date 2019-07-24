import React from "react";

const ClickCount = ({ clicks, previouslySavedClicks }) => {
  // calculate total cliks from session and saved clicks
  const totalClicks = clicks.length + previouslySavedClicks.length;
  return (
    <div>
      <p>Click Total: {totalClicks}</p>
      <p>Clicks this Session: {clicks.length}</p>
    </div>
  );
};

export default ClickCount;

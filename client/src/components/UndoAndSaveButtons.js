import React, { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import StyledButton from "./StyledButton";

const UndoAndSaveButtons = ({
  clicks,
  setClicks,
  previouslySavedClicks,
  setPreviouslySavedClicks,
  auth
}) => {
  const [error, setError] = useState("");
  function handleClickUndo() {
    // make a copy of clicks array
    const clicksCopy = [...clicks];
    // remove last item from copied clicks array - .pop doesn't mutate even though we have objects nested
    clicksCopy.pop();
    // set state to new clicks array
    setClicks(clicksCopy);
  }

  async function handleClickSave() {
    try {
      // call api with clicks to save
      const res = await fetch("http://localhost:8080/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ clicks, id: auth })
      });
      // check response ok
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.message !== "success") throw new Error();
      // add the saved clicks to previouslySaved array
      setPreviouslySavedClicks([...previouslySavedClicks, ...data.savedClicks]);
      // clear the session clicks
      setClicks([]);
    } catch (err) {
      setError("Uh oh something went wrong :(. Please try again.");
    }
  }

  return (
    <div>
      {error && <ErrorMessage message={error} />}
      <StyledButton onClick={handleClickUndo} danger>
        Undo
      </StyledButton>
      {auth ? (
        <StyledButton onClick={handleClickSave} success>
          Save
        </StyledButton>
      ) : (
        <p>Login to save your clicks.</p>
      )}
    </div>
  );
};

export default UndoAndSaveButtons;

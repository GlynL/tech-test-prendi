import React from "react";
import ColourSelector from "./ColourSelector";
import UndoAndSaveButtons from "./UndoAndSaveButtons";
import ClickCount from "./ClickCount";
import AuthLinks from "./AuthLinks";
import styled from "styled-components";

const StyledDiv = styled.div`
  flex-basis: 33%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (max-width: 768px) {
    order: 1;
  }
`;

const StyledSection = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  border-bottom: 1px solid #f2f2f2;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Header = ({
  colour,
  setColour,
  clicks,
  setClicks,
  previouslySavedClicks,
  setPreviouslySavedClicks,
  auth,
  setAuth
}) => {
  return (
    <StyledSection>
      <ColourSelector colour={colour} setColour={setColour} />
      <StyledDiv>
        <UndoAndSaveButtons
          clicks={clicks}
          setClicks={setClicks}
          auth={auth}
          previouslySavedClicks={previouslySavedClicks}
          setPreviouslySavedClicks={setPreviouslySavedClicks}
        />
        <ClickCount
          clicks={clicks}
          previouslySavedClicks={previouslySavedClicks}
        />
      </StyledDiv>
      <AuthLinks
        auth={auth}
        setAuth={setAuth}
        setPreviouslySavedClicks={setPreviouslySavedClicks}
      />
    </StyledSection>
  );
};

export default Header;

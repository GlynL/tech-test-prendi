import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import StyledButton from "./StyledButton";

const StyledDiv = styled.div`
  flex-basis: 33%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
`;

const AuthLinks = ({ auth, setAuth, setPreviouslySavedClicks }) => {
  // remove user from localStorage, removes auth state, and removes savedClicks state
  const handleClickLogout = () => {
    localStorage.removeItem("user");
    setAuth(null);
    setPreviouslySavedClicks([]);
  };
  return (
    <StyledDiv>
      {auth ? (
        <StyledButton danger onClick={handleClickLogout}>
          Logout
        </StyledButton>
      ) : (
        <>
          <StyledButton as={Link} to="/user/login">
            Login
          </StyledButton>
          <StyledButton as={Link} to="/user/register">
            Register
          </StyledButton>
        </>
      )}
    </StyledDiv>
  );
};

export default AuthLinks;

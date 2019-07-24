import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  border: 1px solid red;
  border-radius: 2px;
  color: red;
  padding: 0.4rem;
`;

const ErrorMessage = ({ message }) => {
  return <StyledDiv>{message}</StyledDiv>;
};

export default ErrorMessage;

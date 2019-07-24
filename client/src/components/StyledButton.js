import styled, { css } from "styled-components";

// styled button which is used across app
// takes some props to conditionally style - e.g. colour
export default styled.button`
  margin-right: 0.5rem;
  padding: 0.5rem;
  border-radius: 3px;
  border: 1px solid
    ${props => (props.danger ? "red" : props.success ? "#08A923" : "#f2f2f2")};
  background: none;
  color: ${props =>
    props.danger ? "red" : props.success ? "#08A923" : "#f2f2f2"};
  transition: all 0.3s;
  text-decoration: none;
  font-size: 1rem;

  /* add this hover effect if colourSelector prop not supplied */
  ${props =>
    !props.colourSelector &&
    css`
      &:hover {
        cursor: pointer;
        background: ${props =>
          props.danger ? "red" : props.success ? "#08A923" : "#f2f2f2"};
        color: ${props =>
          props.colour || props.danger || props.success ? "#f2f2f2" : "#333"};
      }
    `}
`;

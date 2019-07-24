import styled from "styled-components";

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

  :hover {
    cursor: pointer;
    background: ${props =>
      props.danger ? "red" : props.success ? "#08A923" : "#f2f2f2"};
    color: ${props =>
      props.colour || props.danger || props.success ? "#f2f2f2" : "#333"};
  }
`;

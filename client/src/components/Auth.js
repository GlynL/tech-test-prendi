import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import StyledButton from "./StyledButton";
import styled from "styled-components";

const StyledSection = styled.section`
  margin: 4rem auto;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;

const StyledInput = styled.input`
  margin-bottom: 1rem;
  margin-top: 0.4rem;
  padding: 0.4rem;
  background: #999;
  border: none;
  border-bottom: 1px solid #f2f2f2;
  border-radius: 2px;
  font-size: 1rem;

  ::placeholder {
    color: #333;
  }
`;

const StyledLabel = styled.label`
  font-size: 1.2rem;
`;

const StyledAltButton = styled(StyledButton)`
  color: #333;
  background: #f2f2f2;

  :hover {
    color: #f2f2f2;
    background: #333;
  }
`;

const Auth = ({ history, type, setAuth }) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);

  // setting user state from input
  const handleChange = ({ target: { name, value } }) =>
    setUser({ ...user, [name]: value });
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // make api call to register user
      const res = await fetch(`http://localhost:8080/user/${type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
      // check that response is good
      if (!res.ok) throw new Error();
      // convert response from json
      const data = await res.json();
      // check registration was successful
      if (data.message !== "success") throw new Error();
      // save user in state
      setAuth(data.id);
      // redirect
      history.push("/");
    } catch (e) {
      setError("Something went wrong. Please try again.");
    }
  }

  // destructure user
  const { username, password } = user;
  return (
    <StyledSection>
      {/* check for an error */}
      {error && <ErrorMessage message={error} />}

      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel htmlFor="username">Username</StyledLabel>
        <StyledInput
          onChange={handleChange}
          type="text"
          name="username"
          value={username}
          placeholder="coolestNameEver"
        />
        <StyledLabel htmlFor="password">Password</StyledLabel>
        <StyledInput
          onChange={handleChange}
          type="password"
          name="password"
          value={password}
          placeholder="superSecretPassword"
        />
        <div>
          <StyledAltButton>
            {type === "login" ? "Login" : "Register"}
          </StyledAltButton>
          <StyledButton as={Link} to="/">
            Back
          </StyledButton>
        </div>
      </StyledForm>
    </StyledSection>
  );
};

export default withRouter(Auth);

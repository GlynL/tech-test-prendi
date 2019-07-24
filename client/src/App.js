import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import Main from "./components/Main";
import Auth from "./components/Auth";
import PageNotFound from "./components/PageNotFound";
import ErrorMessage from "./components/ErrorMessage";
import "./App.css";

const StyledDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #333;
`;

function App({ children }) {
  const [colour, setColour] = useState("hsl(192, 100%, 50%)");
  const [clicks, setClicks] = useState([]);
  const [auth, setAuth] = useState("");
  const [error, setError] = useState("");
  const [previouslySavedClicks, setPreviouslySavedClicks] = useState([]);

  useEffect(
    () => {
      const fetchClicks = async () => {
        try {
          const res = await fetch(`http://localhost:8080/clicks/${auth}`);
          if (!res.ok) throw new Error();
          const data = await res.json();
          if (data.message !== "success") throw new Error();
          // set the state with clicks from db
          setPreviouslySavedClicks(data.clicks);
        } catch (err) {
          setError("Uh oh... can't fetch previous clicks.");
        }
      };

      if (auth) fetchClicks();
    },
    [auth] /* run anytime the logged in user changes */
  );

  return (
    <StyledDiv className="App">
      <Header
        colour={colour}
        setColour={setColour}
        clicks={clicks}
        setClicks={setClicks}
        previouslySavedClicks={previouslySavedClicks}
        setPreviouslySavedClicks={setPreviouslySavedClicks}
        auth={auth}
        setAuth={setAuth}
      />
      {error && <ErrorMessage message={error} />}
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Main
              colour={colour}
              clicks={clicks}
              setClicks={setClicks}
              previouslySavedClicks={previouslySavedClicks}
            />
          )}
        />
        <Route
          path="/user/login"
          render={() => <Auth type="login" setAuth={setAuth} />}
        />
        <Route
          path="/user/register"
          type="register"
          render={() => <Auth type="register" setAuth={setAuth} />}
        />
        <Route component={PageNotFound} />
      </Switch>
    </StyledDiv>
  );
}

export default App;

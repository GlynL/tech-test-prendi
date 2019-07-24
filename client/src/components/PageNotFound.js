import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <section>
      <h1>Uh oh!</h1>
      <p>Page can't be found.</p>
      <Link to="/">Back Home</Link>
    </section>
  );
};

export default PageNotFound;

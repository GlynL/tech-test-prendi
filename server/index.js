const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const PORT = 8080;

// cors for client
app.use(cors());

// enable middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

// setup routes
app.use(routes);

// setup server on provided PORT
app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));

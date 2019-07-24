const express = require("express");
const app = express();
const cors = require("cors");
// .env file config
const dotenv = require("dotenv");
dotenv.config();

const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

// cors for client
app.use(cors());

// enable middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

const { Pool } = require("pg");
// pools will use environment variables
// for connection information
const pool = new Pool();

app.get("/", (req, res, next) => {
  console.log("hi");
});

app.post("/user/register", async (req, res, next) => {
  // destructure body
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    // create new user in db
    const text =
      "INSERT INTO users(username, password) VALUES($1, $2) RETURNING *";
    const query = await pool.query(text, [username, hashedPassword]);
    return res.json({ message: "success", id: query.rows[0].id });
  } catch (err) {
    return res.json("Error! :O");
  }
});

app.post("/user/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const text = "SELECT * FROM users WHERE username=$1";
    const query = await pool.query(text, [username]);
    // if no matching username throw error
    if (!query.rows[0]) throw new Error();
    // check password matches - error if doesn't
    const hashedPassword = query.rows[0].password;
    const isPasswordMatch = bcrypt.compareSync(password, hashedPassword);
    if (!isPasswordMatch) throw new Error();
    // return success
    res.json({ message: "success", id: query.rows[0].id });
  } catch (err) {
    res.json("Error! :O");
  }
});

app.post("/save", async (req, res, next) => {
  const { clicks, id } = req.body;
  try {
    clicks.forEach(async click => {
      const { colour, x, y } = click;
      ("INSERT INTO users(username, password) VALUES($1, $2) RETURNING *");

      const text =
        "INSERT INTO clicks(colour, x, y, user_id) VALUES($1, $2, $3, $4)";
      const query = await pool.query(text, [colour, x, y, id]);
    });
    res.json("success");
  } catch (err) {
    res.json("Error! :O");
  }
});

app.get("/clicks/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const text = "SELECT * FROM clicks WHERE user_id=$1";
    const query = await pool.query(text, [id]);
    res.json({ message: "success", clicks: query.rows });
  } catch (err) {
    res.json("Error! :O");
  }
});

// setup server on provided PORT
app.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}.`)
);

// need to save in client separate new clicks array vs old clicks
// otherwise duplicating in db

// CREATE TABLE users(
//   id SERIAL PRIMARY KEY,
//   username VARCHAR(100) UNIQUE NOT NULL,
//   password VARCHAR(100) NOT NULL
// );

// CREATE TABLE clicks(
//   id SERIAL PRIMARY KEY,
//   colour VARCHAR(100),
//   x INT,
//   y INT,
//   user_id INT REFERENCES users(id)
// );

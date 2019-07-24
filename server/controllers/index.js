// setup bcrypt for hashing passwords
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
// setup db connection
const { Pool } = require("pg");
// pool uses string passed as env variable in docker
const pool = new Pool({
  connectionString: process.env.POSTGRES_URI
});

// if there were more controllres I would split them out to separate files

// just says 'hi' if you hit the root route '/' :)
exports.getHello = (req, res, next) => {
  res.send("hi");
};

exports.login = async (req, res, next) => {
  // destructure body
  const { username, password } = req.body;
  try {
    // hash provided password
    const hashedPassword = bcrypt.hashSync(password, salt);
    // create new user in db
    const text =
      "INSERT INTO users(username, password) VALUES($1, $2) RETURNING *";
    //execute query
    const query = await pool.query(text, [username, hashedPassword]);
    // return the new users id
    return res.json({ message: "success", id: query.rows[0].id });
  } catch (err) {
    // return an error
    return res.json("Error! :O");
  }
};

exports.register = async (req, res, next) => {
  // destructure the request body
  const { username, password } = req.body;
  try {
    // construct query to lookup user
    const text = "SELECT * FROM users WHERE username=$1";
    // execute query
    const query = await pool.query(text, [username]);
    // if no matching username throw error
    if (!query.rows[0]) throw new Error();
    // check password matches - error if doesn't
    const hashedPassword = query.rows[0].password;
    const isPasswordMatch = bcrypt.compareSync(password, hashedPassword);
    if (!isPasswordMatch) throw new Error();
    // return success and users id
    res.json({ message: "success", id: query.rows[0].id });
  } catch (err) {
    // return an error :(
    res.json("Error! :O");
  }
};

exports.saveClicks = async (req, res, next) => {
  // destructure request body
  const { clicks, id } = req.body;
  try {
    // loop over each click and insert each into database returning an array of saved items
    const promises = clicks.map(async click => {
      // destructure click
      const { colour, x, y } = click;
      // setup query
      const text =
        "INSERT INTO clicks(colour, x, y, user_id) VALUES($1, $2, $3, $4) RETURNING * ";
      // execute query
      return await pool.query(text, [colour, x, y, id]);
      return query.rows[0];
    });
    const results = await Promise.all(promises);
    const savedClicks = results.map(result => result.rows[0]);
    // respond with success and clicks
    res.json({ message: "success", savedClicks });
  } catch (err) {
    // respond with an error
    res.json("Error! :O");
  }
};

exports.getClicks = async (req, res, next) => {
  // destructure params
  const { id } = req.params;
  try {
    // query to find clicks which match users id
    const text = "SELECT * FROM clicks WHERE user_id=$1";
    const query = await pool.query(text, [id]);
    // respond with clicks
    res.json({ message: "success", clicks: query.rows });
  } catch (err) {
    // return an error
    res.json("Error! :O");
  }
};

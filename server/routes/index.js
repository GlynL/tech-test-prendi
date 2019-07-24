const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index.js");

// destructure all our controllers
// if there was more I would split this file up into sub routes 'eg. clicks and user'
const { login, register, getClicks, saveClicks, getHello } = controllers;

router.get("/", getHello);

router.post("/user/register", login);

router.post("/user/login", register);

router.post("/save", saveClicks);

router.get("/clicks/:id", getClicks);

module.exports = router;

const express = require("express");

const { loginUser, registerUser } = require("../controllers/auth-controllers");

const AuthRouter = express.Router();

AuthRouter.post("/login", loginUser);

AuthRouter.post("/registerUser", registerUser);

module.exports = AuthRouter;

require("dotenv").config();

const express = require("express");
const connectToDB = require("./database/db");
const TodoRouter = require("./routes/todo-routes");
const AuthRouter = require("./routes/auth-routes");
const authMiddleWare = require("./middlewares/auth-middleware");
const RateLimiter = require("./middlewares/rate-limit-middleware");

const app = express();

const PORT = process.env.PORT || 4000;

connectToDB();

app.use(express.json());
app.use("/todo", authMiddleWare, RateLimiter(2, 1 * 60 * 1000), TodoRouter);
app.use("/auth", AuthRouter);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

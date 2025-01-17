const express = require("express");

const {
  getToDo,
  getToDos,
  createToDo,
  deleteToDo,
  updateToDo,
  sortTodo,
} = require("../controllers/todo-controllers");
const authMiddleWare = require("../middlewares/auth-middleware");

const TodoRouter = express.Router();

TodoRouter.get("/getTodos", getToDos);

TodoRouter.get("/getTodo/:id", getToDo);

TodoRouter.post("/createTodo", createToDo);

TodoRouter.put("/updateTodo/:id", updateToDo);

TodoRouter.delete("/deleteTodo/:id", deleteToDo);

TodoRouter.get("/sortTodo/:type", sortTodo);

module.exports = TodoRouter;

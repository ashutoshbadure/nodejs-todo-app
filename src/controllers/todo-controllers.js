const ToDoModel = require("../models/todo-model");

const getToDos = async (req, res) => {
  try {
    const todos = await ToDoModel.find({});
    if (!todos.length) {
      res.status(404).json({
        message: "Todos not found",
      });
      return;
    }
    res.status(200).json({
      message: "Todos!",
      data: todos,
    });
  } catch (error) {
    console.error("Error in getTodods", error);
  }
};

const getToDo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(404).json({
        message: "Please provide todo id",
      });
      return;
    }
    const todo = await ToDoModel.findById(id);
    if (!todo) {
      res.status(404).json({
        message: "Todo not found",
      });
      return;
    }
    res.status(200).json({
      message: "Todo!",
      data: todo,
    });
  } catch (error) {
    console.error("Error in getToDo", error);
  }
};

const createToDo = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      res.status(404).json({
        message: "Please enter totdo title!",
      });
      return;
    }
    const createdTodo = await ToDoModel.create({ title });
    res.status(201).json({
      message: "Todo created sucessfully!",
      data: createdTodo,
    });
  } catch (error) {
    console.error("Error in createToDo", error);
  }
};
const updateToDo = async (req, res) => {
  try {
    const { title } = req.body;
    const { id } = req.params;
    if (!id) {
      res.status(404).json({
        message: "Please provide todo id",
      });
      return;
    }
    if (!title) {
      res.status(404).json({
        message: "Please enter todo title!",
      });
      return;
    }
    const updatedTodo = await ToDoModel.findByIdAndUpdate(
      { _id: id },
      { title }
    );
    res.status(201).json({
      message: "Todo updated sucessfully!",
    });
  } catch (error) {
    console.error("Error in updateToDo", error);
  }
};
const deleteToDo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(404).json({
        message: "Please provide todo id",
      });
      return;
    }
    const deletedTodo = await ToDoModel.findByIdAndDelete(id);
    res.status(201).json({
      message: "Todo deleted sucessfully!",
    });
  } catch (error) {
    console.error("Error in deleteToDo", error);
  }
};
const sortTodo = async (req, res) => {
  try {
    const { type } = req.params;
    if (!type) {
      res.status(404).json({
        message: "Please provide sorting type!",
      });
      return;
    }
    const sortedTodos = await ToDoModel.find().sort({ title: type });
    res.status(200).json({
      message: `Todods sorted in ${type} order sucessfully!`,
      data: sortedTodos,
    });
  } catch (error) {
    console.error("Error in sortTodo", error);
  }
};

module.exports = {
  getToDos,
  getToDo,
  createToDo,
  updateToDo,
  deleteToDo,
  sortTodo,
};

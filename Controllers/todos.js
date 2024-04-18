
import Todo from "../Model/tododata.js";
import bcrypt from "bcryptjs";
import { statusCode } from "../statusCode.js";
const addTodo = (req, res) => {
  const { todo, created_by, password } = req.body;
  // const todoExists = Todo.findOne({ todo: todo, created_by: created_by });
  const todoExists = Todo.checkDuplicateTodo(todo,created_by);
  todoExists.then((result) => {
    if (result) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json({ error: "Todo already exists with this user" });
    } else {

      const newTodo = new Todo({
        ...req.body,
      });
      newTodo
        .save()
        .then((result) => {
          return res.status(statusCode.CREATED).json(result);
        })
        .catch((error) => {
          return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: error.message });
        });
    }
  });
};

const getTodos = (req, res) => {
  const todo = Todo.find()

  todo
    .then((result) => {
      return res.status(statusCode.OK).json(result);
    })
    .catch((error) => {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: error.message });
    });
};

const getSpecificTodo = (req, res) => {
  const { id } = req.params;
  const todo = Todo.findOne({ id: id })
  todo
    .then((result) => {
      return res.status(statusCode.OK).json(result);
    })
    .catch((error) => {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: error.message });
    });
};

const updateTodo = (req, res) => {
  const { id } = req.params;
  const { password, todo } = req.body;
  const data = {
    todo: todo,
    updated_at: new Date(),
  };
  const existingTodo = Todo.findOne({ id: id });
  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }
  existingTodo
    .then((result) => {
      if (result) {
        const isMatch = bcrypt.compareSync(password, result.password);
        if (isMatch) {
          const todo = Todo.findOneAndUpdate(
            {
              id: id,
            },
            data,
            {
              new: true,
            }
          );
          todo
            .then((result) => {
              return res.status(statusCode.OK).json(result);
            })
            .catch((error) => {
              return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: error.message });
            });
        } else {
          return res.status(400).json({ error: "Password is incorrect" });
        }
      } else {
        return res.status(400).json({ error: "Todo does not exist" });
      }
    })
    .catch((error) => {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: error.message });
    });
};

const deleteTodo = (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const todo = Todo.findOne({ id: id });
  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }
  todo
    .then((result) => {
      console.log(result);
      if (result) {
        const isMatch = bcrypt.compareSync(password, result.password);
        if (isMatch) {
          const todo = Todo.findOneAndDelete({ id: id });
          todo
            .then((result) => {
              return res.status(statusCode.OK).json(result);
            })
            .catch((error) => {
              return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: error.message });
            });
        } else {
          return res.status(400).json({ error: "Password is incorrect" });
        }
      } else {
        return res.status(400).json({ error: "Todo does not exist" });
      }
    })
    .catch((error) => {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: error.message });
    });
};

export { addTodo, getTodos, getSpecificTodo, updateTodo, deleteTodo };

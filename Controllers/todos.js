import Todo from "../Model/tododata.js";
import bcrypt from "bcryptjs";
import { statusCode } from "../statusCode.js";
const addTodo = (req, res) => {
  const { todo, created_by, password } = req.body;
  // const todoExists = Todo.findOne({ todo: todo, created_by: created_by });
  const todoExists = Todo.checkDuplicateTodo(todo, created_by);
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
          const data = {
            data: result,
            message: "Todo added successfully",
          };
          return res.status(statusCode.CREATED).json(data);
        })
        .catch((error) => {
          return res
            .status(statusCode.INTERNAL_SERVER_ERROR)
            .json({ error: error.message });
        });
    }
  });
};

const getTodos = (req, res) => {
  const todo = Todo.find();
  const params = req.query;
  if (params.user) {
    todo.where({ created_by: params.user });
  }
  let page = 1;
  let limit = 10; // number of records per page
  if (params.max) {
    if (parseInt(params.max) > 100) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json({ error: "Cannot fetch more than 100 todos" });
    }
    todo.limit(parseInt(params.max));
  } else {
    page = parseInt(params.page) || 1;
    if(params.limit){
      if(parseInt(params.limit) > 100){
        return res
        .status(statusCode.BAD_REQUEST)
        .json({ error: "Cannot fetch more than 100 todos" });
      }
      limit = parseInt(params.limit);
    }
    let skip = (page - 1) * limit;
    todo.limit(limit).skip(skip);
  }

  todo
    .then((result) => {
      const data = {
        count: result.length,
        data: result,
        message:
          result.length > 0 ? "Todos fetched successfully" : "No todos found",
        page: page,
      };
      return res.status(statusCode.OK).json(data);
    })
    .catch((error) => {
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    });
};

const getSpecificTodo = (req, res) => {
  const { id } = req.params;
  const todo = Todo.findOne({ id: id });
  todo
    .then((result) => {
      const data = {
        count: result.length,
        data: result,
        message: "Todo fetched successfully",
      };
      return res.status(statusCode.OK).json(data);
    })
    .catch((error) => {
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
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
              const data = {
                data: result,
                message: "Todo updated successfully",
              };
              return res.status(statusCode.OK).json(data);
            })
            .catch((error) => {
              return res
                .status(statusCode.INTERNAL_SERVER_ERROR)
                .json({ error: error.message });
            });
        } else {
          return res.status(400).json({ error: "Password is incorrect" });
        }
      } else {
        return res.status(400).json({ error: "Todo does not exist" });
      }
    })
    .catch((error) => {
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
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
              const data = {
                data: result,
                message: "Todo deleted successfully",
              };
              return res.status(statusCode.OK).json(data);
            })
            .catch((error) => {
              return res
                .status(statusCode.INTERNAL_SERVER_ERROR)
                .json({ error: error.message });
            });
        } else {
          return res.status(400).json({ error: "Password is incorrect" });
        }
      } else {
        return res.status(400).json({ error: "Todo does not exist" });
      }
    })
    .catch((error) => {
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    });
};

export { addTodo, getTodos, getSpecificTodo, updateTodo, deleteTodo };

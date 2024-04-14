import Todo from "../Model/tododata.js";
import bcrypt from "bcrypt";
const addTodo = (req, res) => {
  const { todo, created_by, password } = req.body;
  const todoExists = Todo.findOne({ todo: todo, created_by: created_by });
  todoExists.then((result) => {
    if (result) {
      return res
        .status(400)
        .json({ error: "Todo already exists with this user" });
    } else {
      let encrtptedPassword = bcrypt.hashSync(password, 10);
      const newTodo = new Todo({
        ...req.body,
        password: encrtptedPassword,
      });
      newTodo
        .save()
        .then((result) => {
          return res.status(201).json(result);
        })
        .catch((error) => {
          return res.status(500).json({ error: error.message });
        });
    }
  });
};

const getTodos = (req, res) => {
  const todo = Todo.find();

  todo
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
};

const getSpecificTodo = (req, res) => {
  const { id } = req.params;
  const todo = Todo.findOne({ id: id });
  todo
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
};

const updateTodo = (req, res) => {
  const { id } = req.params;
  const {password,todo}  = req.body;
  const data = {
    todo: todo,
    updated_at: new Date(),
  }
  const existingTodo = Todo.findOne({ id: id });
  if(!password){
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
              return res.status(200).json(result);
            })
            .catch((error) => {
              return res.status(500).json({ error: error.message });
            });
        } else {
          return res.status(400).json({ error: "Password is incorrect" });
        }
      } else {
        return res.status(400).json({ error: "Todo does not exist" });
      }
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
};

const deleteTodo = (req, res) => {
  const { id } = req.params;
  const {password} = req.body;
  const todo = Todo.findOne({ id: id });
  if(!password){
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
              return res.status(200).json(result);
            })
            .catch((error) => {
              return res.status(500).json({ error: error.message });
            });
        } else {
          return res.status(400).json({ error: "Password is incorrect" });
        }
      } else {
        return res.status(400).json({ error: "Todo does not exist" });
      }
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
};

export { addTodo, getTodos, getSpecificTodo, updateTodo, deleteTodo };

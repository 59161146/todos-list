const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let todos = [];

app.get("/todo", (req, res) => {
  res.send(todos);
});

app.get("/todo/completed", (req, res) => {
  let completeTodo = [];
  todos.forEach(myFunction);

  function myFunction(todo) {
    if (todo.completed === true) {
      completeTodo.push(todo);
    }
  }
  res.send(completeTodo);
});

app.get("/todo/uncompleted", (req, res) => {
  let uncompleteTodo = [];
  todos.forEach(myFunction);

  function myFunction(todo) {
    if (todo.completed === false) {
      uncompleteTodo.push(todo);
    }
  }
  res.send(uncompleteTodo);
});

app.get("/todo/count", (req, res) => {
  let uncompleteTodo = [];
  todos.forEach(myFunction);

  function myFunction(todo) {
    if (todo.completed === false) {
      uncompleteTodo.push(todo);
    }
  }
  let num = uncompleteTodo.length;
  res.status(200).send({ num: num });
});

app.post("/todo", (req, res) => {
  let todo = createTodo(req.body.title);
  todos.push(todo);
  res.status(201).send(todo);
});

app.put("/todo/:id", (req, res) => {
  let id = req.params.id;
  let todo = todos[id - 1];
  todo.title = req.body.title;
  res.status(200).send(todo);
});

app.put("/todo/status/:id", (req, res) => {
  let id = req.params.id;
  let todo = todos[id - 1];
  if (todo.completed === false) {
    todo.completed = true;
  } else if (todo.completed === true) {
    todo.completed = false;
  }
  res.status(200).send(todo);
});

app.delete("/todo/:id", (req, res) => {
  let id = todos.filter(todo => todo.id.toString() === req.params.id);
  let index = todos.indexOf(id[0]);
  delete todos[index];
  todos = todos.filter(todo => todo !== null);
  res.sendStatus(204);
});

app.delete("/todo/completed", (req, res) => {
  todos = todos.filter(todo => todo.completed !== false);
  res.send(todos);
});

app.listen(port, () => {
  console.log(`start ${port}`);
});

function Todos(title) {
  this.id = null;
  this.title = title;
  this.completed = false;
}

function generateNewId(num) {
  return num + 1;
}

function createTodo(title) {
  let todo = new Todos(title);
  todo.id = generateNewId(todos.length);
  return todo;
}

// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require('body-parser')

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.send("<a href='/todos'>Todo List </a>");
});
let todoList = [
  { id: 1, todo: "Đi chợ" },
  { id: 2, todo: "Nấu cơm" },
  { id: 3, todo: "Rửa bát" },
  { id: 4, todo: "Học code tại CodersX" }
];
app.get("/todos", (req, res) => {
  res.render("todo/index", {
    todoList
  });
});
//Query
app.get("/todos/search", (req, res) => {
  let q = req.query.q;
  console.log(q);
  let findTodo = todoList.filter(
  (x=>x.todo.toLowerCase().indexOf(q.toLowerCase()) !== -1))
  res.render("todo/index", {
    todoList: findTodo
  });
});
app.get("/todos/create", (req, res) => {
  res.render("todo/create");
});

app.post("/todos/create", (req, res) => {
  todoList.push(req.body)
  //let backURL=req.header('Referer') || '/';
  res.redirect('/todos')
});
// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});

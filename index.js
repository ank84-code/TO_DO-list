const express = require("express");
const app = express();


app.set("view engine", "ejs");


app.use(express.urlencoded({ extended: true }));


app.use(express.static("public"));

let tasks = [];
let idCounter = 1;

app.get("/", (req, res) => {
  res.render("index", { tasks: tasks });
});


app.post("/add", (req, res) => {
  const text = req.body.task;
  if (text && text.trim() !== "") {
    tasks.push({
      id: idCounter++,
      text: text.trim(),
      done: false
    });
  }
  res.redirect("/");
});


app.post("/toggle/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.done = !task.done;
  }
  res.redirect("/");
});


app.post("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.redirect("/");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

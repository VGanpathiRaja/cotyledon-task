const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const items =require("./datas.json")
const app = express();
const PORT = 5050;

app.use(bodyParser.json());
app.use(cors());

let items = [];
let idCounter = 1;

app.post("/items", (req, res) => {
  const { name, age, mobileno, city } = req.body;
  if (!name || !age || !mobileno || !city) {
    return res.status(400).json({ error: "All fields (name, age, mobileno, city) are required." });
  }

  const newItem = { id: idCounter++, name, age, mobileno, city };
  items.push(newItem);
  res.status(201).json(newItem);
});


app.get("/items", (req, res) => {
  res.json(items);
});


app.get("/items/:id", (req, res) => {
  const { id } = req.params;
  const item = items.find((item) => item.id === parseInt(id));
  if (!item) {
    return res.status(404).json({ error: "Item not found." });
  }
  res.json(item);
});

app.put("/items/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, mobileno, city } = req.body;
  const item = items.find((item) => item.id === parseInt(id));
  if (!item) {
    return res.status(404).json({ error: "Item not found." });
  }

 
  if (name) item.name = name;
  if (age) item.age = age;
  if (mobileno) item.mobileno = mobileno;
  if (city) item.city = city;

  res.json(item);
});


app.delete("/items/:id", (req, res) => {
  const { id } = req.params;
  const index = items.findIndex((item) => item.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "Item not availl." });
  }

  items.splice(index, 1);
  res.json({ message: "Item deleted successfully." });
});

app.listen(PORT, 
  () => console.log(`Server running on ${PORT}`));

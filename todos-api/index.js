import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 4000; 

app.use(bodyParser.json());
app.use(cors());

let tasks = [];

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.json(newTask);
});

app.put('/api/tasks', (req, res) => {
  tasks = req.body;
  res.json(tasks);
});

app.delete('/api/tasks/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    res.json({ message: 'Task deleted' });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});

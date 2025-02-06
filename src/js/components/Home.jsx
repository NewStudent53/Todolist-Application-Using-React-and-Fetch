import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/index.css'; 

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);

  const apiBaseUrl = 'http://localhost:4000/api/tasks';

  useEffect(() => {
    fetch(apiBaseUrl)
      .then(response => response.json())
      .then(data => {
        setTasks(data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
        setError('Error fetching tasks: ' + error.message);
      });
  }, []);

  const addTask = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (input.trim()) {
        const newTask = { label: input, done: false };
        const newTasks = [...tasks, newTask];
        setTasks(newTasks);
        setInput('');
        updateTasksOnServer(newTasks);
      }
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((task, i) => i !== index);
    setTasks(newTasks);
    updateTasksOnServer(newTasks);
  };

  const updateTasksOnServer = (tasks) => {
    fetch(apiBaseUrl, {
      method: "PUT",
      body: JSON.stringify(tasks),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Tasks updated:', data);
    })
    .catch(error => {
      console.error('Error updating tasks:', error);
      setError('Error updating tasks: ' + error.message);
    });
  };

  const clearTasks = () => {
    const emptyTasks = [];
    setTasks(emptyTasks);
    updateTasksOnServer(emptyTasks);
  };

  return (
    <div className="container Home">
      <h1>todos</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="What needs to be done?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={addTask}
        />
        <button className="btn btn-primary" onClick={addTask}>Add</button>
        <button className="btn btn-danger" onClick={clearTasks}>Clear All</button>
      </div>
      <ul className="list-group">
        {tasks.length === 0 ? (
          <li className="list-group-item">No tasks, add a task</li>
        ) : (
          tasks.map((task, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              {task.label}
              <button className="btn btn-danger btn-sm" onClick={() => deleteTask(index)}>❌</button>
            </li>
          ))
        )}
      </ul>
      <div className="mt-3">
        <span>{tasks.length} item{tasks.length !== 1 ? 's' : ''} left</span>
      </div>
    </div>
  );
};

export default Home;

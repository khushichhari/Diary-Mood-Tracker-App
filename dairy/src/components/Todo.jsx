import { useState, useEffect, useCallback } from "react";
import TodosIn from './TodosIn.jsx';
import './styles/Todo.css';
import axios from 'axios';
import CircleIcon from '@mui/icons-material/Circle'; // Circle-filled icon
import DeleteIcon from '@mui/icons-material/Delete'; // Trash icon
import IconButton from '@mui/material/IconButton'; // For clickable delete icon
import Navbar from './Navbar.jsx';
import './styles/Navbar.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // API base URL for consistency

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch todos from the server
  useEffect(() => {
    axios.get(`${API_BASE_URL}/get`)
      .then(result => {
        setTodos(result.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Handle task update (mark as done)
  const handleEdit = useCallback((id) => {
    axios.put(`${API_BASE_URL}/update/${id}`)
      .then(() => {
        setTodos(todos.map(todo =>
          todo._id === id ? { ...todo, done: true } : todo
        ));
        window.alert("Task Complete");
      })
      .catch(error => {
        console.error(error);
        window.alert("Failed to update the task. Please try again.");
      });
  }, [todos]);

  // Handle task deletion
  const handleDelete = useCallback((id) => {
    axios.delete(`${API_BASE_URL}/delete/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id));
        window.alert("Delete Task");
      })
      .catch(error => {
        console.error(error);
        window.alert("Failed to delete the task. Please try again.");
      });
  }, [todos]);

  // Add a new task from the Create component
  const handleAddTask = (newTask) => {
    setTodos([...todos, newTask]);
  };

  // Render loading or error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
    <div className = "navbar">
      <Navbar/>
    </div>
    <div className="todo">
      <h2>To-Do List</h2>
      <br />
      {/* Pass the onAddTask handler to Create component */}
      <TodosIn onAddTask={handleAddTask} />
      {todos.length === 0 ? (
        <div><h2>No Record</h2></div>
      ) : (
        todos.map((todo) => (
          <div className="added-task" key={todo._id}>
            <CircleIcon
              onClick={() => handleEdit(todo._id)}
              className="task-icon1"
              style={{ color: todo.done ? '#4a90e2' : 'gray', cursor: 'pointer' }} // Added hover effect
            />
            <p className={todo.done ? "line-through" : ""}>
              {todo.task}
            </p>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => handleDelete(todo._id)} // Attach delete handler
            >
              <DeleteIcon className="task-icon2" style={{ color: '#4a90e2', cursor: 'pointer' }} />
            </IconButton>
          </div>
        ))
      )}
    </div>
    </>
  );
}


// new
import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Add this line

export default function TodosIn({ onAddTask }) {
  const [task, setTask] = useState('');

  const handleAdd = () => {
    if (task.trim() === '') {
      window.alert("Task cannot be empty!");
      return;
    }
    axios.post(`${API_BASE_URL}/add`, { task }) // Use env variable here
      .then(result => {
        console.log(result.data);
        window.alert("Add Task");
        onAddTask(result.data);
        setTask('');
      })
      .catch(err => {
        console.error(err);
        window.alert("Failed to add the task. Please try again.");
      });
  };

  return (
    <div className="create-form">
      <input
        onChange={(e) => setTask(e.target.value)}
        value={task}
        type="text"
        placeholder="Enter Task"
      />
      <button onClick={handleAdd} type="button">Add</button>
    </div>
  );
}

TodosIn.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};




// old

// import { useState } from 'react';
// import PropTypes from 'prop-types'; // Import PropTypes for props validation
// import axios from 'axios';

// export default function TodosIn({ onAddTask }) {
//   const [task, setTask] = useState(''); // Initialize task as an empty string

//   const handleAdd = () => {
//     if (task.trim() === '') {
//       window.alert("Task cannot be empty!");
//       return; // Prevent adding empty tasks
//     }
//     axios.post('http://localhost:5000/add', { task: task })
//       .then(result => {
//         console.log(result.data);
//         window.alert("Add Task");
//         onAddTask(result.data); // Call the parent function to update tasks
//         setTask(''); // Clear the input field after adding a task
//       })
//       .catch(err => {
//         console.error(err);
//         window.alert("Failed to add the task. Please try again.");
//       });
//   };

//   return (
//     <div className="create-form">
//       <input
//         onChange={(e) => setTask(e.target.value)}
//         value={task} // Bind the input value to state
//         type="text"
//         placeholder="Enter Task"
//       />
//       <button onClick={handleAdd} type="button">Add</button>
//     </div>
//   );
// }

// // Props validation
// TodosIn.propTypes = {
//   onAddTask: PropTypes.func.isRequired, // Validate that onAddTask is a required function
// };



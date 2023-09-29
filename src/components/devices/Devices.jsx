// frontend/src/components/Tasks.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('/api/device/3/') // Use Axios to make a GET request
      .then(response => {
        setTasks(response.data); // Update state with response data
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div>
      {tasks.map(task => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  );
};

export default Tasks;

import React, { useState, useEffect } from 'react';
import './App.css';

// Components
import Header from './components/Header/Header'
import TaskList from './components/TodoList/TaskList'
import TodoInput from './components/TodoInput/TodoInput'

function App() {
    // States:
    const [tasks, setTasks] = useState([])
    const [fetchError, setFetchError] = useState(false)
    // Fetch the tasks from the API
    const fetchTasksFromApi = () => {
        console.log('Fetching...')
        fetch('http://127.0.0.1:8000/api/task-list/')
            .then(res => res.json())
            .then(data => setTasks(data))
            .catch(err => setFetchError(err))
    }
    // Use effects
    useEffect(() => {
        fetchTasksFromApi()
    }, [])

    return (
        <div className="App">
            <Header />
            <TaskList
                tasks={tasks}
                fetchErrors={fetchError}
            />
            <TodoInput
                fetchTask={() => fetchTasksFromApi()}
            />
        </div>
    );
}

export default App;

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

    // Function:
    // Get a cookie with a specific name
    const getCookie = name => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            let cookies = document.cookie.split(';')
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim()
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
                    break
                }
            }
        }
        return cookieValue;
    }
    // Fetch the tasks from the API
    const fetchTasksFromApi = () => {
        console.log('Fetching...')
        fetch('http://127.0.0.1:8000/api/task-list/')
            .then(res => res.json())
            .then(data => setTasks(data))
            .catch(err => setFetchError(err))
    }
    // Delete a task
    const deleteTask = taskId => {
        console.log(`deleting task ${taskId}...`)
        fetch(`http://127.0.0.1:8000/api/task-delete/${taskId}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(setTimeout(fetchTasksFromApi, 200))
            .catch(err => setFetchError(err))
    }
    // Update a task
    const updateTask = (taskId, taskTitle, taskIsChecked) => {
        const taskToAdd = {
            id: taskId,
            title: taskTitle,
            completed: taskIsChecked
        }
        console.log(`update task ${taskId}...`)
        console.log(`update task ${taskId}...`)
        fetch(`http://127.0.0.1:8000/api/task-update/${taskId}/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(taskToAdd)
        })
            .then(res => res.json())
            .then(setTimeout(fetchTasksFromApi, 200))
            .catch(err => setFetchError(err))
    }
    // Use effects
    useEffect(() => {
        fetchTasksFromApi()
    }, [])

    const csrftoken = getCookie('csrftoken')

    return (
        <div className="App">
            <Header />
            <TaskList
                tasks={tasks}
                fetchErrors={fetchError}
                deleteTask={deleteTask}
                updateTask={updateTask}
            />
            <TodoInput
                fetchTask={() => fetchTasksFromApi()}
                csrftoken={csrftoken}
            />
        </div>
    );
}

export default App;

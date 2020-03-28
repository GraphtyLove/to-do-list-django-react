import React, { useState } from 'react'

// Components
import TaskItem from './TaskItem'
import { useEffect } from 'react'


const TaskList = () => {

    // States:
    const [tasks, setTasks] = useState([]);
    const [fetchError, setFetchError] = useState(false);

    // Fetch the tasks from the API
    const fetchTasksFromApi = () => {
        fetch('http://127.0.0.1:8000/api/task-list/')
            .then(res => res.json())
            .then(data => setTasks(data))
            .catch(err => setFetchError(err))
    }



    // use effects
    useEffect(() => {
        fetchTasksFromApi()
    }, [])



    // Styles:
    const styleTaskList = {
        width: '50%'
    }

    return (
        <main className="container df-center-col">
            <h2>Task List</h2>
            <ul style={styleTaskList}>
                {fetchError && <p style={{ color: 'red', textAlign: 'center' }}>Error while fetching the API...</p>}
                {!fetchError && tasks && tasks.length > 0 && tasks.map(task => <TaskItem task={task} key={task.id} />)}
            </ul>
        </main>
    )
}

export default TaskList
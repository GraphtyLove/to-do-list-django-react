import React from 'react'

// Components
import TaskItem from './TaskItem'


const TaskList = props => {

    // Styles:
    const styleTaskList = {
        width: '50%'
    }

    return (
        <main className="container df-center-col">
            <h2>Task List</h2>
            <ul style={styleTaskList}>
                {props.fetchError && <p style={{ color: 'red', textAlign: 'center' }}>Error while fetching the API...</p>}
                {!props.fetchError && props.tasks && props.tasks.length > 0 && props.tasks.map(task => <TaskItem task={task} key={task.id} />)}
            </ul>
        </main>
    )
}

export default TaskList
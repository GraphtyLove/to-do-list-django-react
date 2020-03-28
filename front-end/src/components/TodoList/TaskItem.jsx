import React from 'react'

const itemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px',
    border: '1px solid black',
    margin: '5px 0'
}

const TaskItem = props => {
    return (
        <li style={itemStyle}>
            <input defaultChecked={props.task.completed} type="checkbox" /> <p> {props.task.title} </p>
        </li>
    )
}

export default TaskItem
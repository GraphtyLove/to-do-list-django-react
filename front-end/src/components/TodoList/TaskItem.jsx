import React, { useState, Fragment } from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import EditIcon from '@material-ui/icons/Edit'
import DoneIcon from '@material-ui/icons/Done'
import TextField from '@material-ui/core/TextField'

const itemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px',
    margin: '5px 0',
}


const TaskItem = props => {
    // States:
    const [editMode, setEditMode] = useState(false)
    const [taskTitle, setTaskTitle] = useState(props.task.title)
    const [taskIsCompleted, setTaskIsCompleted] = useState(props.task.completed)

    const taskId = props.task.id

    // Handle changes:
    const handleChangeTaskTitle = event => {
        setTaskTitle(event.target.value);
    }
    const handleChangeCompleted = event => {
        setTaskIsCompleted(event.target.checked)
        props.updateTask(taskId, taskTitle, event.target.checked)
    }

    return (
        <li style={itemStyle}>
            <Checkbox
                checked={taskIsCompleted}
                onChange={handleChangeCompleted}
            />

            {!editMode
                ? <Fragment>
                    <p style={{ textDecoration: taskIsCompleted && 'line-through' }}> {props.task.title} </p>
                    <EditIcon
                        className="pointer"
                        style={{ marginLeft: 'auto', color: '#303F9F' }}
                        onClick={() => setEditMode(true)}
                        onChange={setTaskIsCompleted}
                    />
                </Fragment>
                : <Fragment>
                    <TextField
                        variant="outlined"
                        value={taskTitle}
                        onChange={handleChangeTaskTitle}
                    />
                    <DoneIcon
                        className="pointer"
                        style={{ color: 'green', marginLeft: 'auto' }}
                        onClick={() => {
                            props.updateTask(taskId, taskTitle, taskIsCompleted)
                            setEditMode(false)
                        }}
                    />
                    < DeleteOutlineIcon
                        className="pointer"
                        style={{ color: 'red' }}
                        onClick={() => props.deleteTask(taskId)}
                    />
                    <HighlightOffIcon
                        className="pointer"
                        style={{ color: '#303F9F', marginLeft: '20px' }}
                        onClick={() => setEditMode(false)}
                    />
                </Fragment>
            }
        </li>
    )
}

export default TaskItem
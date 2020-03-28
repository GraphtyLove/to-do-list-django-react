import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import EditIcon from '@material-ui/icons/Edit';

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
            <Checkbox defaultChecked={props.task.completed} />
            <p> {props.task.id}. {props.task.title} </p>
            <EditIcon
                className="pointer"
                style={{ marginLeft: 'auto', color: '#303F9F' }}
                onClick={() => console.log('EDIT!')}
            />
            <HighlightOffIcon
                className="pointer"
                style={{ color: 'red', marginLeft: '10px' }}
                onClick={() => props.deleteTask(props.task.id)}
            />
        </li>
    )
}

export default TaskItem
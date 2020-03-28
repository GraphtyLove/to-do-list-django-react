import React from 'react'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField';

const TodoInput = props => {
    // States:
    const [taskToAddIsChecked, setTaskToAddIsChecked] = React.useState(false)
    const [taskToAddText, setTaskAddToText] = React.useState('')

    // handleChange:
    const handleChangeTaskToAddCheck = event => {
        setTaskToAddIsChecked(event.target.checked);
    }
    const handleChangeTaskText = event => {
        setTaskAddToText(event.target.value);
    }

    // Functions:
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
    const sendNewTaskToApi = () => {
        const csrftoken = getCookie('csrftoken')
        fetch('http://127.0.0.1:8000/api/task-create/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                title: taskToAddText,
                completed: taskToAddIsChecked
            })
        })
        props.fetchTask()
        setTaskAddToText('')
        setTaskToAddIsChecked(false)
    }


    // Style:
    const styleInputContainer = {
        width: '50%',
        marginTop: '20px'
    }

    return (
        <section className="container df-center-col ">
            <h2>Add a task</h2>
            <div className='df-center-col' style={styleInputContainer}>
                <TextField
                    style={{ width: '50%' }}
                    label="What should be done?"
                    value={taskToAddText}
                    onChange={handleChangeTaskText}
                />
                <div className="df-center-row" style={styleInputContainer}>
                    <p>Is done?</p>
                    <Checkbox
                        checked={taskToAddIsChecked}
                        onChange={handleChangeTaskToAddCheck}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    <Button
                        style={{ marginLeft: '20px' }}
                        variant="contained"
                        color="primary"
                        onClick={sendNewTaskToApi}
                    >
                        Add task
                    </Button>
                </div>
            </div>
        </section >
    )
}

export default TodoInput
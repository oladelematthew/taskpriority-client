import React, { useState, useEffect } from 'react';
import TaskCreate from './TaskCreate';
import TaskEdit from './TaskEdit';
import TaskTable from './TaskTable';
// import TaskCompleted from './TaskCompleted';
import {Container, Row, Col} from 'reactstrap';
import APIURL from '../../Helpers/environment'

const TaskIndex = (props) => {

    const [task, setTask] = useState([]);
    const [updateActive, setUpdateActive] = useState(false);
    const [taskToUpdate, setTaskToUpdate] = useState({});
    
    const fetchTasks = () => {
        fetch(`${APIURL}/tasks/all`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => res.json())
            .then((taskData) =>{
                console.log(taskData)
                setTask(taskData)
            })
    }
    
    const editUpdateTask = (task) => {
        setTaskToUpdate(task);
        console.log(task);
    }
    
    const updateOn = () => {
        setUpdateActive(true);
    }
    
    const updateOff = () => {
        setUpdateActive(false);
    }
    
    useEffect(() =>{
        fetchTasks();
    }, [])

    return (
            <Container >
                <Row>
                    <Col md="3">
                        <TaskCreate fetchTasks={ fetchTasks } token={ props.token } />
                    </Col>

                    <Col md="9">
                        <TaskTable task={ task } editUpdateTask={ editUpdateTask }
                        updateOn={ updateOn } fetchTasks={ fetchTasks } token={ props.token } />
                    </Col>

                    { updateActive ? <TaskEdit taskToUpdate={ taskToUpdate }
                    updateOff={ updateOff } fetchTasks={ fetchTasks } token={ props.token } /> : <></> }
                    
                </Row>
            </Container>
        );
    }

export default TaskIndex;
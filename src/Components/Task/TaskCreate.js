import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Input, FormGroup, Button, Form, Label } from 'reactstrap';
import APIURL from '../../Helpers/environment';

const TaskCreate = (props) => {

    const [taskName, setTaskName] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [timeOfTask, setTimeOfTask] = useState('');
    const [priority, setPriority] = useState('None');
    const [taskCompleted, setTaskCompleted] = useState('');

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const handleSubmit = (e) => {
        e.preventDefault();
        const task = {
            taskName: taskName,
            dueDate: dueDate,
            timeOfTask: timeOfTask,
            priority: priority,
            taskCompleted: taskCompleted
        }
        console.log(task);
        fetch(`${APIURL}/tasks`, {
            method: 'POST',
            body: JSON.stringify(task),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => res.json())
            .then((taskData) => {
                console.log(taskData);
                setTaskName('');
                setDueDate('');
                setTimeOfTask('');
                setPriority('');
                setTaskCompleted('');
                props.fetchTasks();
            })

            toggle();
    }


        return (
            <div>
                <br />
                <br />
                <div className="taskHeaders">
                    <>Create a task in 5 simple steps.</>
                </div>
                
                <Button style={{ background: '#9b0897', color: '#ffff', borderColor: 'white', fontWeight: '600' }} onClick={toggle} className="Authbtn" >Create/Add Task</Button>
                <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader style={{ background: '#211e43', color: '#f2b98d' }}>Create Task</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="taskName">Task Name</Label>
                                <Input name="taskName" value={taskName} onChange={(e) => setTaskName(e.target.value)}/>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="dueDate">Due Date</Label>
                                <Input date="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)}/>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="timeOfTask">Time of Task</Label>
                                <Input time="timeOfTask" value={timeOfTask} onChange={(e) => setTimeOfTask(e.target.value)}/>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="priority">Priority</Label>
                                <Input type="select" name="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                                    <option></option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                    <option value="None">None</option>
                                </Input>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="taskCompleted">Task Completed?</Label>
                                <Input type="select" name="taskCompleted" value={taskCompleted} onChange={(e) => setTaskCompleted(e.target.value)}>
                                    <option></option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </Input>
                            </FormGroup>

                            <Button type="submit" style={{ background: '#9b0897', color: '#ffff', borderColor: 'white' }}>Submit</Button>
                            <Button style={{ background: '#f2b98d', color: '#211e43', marginLeft: '10px', borderColor: 'white' }} onClick={toggle}>Cancel</Button>

                        </Form>

                    </ModalBody>
            </Modal>
                
            </div>
        );
    }

export default TaskCreate;
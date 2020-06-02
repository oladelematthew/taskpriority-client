import React, {useState} from 'react';
import { Modal, ModalBody, Input, FormGroup, Button, ModalHeader, Form, Label } from 'reactstrap';
import APIURL from '../../Helpers/environment';

const TaskEdit = (props) => {
    const [ editName, setEditName ] = useState(props.taskToUpdate.taskName);
    const [ editDate, setEditDate ] = useState(props.taskToUpdate.dueDate);
    const [ editTime, setEditTime ] = useState(props.taskToUpdate.timeOfTask);
    const [ editPriority, setEditPriority ] = useState(props.taskToUpdate.priority);
    const [ editCompleted, setEditCompleted ] = useState(props.taskToUpdate.taskCompleted);

    const taskUpdate = (e, task) => {
        e.preventDefault();
        fetch(`${APIURL}/tasks/${props.taskToUpdate.id}`, {
            method: "PUT",
            body: JSON.stringify({
                taskName: editName,
                dueDate: editDate,
                timeOfTask: editTime,
                priority: editPriority,
                taskCompleted: editCompleted
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => {
            props.fetchTasks();
            props.updateOff();
        })
    }
    
        return (
            <div>
                <Modal isOpen={true}>
                    <ModalHeader style={{ background: '#9b0897', color: '#ffff', }}>Edit Task</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={taskUpdate}>
                            <FormGroup>
                                <Label htmlFor="taskName">Edit Task Name</Label>
                                <Input name="taskName" value={editName} onChange={(e) => setEditName(e.target.value)}/>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="dueDate">Edit Due Date</Label>
                                <Input date="dueDate" value={editDate} onChange={(e) => setEditDate(e.target.value)}/>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="timeOfTask">Edit Time of Task</Label>
                                <Input time="timeOfTask" value={editTime} onChange={(e) => setEditTime(e.target.value)}/>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="priority">Priority</Label>
                                <Input type="select" name="priority" value={editPriority} onChange={(e) => setEditPriority(e.target.value)}>
                                    <option></option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                    <option value="None">None</option>
                                </Input>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="taskCompleted">Task Completed?</Label>
                                <Input type="select" name="taskCompleted" value={editCompleted} onChange={(e) => setEditCompleted(e.target.value)}>
                                    <option></option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </Input>
                            </FormGroup>
                            <Button style={{ background: '#9b0897', color: '#ffff', }} type="submit">Submit</Button>
                        </Form>
                    </ModalBody>
        </Modal>
                
            </div>
        );
    }

export default TaskEdit;
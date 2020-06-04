import React from 'react';
import {Table, Button} from 'reactstrap';
import APIURL from '../../Helpers/environment';

const TaskTable = (props) => {

    const deleteTask = (task) => {
        fetch(`${APIURL}/tasks/${task.id}`, {
            method: "DELETE",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then(() => props.fetchTasks())
    }

    const taskMapper = () => {
        return props.task.map((task, index) =>{
            return(
            <tr key={index}>
                <th scope="row">{ task.id }</th>
                <td>{ task.taskName }</td>
                <td>{ task.dueDate.toString().substring(0, 10) }</td> 
                {/* toLocaleDateString() */}
                <td>{ task.timeOfTask }</td>
                <td>{ task.priority }</td>
                <td>{ task.taskCompleted ? 'Yes' : 'No' }</td>
                <td style={{ display: 'flex' }}>
                    <Button style={{ background: '#9b0897', color: '#ffff', borderColor: 'lightGrey' }} onClick={() =>{props.editUpdateTask(task); props.updateOn()}}>Update</Button>
                    <Button style={{ background: '#211e43', color: '#f2b98d', marginLeft: '10px', borderColor: 'lightGrey' }} onClick={() => {deleteTask(task)}}>Delete</Button>
                </td>
            </tr>
        )
        })
    }

        return (
            <div style={{ marginTop: '60px', background: '#ffebde', borderRadius: '10px' }}>
                <h3 style={{ padding: '20px 0px 0px 20px', fontWeight: '800', color: '#211e43' }}>Task Table</h3>
                <hr/>
                <Table striped>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Task Name</th>
                            <th>Due Date</th>
                            <th>Time of Task (mins)</th>
                            <th>Priority</th>
                            <th>Task Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taskMapper()}
                    </tbody>
                </Table>
            </div>
        );
    }

export default TaskTable;
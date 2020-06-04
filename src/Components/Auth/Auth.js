import React, { useState } from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import APIURL from '../../Helpers/environment';
import linkedin from '../../Assets/matthew-oladele-linkedin.png';
import github from '../../Assets/matthew-oladele-github.png';

const baseUrl = `${APIURL}/user`;

const Auth = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signup, setSignup] = useState(true);

    const submit = (e) => {
        e.preventDefault();
        const url = signup ? baseUrl + '/signup' : baseUrl + '/signin';
        const reqBody = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        }).then(response => response.json())
            .then(rjson =>{
                props.updateToken(rjson.sessionToken)
            })
        .catch(err => console.log(err.message))
    }

    return (
            <div className="AuthContainer" >
                <div className="Authdiv" >
                    <div className="Authheaders">
                        <>Task Priority lets you manage your activities and get more done.</>
                    </div>
                    <span>
                        Create task. Manage task. Get more done.
                        <hr/>
                    </span>

                    <br />

                    <Form onSubmit={e => submit(e)} className="Authform" >
                        <h3>{signup ? 'Sign Up' : 'Sign In'}</h3>
                        
                        <FormGroup style={{ marginTop: '-5px' }}>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input style={{ marginTop: '-10px' }} name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                        </FormGroup>

                        <FormGroup style={{ marginTop: '-5px' }} >
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input style={{ marginTop: '-10px' }} name="lastName" value={lastName} onChange={e => setLastName(e.target.value)} required />
                        </FormGroup>

                        <FormGroup style={{ marginTop: '-5px' }} >
                            <Label htmlFor="email">Email</Label>
                            <Input style={{ marginTop: '-10px' }} name="email" value={email} onChange={e => setEmail(e.target.value)} required />
                        </FormGroup>

                        <FormGroup style={{ marginTop: '-5px' }} >
                            <Label htmlFor="password">Password</Label>
                            <Input style={{ marginTop: '-10px' }} type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required />
                        </FormGroup>

                        <Button style={{ backgroundColor: '#9b0897', borderColor: 'white' }} type="button" onClick={() => setSignup(!signup)}>{signup ? 'Have an account? Signin' : 'Need an account? Signup!'}</Button>
                        <Button style={{ backgroundColor: '#211e43', borderColor: 'white' }} type="submit">Click to Submit</Button>
                    </Form>

                    <footer style={{width: "30vw" }}>
                        <br />
                        <hr />
                        <div style={{ display: "flex", }}>
                            <p style={{ fontWeight: '300', fontSize: '0.8rem', color: 'grey', marginRight: "10px" }}>© 2020 taskPriority | All Rights Reserved.</p>
                            <a href="https://www.linkedin.com/in/matthew-oladele-20" target="blank" >
                                <img src={linkedin} style={{height: '20px', cursor: 'pointer', marginRight: "10px"}} />
                            </a>
                            <a href="https://github.com/oladelematthew" target="blank" >
                            <img src={github} style={{height: '20px', cursor: 'pointer'}} />
                            </a>
                        </div>
                    </footer>

                </div>
                
            </div>
        );
}

export default Auth;
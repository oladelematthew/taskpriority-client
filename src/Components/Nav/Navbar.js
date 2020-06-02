import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Button } from 'reactstrap';
import logo from '../../Assets/taskPriority-logo.svg';

const MyNavbar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        let newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
    }

    return(
        <Navbar style={{ background: '#211e43' }} color="faded" light expand="md">
            <div style={{marginLeft: '120px', marginTop: '20px', marginBottom: '20px'}}>
                <img src={logo} style={{height: '5.5vh', cursor: 'pointer'}} />
            </div>
            <NavbarBrand href="/"></NavbarBrand>
            <NavbarToggler onClick={toggle}/>
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        {props.signedIn ?
                            <Button style={{marginRight: '120px', background: '#f2b98d', color: '#211e43', borderColor: '#f2b98d', fontWeight: '700' }} onClick={props.logOut}>Logout</Button>
                            : <></>
                        }
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    )
}

export default MyNavbar;
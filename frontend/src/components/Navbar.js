import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {Link} from "react-router-dom"
function BasicExample() {
  return (
    <Navbar expand="lg" className=" bs-primary-border-subtle" style={{top : "0" , position : "fixed" , width : "100%" , borderBottom : "1px solid black",backgroundColor : "#ADD8E6" }}>
      <Container>
        
        
        <LinkContainer className = "bs-primary border-subtle" to="/dashboard">
          <Navbar.Brand >Dashboard</Navbar.Brand>
        </LinkContainer>
        <LinkContainer to="/newstudent">
          <Navbar.Brand>Register New Student</Navbar.Brand>
        </LinkContainer>
        <LinkContainer to="/newsub">
          <Navbar.Brand>Add New Subject</Navbar.Brand>
        </LinkContainer>
        <LinkContainer to="/search">
          <Navbar.Brand>Search Student</Navbar.Brand>
        </LinkContainer>
        <LinkContainer to="/resultmatrix">
          <Navbar.Brand>Enter Marks</Navbar.Brand>
        </LinkContainer>
        <LinkContainer to="/assignments">
          <Navbar.Brand>Add Assignments</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
      </Container>
    </Navbar>
  );
}

export default BasicExample;

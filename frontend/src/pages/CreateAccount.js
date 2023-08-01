import React, {useState} from 'react';
import {Container, Form, Button, Alert} from "react-bootstrap";
import {Link} from "react-router-dom";
import './CreateAccount.css';
import { useCreateAccountMutation } from "../services/appApi";

function CreateAccount() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [name, setName] = useState("");
    const [signup, { error, isLoading, isError }] = useCreateAccountMutation();

    function handleSignup(e) {
        e.preventDefault();
        signup({ name, email, pass });
    }

  return (
    <Container className="Create_image">
                <Form onSubmit={handleSignup}>
                    <h1>Create a new account</h1>
                    {isError && <Alert variant="danger">{error.data}</Alert>}
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder='Enter your name' value={name} required onChange={(e)=> setName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder='Enter your email' value={email} required onChange={(e)=> setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className='mb-4'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder='Enter your password' value={pass} required onChange={(e)=> setPass(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Button type="submit" disabled={isLoading}>Create Account</Button>
                    </Form.Group>
                    <p>
                        Already have an account? <Link to="/SignIn">Sign in</Link>{""}
                    </p>
                </Form>
    </Container>
  )
}

export default CreateAccount
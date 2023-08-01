import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSignInMutation } from "../services/appApi";
import "./SignIn.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [login, { isError, isLoading, error }] = useSignInMutation();
  function handleLogin(e) {
    e.preventDefault();
    login({ email, pass });
  }
  return (
    <Container className='SignIn_image'>
      <Form onSubmit={handleLogin}>
        <h1>E-Tailing</h1>
        {isError && <Alert variant='danger'>{error.data}</Alert>}
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter your email'
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-4'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter your password'
            value={pass}
            required
            onChange={(e) => setPass(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Button type='submit' disabled={isLoading}>
            SignIn
          </Button>
        </Form.Group>
        <p>
          SignUp? <Link to='/CreateAccount'>SignUp</Link>
          {""}
        </p>
      </Form>
    </Container>
  );
}

export default SignIn;

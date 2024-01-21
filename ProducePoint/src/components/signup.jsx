import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import '../App.css'

export default function Signup({userData, setUserData}) {

  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [error, setError] = useState("");
  // const [password, setPassword] = useState("");
  // const [address, setAddress] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/landing");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="p-4 box">
        
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control
              type="text"
              placeholder="Name"
              onChange={(e) => setUserData(prevUserData => ({...prevUserData, name: e.target.value}))}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setUserData(prevUserData => ({...prevUserData, name: e.target.value}))}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setUserData(prevUserData => ({...prevUserData, name: e.target.value}))}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAddress">
            <Form.Control
              type="text"
              placeholder="Address"
              onChange={(e) => setUserData(prevUserData => ({...prevUserData, name: e.target.value}))}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit" class="serif btn-primary">
              Sign up
            </Button>
          </div>
        </Form>
      </div>
      <div className="p-4 box mt-3 text-center">
        Already have an account? <Link to="/login" className="login-link">Log In</Link>
      </div>
    </>
  );
};

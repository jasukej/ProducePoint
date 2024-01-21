import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import '../App.css'

export default function Login() {

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const { logIn } = useUserAuth();
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
        await logIn(email, password);
        navigate("/landing");
        } catch (err) {
        setError(err.message);
        }
    };
    return (
    <>
    <div className="registration-login-grid">
      <div className="p-4 box regis-page">
        
      <img src="/title.svg" className="large-text-logo"/>

        <h1 className="title"> Log in to your ProducePoint </h1>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>


        <div className="sign-up-container">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </div>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit" className="serif btn-primary">
              Log in
            </Button>
          </div>
        </Form>
      </div>
      <div className="p-4 box mt-3 text-center">
        Don't have an account? Click here to <Link to="/" className="login-link">register</Link>
      </div>
      <div className="deco-container">
        <img src="/green-circle-dark.svg" className="deco deco-one" />
        <img src="/green-circle-light.svg" className="deco deco-two" />
        <img src="/green-circle-light.svg" className="deco deco-three" />
        <img src="/green-circle-dark.svg" className="deco deco-four" />
        <img src="/green-circle-light.svg" className="deco deco-five" />
        <img src="/green-circle-light.svg" className="deco deco-six" />
      </div>
    </div>
  </>
    )

}
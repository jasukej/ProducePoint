import React from "react"
import Form from 'react-bootstrap/Form';


export default function Login() {

    <InputGroup className="mb-3">

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

    <GoogleButton
                className="g-btn"
                type="dark"
                onClick={handleGoogleSignIn}
            />

    </InputGroup>       

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            await googleSignIn();
            navigate("/home");
        } catch (error) {
            console.log(error.message);
        }
        };

}
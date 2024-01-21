import React from "react"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';
import Signup from "../components/signup.jsx";


export default function RegistrationPage({userData, setUserData}) {

    return(
        <div className="regis-page">
            <img src="/title.svg" />
            <h1 className="title sans-serif">Reduce food insecurity, one tap at a time.</h1>
            <Signup />
        </div>
    )
    
}
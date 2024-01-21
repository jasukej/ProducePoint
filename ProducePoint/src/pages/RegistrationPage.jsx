import React from "react"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';
import Signup from "../components/signup.jsx";
import { useUserContext } from '../context/UserContext'


export default function RegistrationPage() {

    const { userData, updateUser } = useUserContext()

    return(
        <div className="regis-page">
          <img src="/title.svg" className="large-text-logo"/>
            <h1 className="title">Reduce food insecurity, one tap at a time.</h1>
            <Signup userData={userData} updateUser={updateUser} />
        </div>
    )
    
}
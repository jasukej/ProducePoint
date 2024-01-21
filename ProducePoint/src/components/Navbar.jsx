import React from "react"
import { Link } from 'react-router-dom';
import '../App.css'

export default function Navbar() {
    return (
    <nav className="navbar">
        <Link to ="/landing"><img src="/title.svg" className="logo"/></Link>
        <div className="navlinks">
            <Link to="/profile"> Profile </Link>
            <Link to="/settings"> Settings </Link>
            <Link to="/stock"> Stock </Link>
            <Link to="/requests"> Requests </Link>
        </div>
    </nav>
    )
}
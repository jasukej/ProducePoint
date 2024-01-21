import React from "react"

export default function Navbar() {
    return (
    <nav className="nav">
        <img src="../assets/Logo.png" />
        <div className="navlinks">
            <Link to="/profile"> Profile </Link>
            <Link to="/settings"> Settings </Link>
            <Link to="/stock"> Stock </Link>
            <Link to="/requests"> Requests </Link>
        </div>
    </nav>
    )
}
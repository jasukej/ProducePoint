import React from "react";
import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom';
import '../../App.css'

export default function Profile() {
    return (
        <div className="stock-page">
            <Navbar />
            <h1>Your Profile</h1>
        </div>
    )
}
import React from "react";
import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom';
import '../../App.css'

export default function Requests() {
    return (
        <div className="requests-page">
            <Navbar />
            <h1>Looking for something</h1>
        </div>
    )
}
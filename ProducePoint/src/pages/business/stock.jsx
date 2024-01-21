import React from "react";
import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom';
import '../../App.css'

export default function Stock() {
    return (
        <div className="stock-page">
            <Navbar />
            <h1>Your Stock</h1>
        </div>
    )
}
import React from "react";
import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom';
import '../../App.css'

export default function Settings() {
    return (
        <div className="settings-page">
            <Navbar />
            <h1>Settings</h1>
        </div>
    )
}
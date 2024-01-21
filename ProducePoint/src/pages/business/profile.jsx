import React from "react";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import RegistrationPage from "../RegistrationPage";

export default function Profile({userData}) {
  const [editableFields, setEditableFields] = useState({
    Name: false,
    email: false,
    password: false,
    address: false,
  });

  const handleEdit = (field) => {
    setEditableFields((prevFields) => ({
      ...prevFields,
      [field]: true,
    }));
  };

  const handleSave = (field) => {
    setEditableFields((prevFields) => ({
      ...prevFields,
      [field]: false,
    }));
    onEdit(userData);
  };

  const handleChange = (field, e) => {
    const { value } = e.target;
    onEdit({ ...userData, [field]: value });
  };

  return (
    <div className="stock-page">
      <Navbar />
      <h1>Your Profile</h1>

      <div className="profile-container">
        <div>
          <strong>Full Name:</strong>
          {editableFields.name ? (
            <input
              type="text"
              value={userData.name}
              onChange={(e) => handleChange("fullName", e)}
            />
          ) : (
            <span>{userData.name}</span>
          )}
          <button onClick={() => handleEdit("fullName")}>Edit</button>
          {editableFields.fullName && (
            <button onClick={() => handleSave("fullName")}>Save</button>
          )}
        </div>

        <div>
          <strong>Email:</strong>
          {editableFields.email ? (
            <input
              type="email"
              value={userData.email}
              onChange={(e) => handleChange("email", e)}
            />
          ) : (
            <span>{userData.email}</span>
          )}
          <button onClick={() => handleEdit("email")}>Edit</button>
          {editableFields.email && (
            <button onClick={() => handleSave("email")}>Save</button>
          )}
        </div>

        <div>
          <strong>Password:</strong>
          {editableFields.password ? (
            <input
              type="password"
              value={userData.password}
              onChange={(e) => handleChange("password", e)}
            />
          ) : (
            <span>{userData.password}</span>
          )}
          <button onClick={() => handleEdit("password")}>Edit</button>
          {editableFields.password && (
            <button onClick={() => handleSave("password")}>Save</button>
          )}
        </div>

        <div>
          <strong>Address:</strong>
          {editableFields.address ? (
            <textarea
              value={userData.address}
              onChange={(e) => handleChange("address", e)}
            />
          ) : (
            <span>{userData.address}</span>
          )}
          <button onClick={() => handleEdit("address")}>Edit</button>
          {editableFields.address && (
            <button onClick={() => handleSave("address")}>Save</button>
          )}
        </div>
      </div>
    </div>
  );
}

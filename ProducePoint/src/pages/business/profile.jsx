import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useState } from "react";
import "../../App.css";
import { useUserContext } from "../../context/UserContext";
import RegistrationPage from "../RegistrationPage";

export default function Profile() {
  const { userData, setUserData } = useUserContext();
  const [editableFields, setEditableFields] = useState({
    name: false,
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
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  return (
    <>
      <Navbar />
      <div className="profile-page page">
        <h1>Your Profile</h1>

        <div className="profile-container">
          <div className="profile-form-group">
            <strong className="profile-label">Full Name:</strong>
            {editableFields.name ? (
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={(e) => handleChange(e)}
              />
            ) : (
              <span>{userData.name}</span>
            )}
            <button onClick={() => handleEdit("name")}>Edit</button>
            {editableFields.name && (
              <button onClick={() => handleSave("name")}>Save</button>
            )}
          </div>

          <div className="profile-form-group">
            <strong className="profile-label">Email:</strong>
            {editableFields.email ? (
              <input
                type="email"
                value={userData.email}
                name="email"
                onChange={(e) => handleChange(e)}
              />
            ) : (
              <span>{userData.email}</span>
            )}
            <button onClick={() => handleEdit("email")}>Edit</button>
            {editableFields.email && (
              <button onClick={() => handleSave("email")}>Save</button>
            )}
          </div>

          <div className="profile-form-group">
            <strong className="profile-label">Password:</strong>
            {editableFields.password ? (
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={(e) => handleChange(e)}
              />
            ) : (
              <span>{userData.password}</span>
            )}
            <button onClick={() => handleEdit("password")}>Edit</button>
            {editableFields.password && (
              <button onClick={() => handleSave("password")}>Save</button>
            )}
          </div>

          <div className="profile-form-group">
            <strong className="profile-label">Address:</strong>
            {editableFields.address ? (
              <textarea
                value={userData.address}
                name="address"
                type="text"
                onChange={(e) => handleChange(e)}
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
      <Footer />
    </>
  );
}

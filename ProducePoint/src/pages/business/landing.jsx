import React from "react";
import Navbar from '../../components/Navbar'
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../../context/UserAuthContext";
import { Link } from 'react-router-dom';
import '../../App.css'

export default function LandingBusiness() {

  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <Navbar />
      <div className="p-4 box mt-3">
        <h1 id="hp">Hey there <span> {user && user.name} </span></h1>
        <h3>What do you have in store?</h3>
      </div>
      <div className="d-grid gap-2">
          <Button variant="primary" onClick={handleLogout}>
            Log out
          </Button>
      </div>
    </>
    )};

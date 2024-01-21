import React from "react";
import Navbar from '../../components/Navbar'
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../../context/UserAuthContext";

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
        Hey there <span> {user && user.name} </span>
      </div>
      <div className="d-grid gap-2">
          
          

          <Button variant="primary" onClick={handleLogout}>
            Log out
          </Button>

      </div>
    </>
    )};

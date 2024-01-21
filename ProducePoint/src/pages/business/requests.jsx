import React from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';

import "../../App.css";

async function updateLocation(user, position) {
  const response = await fetch(`http://127.0.0.1:5000/api/update?email=${user.email}&longitude=${position.coords.longitude}&latitude=${position.coords.latitude}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function locationError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    default:
      alert("An unknown error occurred.");
      break;
  }
}

export default function Requests() {
  const [distance, setDistance] = useState("");
  const [unit, setUnit] = useState("miles");
  const [currentLocation, setCurrentLocation] = useState({ latitude: null, longitude: null });

  const handleDistanceChange = (e) => {
      setDistance(e.target.value);
  };

  const handleUnitChange = (e) => {
      setUnit(e.target.value);
  };

  useEffect(() => {
      const auth = getAuth();
      const user = auth.currentUser;

      const locationOptions = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
      };

      const fetchLocation = () => {
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                  (position) => {
                      updateLocation(user, position);
                      setCurrentLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
                  },
                  locationError, 
                  locationOptions
              );
          } else {
              alert("Geolocation is not supported by this browser.");
          }
      };

      // Fetch location immediately and then every 30 seconds
      fetchLocation();
      const interval = setInterval(fetchLocation, 30000);

      // Clear the interval when the component is unmounted
      return () => clearInterval(interval);
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <>
    <Navbar />

    <div className="requests-page">
      
        <h1>Looking for something?</h1>
      <div className="request-box">
        <h3>Add item</h3>
        <div className="within-distance">
        <h4>Within</h4>
        <div >
          <label>
            <input
              type="text"
              value={distance}
              onChange={handleDistanceChange}
              placeholder="Enter distance"
              className="form-control"
            />
          </label>
        </div>
        </div>
        <label>
            <select value={unit} onChange={handleUnitChange} className="form-control unit-select">
              <option value="miles">Miles</option>
              <option value="km">Kilometers</option>
            </select>
        </label>

      <SearchBar latitude={currentLocation.latitude} longitude={currentLocation.longitude} max_distance={distance } className="searchBar form-control"/>



        <div>
            <h4 id="current-location">Your current location: </h4>
            <div id="coordinates">Latitude: {currentLocation.latitude}, Longitude: {currentLocation.longitude}</div>
        </div>
      
    </div>
    </div>
    </>
  );
}
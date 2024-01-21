import React from "react";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar";

import "../../App.css";

export default function Requests() {
  const [distance, setDistance] = useState("");
  const [unit, setUnit] = useState("miles");

  const handleDistanceChange = (e) => {
    setDistance(e.target.value);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  return (
    <div className="requests-page">
      <Navbar />
      <h1>Looking for something?</h1>

      <SearchBar />

      <div className="within-distance">
        <label>
          Within
          <input
            type="text"
            value={distance}
            onChange={handleDistanceChange}
            placeholder="Enter distance"
          />
        </label>

        <label>
          <select value={unit} onChange={handleUnitChange}>
            <option value="miles">Miles</option>
            <option value="km">Kilometers</option>
          </select>
        </label>

        <p>
          <h4>Your current location: </h4>
          <div> {/* User's current location*/} </div>
        </p>
      </div>
    </div>
  );
}

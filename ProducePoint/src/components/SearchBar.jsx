import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SearchBar({latitude, longitude, max_distance, units}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [produce, setProduce] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [names, setNames] = useState([]);
  const [locations, setLocations] = useState([]);
  const [distances, setDistances] = useState([]);

  if (units === "miles") {
    max_distance = max_distance * 1609.34;
  } else {
    max_distance = max_distance * 1000;
  }

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/request?latitude=${latitude}&longitude=${longitude}&produce=${searchTerm}&max_distance=${max_distance}`);
      const {quantities} = response.data;
      const {names} = response.data;
      const {locations} = response.data;
      const {distances} = response.data;
      setQuantities(quantities);
      setNames(names);
      setLocations(locations);
      setDistances(distances);
      setProduce(searchTerm);
    } catch (error) {
      console.error('Error searching items:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {names.map((name, index) => (
          <li key={index}>{name} has {quantities[index]} {produce} at {locations[index]} ({distances[index]} km) away</li>
        ))}
      </ul>
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SearchBar({latitude, longitude, max_distance, units}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [produce, setProduce] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [names, setNames] = useState([]);
  const [locations, setLocations] = useState([]);
  const [distances, setDistances] = useState([]);

  const [items, setItems] = useState([]);

  if (units === "miles") {
    max_distance = max_distance * 1609.34;
  } else {
    max_distance = max_distance * 1000;
  }
  
  const handleSearchChange = async (e) => {
    setSearchTerm(e);

    try {
      const response = await axios.get(`http://localhost:5000/api/findproduce?search=${e}`);
      const {produce} = response.data;
      setItems(produce);
      console.log(produce);
    } catch (error) {
      console.error('Error searching items:', error);
    }

    if (e == null || e === "") {
      setItems([]);
    }
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
    <div id="search-bar-container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder="Search..."
        className='search-bar'
      />
      <button onClick={handleSearch} id="request-button">Search</button>
      <h1>Items</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
        
      <h1>Search results</h1>
      <ul>
        {names.map((name, index) => (
          <li key={index}>{name} has {quantities[index]} {produce} at {locations[index]} ({distances[index]} km) away</li>
        ))}
      </ul>
    </div>
  );
};
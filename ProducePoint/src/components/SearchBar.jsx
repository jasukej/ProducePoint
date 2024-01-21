import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SearchBar({latitude, longitude, max_distance}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);
  const [produce, setProduce] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [names, setNames] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchItems = async () => { // I don't have this API yet
      try {
        const response = await axios.get('http://localhost:5000/api/getallproduce');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/request?latitude=${latitude}&longitude=${longitude}&produce=${searchTerm}&max_distance=${max_distance}`);
      const {quantites} = response.data;
      const {names} = response.data;
      const {locations} = response.data;
      setQuantities(quantites);
      setNames(names);
      setLocations(locations);
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
          <li>{name} has {quantities[index]} {produce} at {locations[index]}</li>
        ))}
      </ul>
    </div>
  );
};
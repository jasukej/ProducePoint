import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SearchBar({latitude, longitude, max_distance}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => { // I don't have this API yet
      try {
        const response = await axios.get('http://localhost:5000/api/getitems');
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
      setItems(response.data);
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
        {items.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};
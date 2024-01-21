import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import AddItem from "../../components/AddItem";
import StockDisplay from "../../components/StockDisplay";
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import "../../App.css";

export default function Stock() {
  const [stockItems, setStockItems] = useState([]);
  
  const handleAddItem = (newItem) => {
    setStockItems([...stockItems, newItem]);
  };

  // Load stock items from api
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    const fetchStock = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/getstock?email=${user.email}`);
        const {inventory} = response.data;
        setStockItems(inventory);
      } catch (error) {
        console.error('Error fetching stock:', error);
      }
    };

    fetchStock();
    const interval = setInterval(fetchStock, 30000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="stock">
    <div className="stock-page">
      <Navbar />
      <h1>Your Stock</h1>

      <AddItem onAddItem={handleAddItem} />

      <StockDisplay stockItems={stockItems} />
    </div>
    </div>
  );
}

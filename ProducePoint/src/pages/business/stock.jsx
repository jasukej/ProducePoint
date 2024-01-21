import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import AddItem from "../../components/AddItem";
import StockDisplay from "../../components/StockDisplay";
import "../../App.css";

export default function Stock() {
  const [stockItems, setStockItems] = useState([]);

  const handleAddItem = (newItem) => {
    setStockItems([...stockItems, newItem]);
  };

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

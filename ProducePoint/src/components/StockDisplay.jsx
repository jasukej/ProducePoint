import React, { useState } from "react";
import Button from "react-bootstrap/Button";

export default function StockDisplay ({ stockItems }) {
    return (
      <div>
        <h2>Stock Display</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {stockItems.map((item, index) => (
              <tr key={index}>
                <td>{item.productName}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>{item.unit}</td>
                <td>{item.expiryDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
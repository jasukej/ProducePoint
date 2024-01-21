import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

/* Maintain state of StockItems*/

export default function AddItem({ onAddItem }) {
  const [itemFormData, setItemFormData] = useState({
    productName: "",
    category: "",
    quantity: "",
    unit: "kg",
    expiryDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Updating form data
    setItemFormData({
      ...itemFormData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(itemFormData)

    // Updating stockItems array
    onAddItem({
      ...itemFormData
    });

    setItemFormData({
      productName: "",
      category: "",
      quantity: "",
      unit: "kg",
      expiryDate: "",
    });
  };

  return (
    <div>
      <div className="add-item-form">
        <h2>Add Item</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              name="productName"
              value={itemFormData.productName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              name="category"
              value={itemFormData.category}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter quantity"
              name="quantity"
              value={itemFormData.quantity}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="unit">
            <Form.Label>Unit</Form.Label>
            <Form.Control
              as="select"
              name="unit"
              value={itemFormData.unit}
              onChange={handleChange}
            >
              <option value="kg">kg</option>
              <option value="pieces">pieces</option>
              <option value="g">g</option>
              <option value="litres">litres</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="expiryDate">
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control
              type="date"
              name="expiryDate"
              value={itemFormData.expiryDate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add Item
          </Button>
        </Form>
      </div>
    </div>
  );
}

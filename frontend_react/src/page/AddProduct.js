import axios from "axios";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();
    const data = { title: title, price: price };
    await axios.post("http://localhost:8080/products", data);
    setDone(true);
  };

  {
    done && navigate("/");
  }

  return (
    <div className="container">
      <h1 className="mt-3">Add New Product</h1>

      <form className="mb-3" onSubmit={saveProduct}>
        <div className="mb-3">
          <label className="form-label">title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="text"
            className="form-control"
            id="price"
            placeholder="Enter Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-dark">
          Submit
        </button>
      </form>
    </div>
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [done, setDone] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const updateProduct = async (e) => {
    e.preventDefault();
    const data = { title: title, price: price };
    await axios.put(`http://localhost:8080/products/${id}`, data);
    setDone(true);
  };

  const getProductById = async () => {
    const response = await axios.get(`http://localhost:8080/products/${id}`);
    setTitle(response.data.title);
    setPrice(response.data.price);
  };

  useEffect(() => {
    getProductById();
  }, []);

  {
    done && navigate("/");
  }

  return (
    <div className="container">
      <h1 className="mt-3">Edit Product</h1>

      <form className="mb-3" onSubmit={updateProduct}>
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
          Update
        </button>
        <button
          type="submit"
          className="btn btn-danger mx-1"
          onClick={() => {
            setDone(true);
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

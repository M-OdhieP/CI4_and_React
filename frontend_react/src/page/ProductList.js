import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const result = await axios.get("http://localhost:8080/products");
    setProducts(result.data);
    setLoading(false);
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:8080/products/${id}`);
    getProducts();
  };

  console.log(products);
  return (
    <Container>
      <h1 className="mt-3">Product List</h1>
      <div className="d-flex justify-content-end">
        <Link to="/add" className="btn btn-dark mb-1">
          Add Product
        </Link>
      </div>
      <Outlet />

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={4}>loading ...</td>
            </tr>
          ) : (
            products.map((product, index) => {
              return (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                  <td>
                    <Link
                      to={`/edit/${product.id}`}
                      className="btn btn-light btn-sm rounded-1 mx-1"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-light btn-sm rounded-1 mx-1"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
    </Container>
  );
}

import "./App.css";
import Navigate from "./component/Navigate";
import ProductList from "./page/ProductList";
import AddProduct from "./page/AddProduct";

import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import EditProduct from "./page/EditProduct";

function App() {
  return (
    <div className="App">
      <Navigate />

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
      </Routes>
    </div>
  );
}

export default App;

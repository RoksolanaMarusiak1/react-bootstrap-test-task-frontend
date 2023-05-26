import "bootstrap/dist/css/bootstrap.min.css";

import { Route, Routes } from "react-router-dom";
import ProductList from "./pages/ProductList";
import "./App.scss";
import Reviews from "./pages/Reviews";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ProductList />}/>
        <Route path="/reviews" element={<Reviews />}/>
      </Routes>
    </div>
  );
}

export default App;

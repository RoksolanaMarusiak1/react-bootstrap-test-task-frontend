import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./ProductList.scss";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

import { ProductsData } from "../mock-tool/products";
const baseURL = "http://localhost:3030/products";

function ProductList() {
  const [products, setProducts] = useState(ProductsData);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setProducts(response.data);
    }).catch(error => console.log(error, 'Start json-server db'));
  }, []);

  return (
    <Container>
      <div className="d-flex flex-column mt-5 align-items-center">
        <p className="caption-text text-uppercase fs-6">
          The innovation leader in luxury vinyl plank
        </p>
        <p style={{ letterSpacing: 2 }} className="products-title fs-1">
          Let's Get Started
        </p>
      </div>
      <Row>
        {products?.map((product: any) => (
          <Col xs={3} className="mb-5" key={`${product.id}`}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-center align-items-center">
        <Link className="link" to={"/reviews"}>
          Rewiews
        </Link>
      </div>
    </Container>
  );
}

export default ProductList;

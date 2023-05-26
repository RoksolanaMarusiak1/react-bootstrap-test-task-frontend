import { useState } from "react";
import "./ProductCard.scss";
import { Card, Form, Row, Col } from "react-bootstrap";
import { Heart } from "react-bootstrap-icons";

type Product = {
  id: number;
  product_name: string;
  manufacturer: string;
  available: boolean;
  price: number;
  image: string;
  available_address?: string;
};

function ProductCard({ product }: { product: Product }) {
  const [showDetails, setShowDetails] = useState(false);

  function cardIsActive(event: React.MouseEvent<HTMLDivElement>) {
    event?.preventDefault();
    setShowDetails(true);
  }

  function cardIsNotActive(event: React.MouseEvent<HTMLDivElement>) {
    event?.preventDefault();
    setShowDetails(false);
  }
  return (
    <Card
      onMouseEnter={cardIsActive}
      onMouseLeave={cardIsNotActive}
      border="0"
      className="h-100 bg-white rounded-0"
    >
      {showDetails ? (
        <div
          className="hover-image d-flex flex-column align-self-center mt-3 justify-content-between"
          style={{
            backgroundImage: `url(${product.image})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            width: "90%",
            height: "90%",
          }}
        >
          <div className="d-flex flex-row justify-content-between">
            <div
              className="w-50 d-flex justify-content-center align-items-center"
              style={{ backgroundColor: `#116062` }}
            >
              <p className="text-white my-3">Shop by Room</p>
            </div>
            <Heart
              className="align-self-end mt-3 me-3"
              color="white"
              size={40}
            />
          </div>
          <Card.Text
            className="product-details mb-4 ms-3 text-white fs-3 text-decoration-underline"
            style={{
              textUnderlineOffset: "10px",
            }}
          >
            Product Details
          </Card.Text>
        </div>
      ) : (
        <Card.Img variant="top" src={product.image} />
      )}
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between">
          <Card.Title className="product-title font-weight-bold">
            {product.product_name}
          </Card.Title>
          <p className="product-price fs-5">
            {showDetails ? `$${product.price}` : `$$$`}
          </p>
        </div>
        <Card.Text className="manufacturer-text mb-2">
          {product.manufacturer}
        </Card.Text>
        <Row>
          <Col
            xs={8}
            className="d-flex justify-content-start align-items-center"
          >
            {product.available ? (
              <>
                <div className="available-circle"></div>
                <Card.Text style={{ fontSize: "12px" }}>
                  Available Now {product.available_address}
                </Card.Text>
              </>
            ) : (
              <>
                <div className="not-available-circle"></div>
                <Card.Text style={{ fontSize: "12px" }}>
                  Not Available
                </Card.Text>
              </>
            )}
          </Col>
          <Col xs={4}>
            <Form>
              <div className="compare d-flex align-items-center justify-content-center">
                <Form.Check.Label className="me-2" style={{ fontSize: "12px" }}>
                  Compare
                </Form.Check.Label>
                <Form.Check type={"checkbox"} />
              </div>
            </Form>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;

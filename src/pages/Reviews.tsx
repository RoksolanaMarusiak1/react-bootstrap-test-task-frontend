import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";
import "./Reviews.scss";
import ReviewForm from "../components/Reviews/ReviewForm";
import ReviewItem from "../components/Reviews/ReviewItem";
import {ReviewsData} from '../mock-tool/reviews';

const baseURL = "http://localhost:3030/reviews";

function Reviews() {
  const [reviews, setReviews] = useState(ReviewsData)
  const [formUpdated, setFormUpdated] = useState(false)

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setReviews(response.data);
    }).catch(function (error) {console.log(error)});
  }, [formUpdated]);

  return (
    <Container
      className="mw-100"
      fluid="sm"
      style={{ backgroundColor: "#e8ecee" }}
    >
      <Row className="d-flex justify-content-center align-items-center">
        <Col xs={6} className="mb-2">
          {reviews?.map((review: any) => (
            <Col className="mb-4" key={`${review.id}`}>
              <ReviewItem review={review} />
            </Col>
          ))}
          <div style={{ marginTop: "35px" }}>
            <hr />
          </div>
          <p
            style={{
              textUnderlineOffset: "5px",
              textDecoration: "underline grey",
            }}
            className="read-all text-uppercase mt-4 "
          >
            Read all reviews
          </p>
        </Col>
      </Row>
      <Row className="form-title d-flex justify-content-center align-items-center mt-5">
        <Col xs={6}>
          <p className="fs-2 fw-bold">Leave a Review</p>
          <p className="my-4">
            Your email address will not be published. Required fields are marked
            *
          </p>
          <ReviewForm setFormUpdated={setFormUpdated} />
        </Col>
      </Row>
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Link className="link" to={"/"}>
          Product List
        </Link>
      </div>
    </Container>
  );
}

export default Reviews;

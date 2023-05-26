import { useEffect, useState } from "react";
import "./ReviewForm.scss";
import { Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";

const baseURL = "http://localhost:3030/reviews";

function ReviewForm({ setFormUpdated }: { setFormUpdated: any }) {
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [isValidated, setIsValidated] = useState(false);

  const validate = (values: any) => {
    let errorsArray: any = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const phoneRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    if (!values.comment) {
      errorsArray.comment = "Cannot be blank";
    }
    if (!values.name) {
      errorsArray.name = "Cannot be blank";
    }
    if (!values.email) {
      errorsArray.email = "Cannot be blank";
    } else if (!regex.test(values.email)) {
      errorsArray.email = "Invalid email format";
    }
    if (values.phone && !phoneRegex.test(values.phone)) {
      errorsArray.phone = "Invalid phone format";
    }
    return errorsArray;
  };

  function validateForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors(validate({ comment, name, email, phone }));
    setIsValidated(true);
  }

  function submitForm() {
    axios.post(baseURL, {
      review: comment,
      reviewer_name: name,
      rating: 4,
      date: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })
    }).catch(error => {alert("You need to start json-server db");});
    setComment("");
    setName("");
    setEmail("");
    setPhone("");
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isValidated) {
      submitForm();
      setFormUpdated(true);
    }
  }, [errors]);

  return (
    <Form onSubmit={validateForm} className="review-container">
      <Row>
        <Col>
          <Form.Control
            className={`rounded-0 ${
              errors.comment ? "border-danger" : "border-secondary"
            } border-3`}
            as="textarea"
            placeholder="Comment *"
            rows={3}
            value={comment}
            onChange={(event) => {
              event.preventDefault();
              setComment(event.target.value);
            }}
          />
          {errors.comment && (
            <p className="text-danger mt-2">{errors.comment}</p>
          )}
        </Col>
      </Row>

      <Row className="g-2 my-3">
        <Col className="m-0">
          <Form.Control
            className={`review-form-input rounded-0 ${
              errors.name ? "border-danger" : "border-secondary"
            } border-3`}
            type="text"
            placeholder="Name *"
            value={name}
            onChange={(event) => {
              event.preventDefault();
              setName(event.target.value);
            }}
          />
          {errors.name && <p className="text-danger mt-2">{errors.name}</p>}
        </Col>
        <Col className="m-0 ms-4">
          <Form.Control
            className={`review-form-input rounded-0 ${
              errors.email ? "border-danger" : "border-secondary"
            } border-3`}
            type="email"
            placeholder="Email *"
            value={email}
            onChange={(event) => {
              event.preventDefault();
              setEmail(event.target.value);
            }}
          />
          {errors.email && <p className="text-danger mt-2">{errors.email}</p>}
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Control
            className={`review-form-input rounded-0 border-secondary
           border-3`}
            type="phone"
            placeholder="Phone (otional)"
            value={phone}
            onChange={(event) => {
              event.preventDefault();
              setPhone(event.target.value);
            }}
          />
          {errors.phone && <p className="text-danger mt-2">{errors.phone}</p>}
        </Col>
      </Row>
      <Row>
        <Col className="mt-3">
          <div className="d-flex align-items-center">
            <Form.Check type="checkbox" />
            <Form.Check.Label className="ms-2 fs-6 opacity-75">
              Save my name, email, and websie in this browser for the next time
              I comment
            </Form.Check.Label>
          </div>
        </Col>
      </Row>
      <Button
        style={{ backgroundColor: "#014546" }}
        className="submit-btn text-uppercase rounded-pill my-4 fs-6"
        size="lg"
        variant="primary"
        type="submit"
      >
        Post review
      </Button>
    </Form>
  );
}

export default ReviewForm;

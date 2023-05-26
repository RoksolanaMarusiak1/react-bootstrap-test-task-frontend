import { useState } from "react";
import "./ReviewItem.scss";
import { Container } from "react-bootstrap";
import { StarFill, Star } from "react-bootstrap-icons";

type Review = {
  id: number;
  reviewer_name: string;
  date: string;
  rating: number;
  review: string;
};

function ReviewItem({ review }: { review: Review }) {
  const [isReadMore, setIsReadMore] = useState(false);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  function initRating(rating: number) {
    const starArray = Array(rating).fill(
      <StarFill className="me-1" size={18} color="#014546" />
    );
    if (starArray.length < 5) {
      for (let i = 0; i < 5 - rating; i++) {
        starArray.push(<Star size={18} color="#014546" />);
      }
      return starArray;
    }
  }
  return (
    <Container className="mt-5 p-0">
      <p className="reviewer-name fs-2">{review.reviewer_name}</p>
      <p style={{ fontSize: 12, color: "gray" }}>{review.date}</p>
      <p> {initRating(review.rating)}</p>
      <p className="lh-base mt-4">
        {isReadMore
          ? review.review
          : `${review?.review?.slice(0, 350)}${
              review?.review?.slice(0, 350).length > 340 ? "..." : ""
            }`}
      </p>
      <p
        style={{
          textUnderlineOffset: "5px",
          textDecoration: "underline grey",
        }}
        onClick={toggleReadMore}
        className="read-or-hide text-uppercase"
      >
        {review?.review?.slice(0, 350).length > 340 && (
          <>{isReadMore ? " show less" : "read more"}</>
        )}
      </p>
    </Container>
  );
}

export default ReviewItem;

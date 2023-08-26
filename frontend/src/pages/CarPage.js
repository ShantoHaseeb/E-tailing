import React, { useEffect, useState } from "react";
import axios from "../axios";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import {
  Container,
  Row,
  Col,
  Badge,
  ButtonGroup,
  Form,
  Button,
  Card,
} from "react-bootstrap";
// import Card from 'react-bootstrap/Card';
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Load from "../components/Load";
import PreviewCar from "../components/PreviewCar";
import { useAddToCartMutation } from "../services/appApi";

function CarPage() {
  const { id } = useParams();
  console.log(1000, id);
  const user = useSelector((state) => state.user);
  const [car, setCar] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [addToCart, { isSuccess }] = useAddToCartMutation();
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [allReview, setAllReview] = useState([]);
  const [count, setCount] = useState(0);
  const handleDragStart = (e) => e.preventDefault();
  useEffect(() => {
    axios.get(`/furnitures/${id}`).then(({ data }) => {
      console.log(3, data);
      setCar(data.furniture);
      setSimilar(data.similar);
    });

    axios.get(`/review/getReview/${id}`).then(({ data }) => {
      console.log(2000, data);
      setAllReview(data.reviews);
    });
  }, [id]);
  console.log(2, car);
  if (!car) {
    return <Load />;
  }
  const responsive = {
    100: { items: 1 },
    300: { items: 2 },
  };
  const images = car.pictures.map((picture) => (
    <img
      className='product__carousel--image'
      src={picture.url || picture}
      onDragStart={handleDragStart}
    />
  ));

  let sameCar = [];
  if (similar) {
    sameCar = similar.map((car, idx) => (
      <div className='item' data-value={idx}>
        <PreviewCar {...car} />
      </div>
    ));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`/review/writeReview/${id}`, {
      rating,
      review,
    });
    setRating(1);
    setReview("");
    window.location.reload();
  };

  return (
    <Container className='pt-4' style={{ position: "relative" }}>
      <Row>
        <AliceCarousel
          mouseTracking
          items={images}
          controlsStrategy='alternative'
        />
      </Row>
      <Row>
        <h1>{car.model}</h1>
        <p>
          <Badge bg='primary'>{car.category}</Badge>
        </p>
        <p className='car_price'>৳{car.price}</p>
        <p style={{ textAlign: "justify" }} className='py-3'>
          <strong>Details:</strong> {car.details}
        </p>
        <p style={{ textAlign: "justify" }} className='py-3'>
          <strong>Specs:</strong> {car.specs}
        </p>
        <Button
          size='lg'
          onClick={() =>
            addToCart({
              userId: user._id,
              carId: id,
              price: car.price,
              image: car.pictures[0].url,
            })
          }
        >
          Add to cart
        </Button>
        {isSuccess}
      </Row>
      <Row>
        <h2>Similar Product</h2>
        <AliceCarousel
          mouseTracking
          items={sameCar}
          responsive={responsive}
          controlsStrategy='alternate'
        />
      </Row>
      <Row>
        <Form onSubmit={handleSubmit}>
          <h1 className='mt-3'>Write Review</h1>
          <Form.Group className='mb-3'>
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type='number'
              placeholder='Rating'
              value={rating}
              required
              onChange={(e) => setRating(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Review</Form.Label>
            <Form.Control
              as='textarea'
              placeholder='Your Review'
              style={{ height: "100px" }}
              value={review}
              required
              onChange={(e) => setReview(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Button type='submit'>Post Review</Button>
          </Form.Group>
        </Form>
      </Row>
      <Row>
        <h1 className='mt-3'>Reviews</h1>
        {allReview.map((item) => (
          <Card className='text-center'>
            <Card.Header>Rating: {item.rating}</Card.Header>
            <Card.Body>
              <Card.Title>Review Text</Card.Title>
              <Card.Text>{item.review}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
}

export default CarPage;

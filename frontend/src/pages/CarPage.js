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
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Load from "../components/Load";
import PreviewCar from "../components/PreviewCar";
import { useAddToCartMutation } from "../services/appApi";

function CarPage() {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [car, setCar] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [addToCart, { isSuccess }] = useAddToCartMutation();
  const handleDragStart = (e) => e.preventDefault();
  useEffect(() => {
    axios.get(`/furnitures/${id}`).then(({ data }) => {
      console.log(3, data);
      setCar(data.furniture);
      setSimilar(data.similar);
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
    </Container>
  );
}

export default CarPage;

import axios from "../axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCars } from "../features/carSlice";
import PreviewCar from "../components/PreviewCar";
import BodyTypes from "../BodyTypes";
import { Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./FrontPage.css";

function FrontPage() {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.car);
  const lastCars = cars.slice(0, 8);
  console.log(1, lastCars);
  useEffect(() => {
    axios.get("/furnitures").then(({ data }) => dispatch(updateCars(data)));
  }, []);
  return (
    <div>
      <div className='featured-products-container container mt-4'>
        <h2>Last Furnitures</h2>
        <div className='d-flex justify-content-center flex-wrap'>
          {lastCars.map((car) => (
            <PreviewCar {...car} />
          ))}
        </div>
        <h2>Furniture Types</h2>
        <Row>
          {BodyTypes.map((category) => (
            <LinkContainer to={`/category/${category.name}`}>
              <Col md={4}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`,
                    gap: "10px",
                  }}
                  className='category-tile'
                >
                  {category.name}
                </div>
              </Col>
            </LinkContainer>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default FrontPage;

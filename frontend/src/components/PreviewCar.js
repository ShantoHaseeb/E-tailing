import React from "react";
import { Badge, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function PreviewCar({ _id, category, model, pictures }) {
  return (
    <LinkContainer
      to={`/car/${_id}`}
      style={{ cursor: "pointer", width: "13rem", margin: "10px" }}
    >
      <Card style={{ width: "20rem", margin: "10px" }}>
        <Card.Img
          variant='top'
          className='product-preview-img'
          src={pictures[0].url || pictures[0]}
          style={{ height: "150px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{model}</Card.Title>
          <Badge bg='warning' text='dark'>
            {category}
          </Badge>
        </Card.Body>
      </Card>
    </LinkContainer>
  );
}

export default PreviewCar;

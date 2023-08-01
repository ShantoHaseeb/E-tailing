import axios from "../axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Load from "../components/Load";
import PreviewCar from "../components/PreviewCar";
import "./CategoryPage.css";
import Pagination from "../components/Pagination";
function CategoryPage() {
  const { category } = useParams();
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/furnitures/category/${category}`)
      .then(({ data }) => {
        setLoading(false);
        setCars(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.message);
      });
  }, [category]);

  if (loading) {
    <Load />;
  }

  const productsSearch = cars.filter((car) =>
    car.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function ProductSearch({ _id, category, model, pictures }) {
    return (
      <PreviewCar
        _id={_id}
        category={category}
        model={model}
        pictures={pictures}
      />
    );
  }

  return (
    <div className='category-page-container'>
      <div
        className={`pt-3 ${category}-banner-container category-banner-container`}
      >
        <h1 className='text-center'>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h1>
      </div>
      <div className='filters-container d-flex justify-content-center pt-4 pb-4'>
        <input
          type='search'
          placeholder='Search'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {productsSearch.length === 0 ? (
        <h1>No products to show</h1>
      ) : (
        <Container>
          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <Pagination
                data={productsSearch}
                RenderComponent={ProductSearch}
                pageLimit={1}
                dataLimit={5}
                tablePagination={false}
              />
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default CategoryPage;

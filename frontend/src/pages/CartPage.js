import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import "./CartPage.css";
import { Alert, Container, Row, Col, Table } from "react-bootstrap";
import { useRemoveFromCartMutation } from "../services/appApi";
import "./CartPage.css";
import CheckoutForm from "../components/CheakoutForm";

const stripePromise = loadStripe("pk_test_51N1qoDLz9oAnI5Z5We56gOZS28ZJW9Qzt2V9KU56bxhzrfIqwslVzyEPHuP926bLHoUzm3Oki7TmqgqYTPcFLXc200hRH9TywE");

function CartPage() {
    const user = useSelector((state) => state.user);
    const cars = useSelector((state) => state.car);
    const userCartObj = user.cart;
    let cart = cars.filter((car) => userCartObj[car._id] != null);
    const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();
    return (
        <Container style={{ minHeight: "95vh" }} className="cart-container">
            <Row>
                <Col>
                <h1 className="pt-2 h3">Shopping cart</h1>
                {cart.length == 0 ? 
                    (
                        <Alert variant="info">Shopping cart is empty. Add products to your cart</Alert>
                    ) : (
                        <Elements stripe={stripePromise}>
                            <CheckoutForm />
                        </Elements>
                    )}
                </Col>
                {cart.length > 0 && (
                    <Col md={5}>
                        <>
                            <Table responsive="sm" className="cart-table">
                                <thead>
                                    <tr>
                                        <th>&nbsp;</th>
                                        <th>Car</th>
                                        <th>Price</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item) => (
                                        <tr>
                                            <td>&nbsp;</td>
                                            <td>
                                                {!isLoading && <i className="fa fa-times" style={{ marginRight: 10, cursor: "pointer" }} onClick={() => removeFromCart({ carId: item._id, price: item.price, userId: user._id })}></i>}
                                                <img src={item.pictures[0].url} style={{ width: 100, height: 100, objectFit: "cover" }} />
                                            </td>
                                            <td>${item.price}</td>
                                            
                                            <td>${item.price * user.cart[item._id]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <div>
                                <h3 className="h4 pt-4">Total: ${user.cart.total}</h3>
                            </div>
                        </>
                    </Col>
                )}
            </Row>
        </Container>
    );
}

export default CartPage;
import { useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom';
import {useSelector } from "react-redux";
import {Row, Col, Button, ListGroup, Image, Card} from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps'

export default function PlaceOrderScreen(){
    const navigate = useNavigate()
    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        if(!cart.shippingAddress.address){
            navigate('/shipping')
        } else if (!cart.paymentMethod){
            navigate('/payment')
        }
    }, [cart.paymenMethod, cart.shippingAddress.address, navigate])

  return (
    <>
        <CheckoutSteps step1 step2 step3 step4/>
        <Row>
            <Col md={8}>
                col
            </Col>
            <Col md={4}>
                col
            </Col>
        </Row>
    </>
  )
}

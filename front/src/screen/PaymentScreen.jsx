import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {Form, Button, Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

import { savePaymentMethod } from "../slices/cartSlice";

export default function PaymentMethod(){
    const [paymentMethod, setPaymentMethod] = useState('Paypal');
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)
    const {shippingAddress} = cart;

    useEffect(() => {
        if(!shippingAddress){
            navigate('/shipping')
        }
    }, [shippingAddress, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }
    return(
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onClick={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type="radio"
                            className="my-2"
                            label='Paypal or credit card'
                            id="Paypal"
                            name="paymentMehtod"
                            value='Paypal'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}>
                        </Form.Check>

                        <Button type="submit" variant="primary">Continue</Button>
                    </Col>
                </Form.Group>
            </Form>
        </FormContainer>
    )
}
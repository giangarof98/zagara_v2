import {Link, useParams} from 'react-router-dom';
import {Row,Col,ListGroup,Image,Form,Button,Card} from 'react-bootstrap';

import Message from '../components/Message'
import Loader from '../components/Loader'

import {useGetOrderDetailsQuery} from '../slices/orderApiSlice'

export default function OrderScreen(){
    const {id:orderId} = useParams();
    const {data: order, refetch, isLoading, error} = useGetOrderDetailsQuery(orderId)
    console.log(order)

    return error ? <Loader/> : error ? <Message variant="danger" /> : (
        <>
            <h1>Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Name:</strong> {order.user.name}</p>
                        <p><strong>Email:</strong> {order.user.email}</p>
                        <p><strong>Address:</strong> 
                            {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                            {order.shippingAddress.postalCode},{' '}
                            {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? (
                            <Message variant='success'>
                                Delivered on {order.deliveredAt}
                            </Message>
                        ) : (
                            <Message variant='danger'>
                                Not Delivered
                            </Message>
                        )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        
                    </ListGroup.Item>
                </Col>



                <Col md={4}>Column</Col>
            </Row>
        </>
    )
}
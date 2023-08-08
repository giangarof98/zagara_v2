import {Link, useParams} from 'react-router-dom';
import {Row,Col,ListGroup,Image,Form,Button,Card} from 'react-bootstrap';

import Message from '../components/Message'
import Loader from '../components/Loader'

import {useGetOrderDetailsQuery} from '../slices/orderApiSlice'

export default function OrderScreen(){
    const {id:orderId} = useParams();
    const {data:order, refetch, isLoading, isError} = useGetOrderDetailsQuery(orderId)
    console.log(order)
    return (
        <>
            <h1>Order Screen</h1>
        </>
    )
}
// import { useEffect, useState } from 'react'
import {Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Product from '../components/Products.jsx'
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import { useParams } from 'react-router-dom';
import Paginate from '../components/Paginate.jsx';
import CarrouselProduct from '../components/CarrouselProduct.jsx';
// import axios from 'axios'

import { useGetProductsQuery } from '../slices/productApiSlice.js'

export default function HomeScreen(){
    const {pageNumber, keyword} = useParams()
    const {data, isLoading, error } = useGetProductsQuery({pageNumber, keyword});

    // const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         const {data} = await axios.get('/api/products');
    //         setProducts(data)
    //     };
    //     fetchProducts();
    // }, [])

    return(
        <>
            {!keyword ? <CarrouselProduct/> : <Link to='/' className='btn btn-light mb-4'>Go Back</Link>}
            {isLoading ? (<Loader/>) : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) : (<>
                <h1>Latest Products</h1>
                <Row>
                    {data.products.map((p) => (
                        <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={p}/>
                        </Col>
                    ))}
                </Row>
                <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''}/>
            
            </>)}
        </>
    )
}
import {Link} from 'react-router-dom'
import {Carousel, Image} from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'

import {useGetTopProductsQuery} from '../slices/productApiSlice'

export default function CarrouselProduct(){
    const {data:products, isLoading, error} = useGetTopProductsQuery()
    return isLoading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
        <Carousel pause='hover' className='bg-primary mb-4'>
            {products.map(product => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image src={product.image} alt={product.name} fluid/>
                        <Carousel.Caption>
                            <h2>{product.name} ${product.price}</h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}
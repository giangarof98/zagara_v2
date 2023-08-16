import { LinkContainer } from "react-router-bootstrap"
import {Table, Button, Row,Col} from 'react-bootstrap'
import {FaTimes, FaEdit, FaTrash} from 'react-icons/fa'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {toast} from 'react-toastify';
import { useGetProductsQuery, useCreateProductMutation } from "../../slices/productApiSlice"

export default function ProductListScreen(){
    const {data:products, isLoading, error, refetch} = useGetProductsQuery()
    const [createProduct, {isLoading: loadingCreate}] = useCreateProductMutation();

    const deleteHandler = (id) => {
        
    }

    const createProductHandler = async() => {
        if(window.confirm('Are you sure you want to create a new product?')){
            try {
                await createProduct();
                refetch()
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }

  return (
    <>
        <Row>
            <Col className="align-items-center">
                <h1>Products</h1>
            </Col>

            <Col className="text-end">
                <Button className="btn-sm m-3" onClick={createProductHandler}>
                    <FaEdit /> Create Product
                </Button>
            </Col>
        </Row>
        {loadingCreate && <Loader/>}
        {isLoading ? <Loader/> : error ? <Message variant='danger' /> : (
            <>
                <Table striped hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <th>{product._id}</th>
                                <th>{product.name}</th>
                                <th>{product.price}</th>
                                <th>{product.category}</th>
                                <th>{product.brand}</th>
                                <th>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant="light" className="btn-sm mx-2">
                                            <FaEdit/>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant="danger" className="btn-sm mx-2"
                                        onClick={() => deleteHandler(product._id)}>
                                        <FaTrash style={{color: 'white'}}/>
                                    </Button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </>
        )}
    </>
  )
}

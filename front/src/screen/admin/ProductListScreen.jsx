import { LinkContainer } from "react-router-bootstrap"
import { useParams } from "react-router-dom"
import {Table, Button, Row,Col} from 'react-bootstrap'
import {FaTimes, FaEdit, FaTrash} from 'react-icons/fa'
import Message from '../../components/Message'
import Paginate from '../../components/Paginate'
import Loader from '../../components/Loader'
import {toast} from 'react-toastify';
import { 
    useGetProductsQuery, 
    useCreateProductMutation, 
    useDeleteProductMutation 
} from "../../slices/productApiSlice"

export default function ProductListScreen(){
    const {pageNumber} = useParams()
    const {data, isLoading, error, refetch} = useGetProductsQuery({pageNumber});
    const [createProduct, {isLoading: loadingCreate}] = useCreateProductMutation();
    const [deleteProduct, {isLoading: loadingDelete}] = useDeleteProductMutation();

    const deleteHandler = async(id) => {
        if(window.confirm('Are you sure?'))
        try {
            await deleteProduct(id)
            toast.success('Product deleted successfully')
            refetch()
        } catch (err) {
            toast.error(err?.data?.message || err.message)
        }
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
        {loadingDelete && <Loader/>}
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
                        {data.products.map((product) => (
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
                <Paginate pages={data.pages} page={data.page} isAdmin={true}/>
            </>
        )}
    </>
  )
}


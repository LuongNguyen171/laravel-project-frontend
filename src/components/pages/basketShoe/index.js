import 'bootstrap/dist/css/bootstrap.min.css';
import ProductPagination from '../product/productPagination';
import { handleGetProductByStyleId } from '~/components/callAPI/product.api';
import { useEffect, useState } from 'react';

function BasketShoe() {
    const [arrayProduct, setArrayProduct] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const products = await handleGetProductByStyleId(3)
            setArrayProduct(products)
        }
        fetchData()
    }, [])

    return (<div>
        <ProductPagination productList={arrayProduct} />
    </div>);
}

export default BasketShoe;
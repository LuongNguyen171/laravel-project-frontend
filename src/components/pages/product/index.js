import classNames from 'classnames/bind';
import styles from './Product.module.scss';

import { getProducts } from '~/components/callAPI/product.api';
import ProductPagination from './productPagination';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);
function Product() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const productList = await getProducts()
            setProducts(productList)
        }
        fetchData()
    }, [])
    return (<div className={cx('wrapper')}>
        <ProductPagination productList={products} />
    </div>);
}

export default Product;
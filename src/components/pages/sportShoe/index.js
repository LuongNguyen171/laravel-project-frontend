import classNames from 'classnames/bind';

import 'bootstrap/dist/css/bootstrap.min.css';

import styles from './SportShoe.module.scss';
import ProductPagination from '../product/productPagination';
import { handleGetProductByStyleId } from '~/components/callAPI/product.api';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function SportShoe() {
    const [arrayProduct, setArrayProduct] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const products = await handleGetProductByStyleId(1)
            setArrayProduct(products)
        }
        fetchData()
    }, [])

    return (<div className={cx('wrapper')}>
        <ProductPagination productList={arrayProduct} />
    </div>);
}

export default SportShoe;
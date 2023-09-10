import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import ProductShow from '..';
import { useSelector } from 'react-redux/es/hooks/useSelector';

import styles from './ProductLayout.module.scss';
import { visibleItemsSelector } from '~/components/redux/selector';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function ProducLayout({ arrayProduct = [] }) {

    const itemsSelector = useSelector(visibleItemsSelector)
    const [visibleItems, setVisbleItems] = useState(8)

    const navigate = useNavigate()

    useEffect(() => {

        setVisbleItems(itemsSelector)
    }, [itemsSelector])


    return (<div className={cx('wrapper')}>
        <div className={cx('layout')}>
            {
                arrayProduct.slice(0, visibleItems).map((product, index) => (
                    <div className={cx('product')} key={index} onClick={() => navigate(`/detail/?productId=${product.productId}`)}>
                        <ProductShow productName={product.productName}
                            productImage={product.productImage}
                            productPrice={product.productPrice}
                            productDiscount={product.productDiscount} />

                    </div>
                ))
            }

        </div>

    </div>);
}

export default ProducLayout;
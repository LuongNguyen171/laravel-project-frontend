import classNames from 'classnames/bind';

import { useEffect, useState } from 'react';
import { limitproductName, formatProductPrice, handleAfDistcountPrice } from './productHandleMethod';
import styles from './ProductShow.module.scss';


const cx = classNames.bind(styles);
function ProductShow({ productName = '', productImage = '', productPrice = '', productDiscount }) {

    const [limitProductName, setLimitProductName] = useState('')
    const [formatPrice, setFormatPrice] = useState('')
    const [priceDiscount, setPriceAfDiscount] = useState('')

    useEffect(() => {
        const limitName = limitproductName(productName, 15)
        const affterFormatPrice = formatProductPrice(productPrice)
        const affterDiscountPrice = handleAfDistcountPrice(productPrice, productDiscount)

        setPriceAfDiscount(affterDiscountPrice)
        setFormatPrice(affterFormatPrice)
        setLimitProductName(limitName)
    }, [])

    return (<div className={cx('wrapper')}>

        <div className={cx('container')}>
            <div className={cx('container_image')}>

                <img src={productImage}></img>
                <div className={cx('brandNew')}>
                    <p className={cx('new_text')}>New</p>
                </div>
                <div className={cx('brandDiscount')}><p className={cx('discount_text')}>{`-${productDiscount}%`}</p></div>
            </div>
            <div className={cx('container_detail')}>
                <p className={cx('productName')}>{limitProductName}</p>
                <div className={cx('productPrice')}>
                    <p className={cx('price_real')}>{priceDiscount}</p>
                    <p className={cx('price_virtual')}>{formatPrice}</p>
                </div>
            </div>
        </div>
    </div>);
}

export default ProductShow;

import classNames from 'classnames/bind';

import styles from './ProductShowSmall.module.scss';

const cx = classNames.bind(styles);

function ProductShowSmall() {
    return (<div className={cx('container')}>
        <div className={cx('container_image')}>
            <img src='https://bizweb.dktcdn.net/thumb/large/100/415/502/products/6-1.jpg?v=1614679366400'></img>
        </div>
        <div className={cx('container_detail')}>
            <p className={cx('productName')}>GIÀY ULTRABOOST 21-...</p>
            <div className={cx('productPrice')}>
                <p className={cx('price_real')}>5.000.000đ</p>
                <p className={cx('price_virtual')}>6.000.0000</p>
            </div>
        </div>
    </div>);
}

export default ProductShowSmall;
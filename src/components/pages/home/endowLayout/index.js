import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
import { faFaceSmile, faPersonCircleCheck, faRotate, faThumbsUp, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classNames from 'classnames/bind';
import styles from './Endow.module.scss';


const cx = classNames.bind(styles);
function Endow() {
    return (<div className={cx('wrapper_endow')}>

        <div className={cx('endow')}>
            <div className={cx('container')}>
                <FontAwesomeIcon className={cx('icon')} icon={faProductHunt} />
                <div className={cx('content')}>
                    <p className={cx('content_header')}>10000+ Sản phẩm</p>
                    <p className={cx('content_descript')}>400+ Thương hiệu</p>
                </div>
            </div>
            <div className={cx('container')}>
                <FontAwesomeIcon className={cx('icon')} icon={faFaceSmile} />
                <div className={cx('content')}>
                    <p className={cx('content_header')}>2 Triệu khách hàng</p>
                    <p className={cx('content_descript')}>Tin tưởng mua sắm</p>
                </div>
            </div>
            <div className={cx('container')}>
                <FontAwesomeIcon className={cx('icon')} icon={faThumbsUp} />
                <div className={cx('content')}>
                    <p className={cx('content_header')}>Hàng chính hãng</p>
                    <p className={cx('content_descript')}>100% Chính hãng</p>
                </div>
            </div>
            <div className={cx('container')}>
                <FontAwesomeIcon className={cx('icon')} icon={faTruckFast} />
                <div className={cx('content')}>
                    <p className={cx('content_header')}>Giao hàng miễn phí</p>
                    <p className={cx('content_descript')}>Miễn phí nội thành</p>
                </div>
            </div>
            <div className={cx('container')}>
                <FontAwesomeIcon className={cx('icon')} icon={faRotate} />
                <div className={cx('content')}>
                    <p className={cx('content_header')}>Đổi hàng 07 ngày</p>
                    <p className={cx('content_descript')}>Hoàn thành miễn phí</p>
                </div>
            </div>
            <div className={cx('container')}>
                <FontAwesomeIcon className={cx('icon')} icon={faPersonCircleCheck} />
                <div className={cx('content')}>
                    <p className={cx('content_header')}>Khách víp</p>
                    <p className={cx('content_descript')}>Ưu đãi hấp dẫn</p>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Endow;
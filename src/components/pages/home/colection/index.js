import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import ProductShowSmall from '~/components/Layout/comps/product/productShowSmall';

import styles from './Colection.module.scss';
const cx = classNames.bind(styles);
function Colection() {
    return (<div className={cx('wrapper')}>
        <div className={cx('colection')}>
            <div className={cx('colection_intro')}>
                <img src='https://bizweb.dktcdn.net/100/415/502/themes/804563/assets/bg_only_item.png?1687425549056' className={cx('intro_img', 'animation-hover')}></img>
                <div className={cx('intro_content')}>
                    <div className={cx('describe')}>
                        <h3>GIÀY ULTRABOOST 21</h3>
                        <p className={cx('describe_text')}>Hàng loạt bản mẫu.
                            Hàng loạt cải tiến.
                            Hàng loạt thử nghiệm.
                            Đồng hành cùng chúng
                            tôi trên hành trình
                            tìm kiếm sự hòa hợp đỉnh
                            cao giữa trọng lượng,
                            sự êm ái và độ đàn hồi.
                            Ultraboost 21. Đón chào ...</p>
                        <div className={cx('describe_price')}>
                            <p className={cx('real')}>5.100.000đ</p>
                            <p className={cx('vitual')}>5.100.000đ</p>
                        </div>
                    </div>
                    <div className={cx('award')}>
                        <div className={cx('award_title')}>
                            <img src='//bizweb.dktcdn.net/100/415/502/themes/804563/assets/gift_g.png?1687425549056'></img>
                            <p>QUÀ TẶNG</p>
                        </div>
                        <div className={cx('award_items')}>
                            <div className={cx('item')}>
                                <FontAwesomeIcon className={cx('checkIcon')} icon={faCheck} />
                                <p className={cx('item_content')}><strong> MIỄN PHÍ</strong> giao hàng toàn quốc</p>
                            </div>
                            <div className={cx('item')}>
                                <FontAwesomeIcon className={cx('checkIcon')} icon={faCheck} />
                                <p className={cx('item_content')}> Tặng <strong>1 áo thun</strong> thời trang <strong>190k</strong></p>
                            </div>
                            <div className={cx('item')}>
                                <FontAwesomeIcon className={cx('checkIcon')} icon={faCheck} />
                                <p className={cx('item_content')}><strong>Giao ngay 2H</strong> tại <strong>Hà Nội</strong></p>
                            </div>
                            <div className={cx('item')}>
                                <FontAwesomeIcon className={cx('checkIcon')} icon={faCheck} />
                                <p className={cx('item_content')}> <strong> Không lấy quà vui lòng liên hệ</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('colection_product')}>
                <ProductShowSmall />
                <ProductShowSmall />
                <ProductShowSmall />
                <ProductShowSmall />
                <ProductShowSmall />

            </div>
        </div>
    </div>);
}

export default Colection;
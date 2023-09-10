import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);
function Footer() {
    return (<div className={cx('wrapper')}>
        <div className={cx('banner')}>
            <div className={cx('title')}>
                <h2>HỆ THỐNG CỬA HÀNG MEW SHOES TRÊN TOÀN QUỐC</h2>
                <button className={cx('showroom_btn')}>Hệ thống 10 showroom</button>
            </div>

        </div>
        <div className={cx('content')}>
            <div className={cx('body')}>

                <div className={cx('content_container')}>
                    <h3 className={cx('fontLager-Bottom')}>LIÊN HỆ</h3>
                    <div className={cx("infor")}>
                        <p>Địa chỉ :Ladeco Building, 266 Doi Can Street, <br />Ba Dinh District, Hanoi.</p>
                        <p>Email: support@sapo.vn</p>
                        <p>Số điện thoại: 1900 6750</p>
                    </div>

                    <div className={cx('contact_image')}>
                        <img className={cx('lazy')} src="//bizweb.dktcdn.net/100/415/502/themes/804563/assets/payment-1.png?1687425549056" data-src="//bizweb.dktcdn.net/100/415/502/themes/804563/assets/payment-1.png?1687425549056" alt="payment-1" />

                        <img className={cx('lazy')} src="//bizweb.dktcdn.net/100/415/502/themes/804563/assets/payment-2.png?1687425549056" data-src="//bizweb.dktcdn.net/100/415/502/themes/804563/assets/payment-2.png?1687425549056" alt="payment-2" />


                        <img className={cx('lazy')} src="//bizweb.dktcdn.net/100/415/502/themes/804563/assets/payment-3.png?1687425549056" data-src="//bizweb.dktcdn.net/100/415/502/themes/804563/assets/payment-3.png?1687425549056" alt="payment-3" />


                        <img className={cx('lazy')} src="//bizweb.dktcdn.net/100/415/502/themes/804563/assets/payment-4.png?1687425549056" data-src="//bizweb.dktcdn.net/100/415/502/themes/804563/assets/payment-4.png?1687425549056" alt="payment-4" />

                    </div>
                </div>

                <div className={cx('content_container')}>
                    <h3 className={cx('fontsmall')}>KÊNH BÁN HÀNG</h3>
                    <div className={cx("infor")}>
                        <p>Shoppe</p>
                        <p>Sendo</p>
                        <p>Zalo</p>
                        <p>Lazada</p>
                        <p>Tiki</p>
                    </div>
                </div>
                <div className={cx('content_container')}>
                    <h3 className={cx('fontsmall')}>TÌM HIỂU THÊM</h3>
                    <div className={cx("infor")}>
                        <p>Về Mew Shoes</p>
                        <p>Chương trình khuyến mãi</p>
                        <p>Hướng dẫn chọn size</p>
                        <p>Tin tức</p>
                    </div>
                </div>
                <div className={cx('content_container')}>
                    <h3 className={cx('fontsmall')}>CHÍNH SÁCH</h3>
                    <div className={cx("infor")}>
                        <p>Chính sách bán hàng</p>
                        <p>Chính sách hoàn hàng</p>
                        <p>Chính sách vận chuyển</p>
                        <p>Chính sách cộng tác viên</p>
                        <p>Chính sách bảo hành</p>
                    </div>
                </div>
                <div className={cx('content_container')}>
                    <h3 className={cx('fontsmall')}>SẢN PHẨM</h3>
                    <div className={cx("infor")}>
                        <p>Sản phẩm nổi bật</p>
                        <p>Bộ sưu tập mới</p>
                        <p>Bộ sưu tập 2020</p>
                        <p>Sản phẩm bán chạy</p>
                        <p>Sản phẩm khuyến mãi</p>
                    </div>
                </div>
            </div>
            <div className={cx('footer_copyRight')}>
                <p>© Bản quyền thuộc về MewTheme. Cung cấp bởi Sapo.</p>
            </div>
        </div>
    </div>);
}

export default Footer;
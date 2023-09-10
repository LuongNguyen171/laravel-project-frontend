import classNames from 'classnames/bind';
import styles from './ProductsCarousels.module.scss';
import './Product.css'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay'
import ProductShow from '~/components/Layout/comps/product';
import { useNavigate } from 'react-router-dom';


const cx = classNames.bind(styles);

function ProductCarousels({ arrayProduct = [] }) {


    // useEffect(() => {
    //     console.log(arrayProduct)
    // })
    const navigate = useNavigate()
    return (<div className={cx('wrapper')}>
        <div className={cx('carousel')}>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={20}
                slidesPerView={5}
                navigation
                // pagination={{ clickable: true }}
                // scrollbar={{ draggable: true }}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
            >
                {
                    arrayProduct.map((product) => (
                        <SwiperSlide key={product.productId} onClick={() => navigate(`/detail/?productId=${product.productId}`)}>
                            <div >
                                <ProductShow
                                    productName={product.productName}
                                    productImage={product.productImage}
                                    productPrice={product.productPrice}
                                    productDiscount={product.productDiscount} />

                            </div>
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </div>
    </div>);
}

export default ProductCarousels;
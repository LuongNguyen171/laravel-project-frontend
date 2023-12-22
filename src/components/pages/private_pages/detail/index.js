import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'


import { faCaretRight, faCartShopping, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import styles from './Detail.module.scss';
import { getProducts, handleGetAllProductImageById, handleGetProductById } from '~/components/callAPI/product.api';
import { formatProductPrice, handleAfDistcountPrice } from '~/components/Layout/comps/product/productHandleMethod';
import addToCart from './addToCart';
import { useDispatch } from 'react-redux';
import { quantityCartReducer } from '~/components/redux/reducers/quantityCartReducer';
import ProductCarousels from '../../home/productsCarousels';
import TitleLayout from '../../home/titleLayout';

const cx = classNames.bind(styles);

function Detail() {

    const url = new URL(window.location.href);
    const productId = url.searchParams.get('productId');

    const [quantity, setQuantity] = useState(1)
    const [isContentInForView, setIsContentInForView] = useState(false)
    const [isContentIntroView, setIsContentIntroView] = useState(false)
    const [arrayProducts, setArrayProduct] = useState([])

    const dispath = useDispatch()

    const [arrayImage, setArrayImage] = useState([])
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [productInfor, setProductInfor] = useState({})
    const [selectedSize, setSelectedSize] = useState('38')

    const swiperRef = useRef(null);

    const changeInForState = () => {

        setIsContentInForView(!isContentInForView)
    }
    const changeIntroState = () => {

        setIsContentIntroView(!isContentIntroView)
    }


    const handleImageClick = (imageId, index) => {
        setArrayImage((prevImages) =>
            prevImages.map((image) => ({
                ...image,
                isSelected: image.imageId === imageId,
            })

            )
        );
        setActiveImageIndex(index);

    };

    const handleDecrese = () => {
        setQuantity(quantity - 1)
        if (quantity === 1) {

            setQuantity(1)

        }
    }
    const handleIncrese = () => {
        setQuantity(quantity + 1)
    }

    const handlePaginationIndexChange = () => {

        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideTo(activeImageIndex); // Di chuyển tới slide mới
        }
    };

    const updateQuantityCart = (quantity) => {
        const prevQuantity = JSON.parse(localStorage.getItem('quantityNotice'));
        const totalQuantity = quantity + prevQuantity
        localStorage.setItem('quantityNotice', JSON.stringify(totalQuantity))

        dispath(quantityCartReducer.actions.QUANTITY_CART_REDUCER(totalQuantity))
    }

    useEffect(() => {

        handlePaginationIndexChange()

    }, [activeImageIndex])

    useEffect(() => {

        async function fetchData() {
            const arrayImages = await handleGetAllProductImageById(productId)
            const proInfor = await handleGetProductById(productId)

            if (arrayImages === null) {
                console.error("API trả về null");
                return;
            }
            setArrayImage(arrayImages)
            setProductInfor(proInfor)
        }
        const handleGetProducts = async () => {
            try {
                const products = await getProducts()
                setArrayProduct(products)

            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
        handleGetProducts()
    }, [])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('detail')}>
                <div className={cx('detail_images')}>

                    {
                        arrayImage !== null ? (
                            <Swiper
                                ref={swiperRef}
                                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                                spaceBetween={20}
                                slidesPerView={1}
                                navigation
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 3000, disableOnInteraction: false }}
                                onSlideChange={(swiper) => setActiveImageIndex(swiper.realIndex)}
                            >
                                {

                                    arrayImage.map((image, index) => (
                                        <SwiperSlide key={image.imageId}
                                        >
                                            <img className={cx('image_shoe')}
                                                src={image.productImage}
                                                onClick={() => handleImageClick(image.imageId, index)}
                                            ></img>
                                        </SwiperSlide>
                                    ))
                                }

                            </Swiper>
                        ) : (<p>Không có dữ liệu</p>)
                    }
                    {/* <Swiper
                    ref={swiperRef}
                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    onSlideChange={(swiper) => setActiveImageIndex(swiper.realIndex)}
                >
                    {
                       
                        arrayImage.map((image, index) => (
                            <SwiperSlide key={image.imageId}
                            >
                                <img className={cx('image_shoe')}
                                    src={image.productImage}
                                    onClick={() => handleImageClick(image.imageId, index)}
                                ></img>
                            </SwiperSlide>
                        ))
                        }

                </Swiper> */}
                    <div className={cx('detail_imagesBottom')}>
                        {
                            arrayImage.map((image, index) => (
                                <div className={cx('container_image', { 'selected-image': image.isSelected })} key={image.imageId}
                                    onClick={() => handleImageClick(image.imageId, index)}>
                                    <img className={cx('image_shoe')} src={image.productImage}></img>
                                </div>
                            ))
                        }

                    </div>

                </div>
                <div className={cx('detail_content')}>
                    <h2> {productInfor.productName}</h2>
                    <div className={cx('content_infor')}>
                        <p className={cx('stocking')}>{productInfor.productStatus ? 'Còn hàng' : 'Hết hàng'}</p>
                        <div className={cx('trademark')}>
                            <p className={cx('infor_label')}>Thương hiệu :</p>
                            <p className={cx('infor_name')}>{productInfor.productTmName}</p>
                        </div>
                        <div className={cx('type')}>
                            <p className={cx('infor_label')}>Loại :</p>
                            <p className={cx('infor_name')}>Giày thể thao</p>
                        </div>
                        <div className={cx('size')}>
                            <p className={cx('size_label')}>Kích thước :</p>
                            <div className={cx('size_label_radios')}>
                                {['38', '39', '40', '41'].map((size) => (
                                    <div className={cx('radio_container',
                                        { 'border-active': size === selectedSize })}
                                        key={size}
                                        onClick={() => setSelectedSize(size)}>

                                        <input type={'radio'}
                                            className={cx('radio_input')}
                                            checked={selectedSize === size} value={size} />
                                        <label className={cx('radio_value')}>{size}</label>
                                        <div className={cx('radio_check')}>
                                            <FontAwesomeIcon className={cx('iconCheck')} icon={faCheck} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={cx('price')}>
                            <FontAwesomeIcon icon={faCaretRight} />
                            <p className={cx('price_label')}>Giá :</p>
                            <p className={cx('price_real')}>{handleAfDistcountPrice(productInfor.productPrice, productInfor.productDiscount)}</p>
                            <p className={cx('price_virtual')}>{formatProductPrice(productInfor.productPrice)}</p>
                        </div>
                        <div className={cx('buyButton', 'hover-animation')}>
                            <FontAwesomeIcon icon={faCartShopping} className={cx('icon_shopping')} />
                            <p className={cx('buyButton_label')} onClick={() => {
                                addToCart(productInfor, quantity);
                                updateQuantityCart(quantity)
                                // dispathQuantity(quantity)
                            }}>MUA HÀNG</p>
                            <div className={cx('buyButton_quantity')}>
                                <p className={cx('decrease_icon')} onClick={handleDecrese}>-</p>
                                <p className={cx('buy_counter')}>{quantity}</p>
                                <p className={cx('increase_icon')} onClick={handleIncrese}>+</p>
                            </div>

                        </div>
                        <p className={cx('size_option_derection')}>+ Xem hướng dẫn chọn size</p>
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
                        <div className={cx('productView')}>
                            <div className={cx('view_item')} onClick={changeInForState}>
                                <div className={cx('view_item_title')}>
                                    <p className={cx('view_item__label')}>Thông tin sản phẩm</p>
                                    <p className={cx('view_item__couter')} >{isContentInForView ? '-' : '+'}</p>

                                </div>
                                {
                                    isContentInForView ?
                                        (productInfor.productInfor != null ?
                                            (<p className={cx('view_item_content', 'visible')} >
                                                {productInfor.productInfor}</p>) :
                                            (<p className={cx('view_item_content', 'visible', 'data-none')} >
                                                Không có dữ liệu</p>))


                                        : (<p className={cx('view_item_content', 'hidden')} >
                                            {productInfor.productInfor}</p>)
                                }

                            </div>
                            <div className={cx('view_item')} onClick={changeIntroState}>
                                <div className={cx('view_item_title')}>
                                    <p className={cx('view_item__label')}>Giới thiệu sản phẩm</p>
                                    <p className={cx('view_item__couter')} >{isContentIntroView ? '-' : '+'}</p>
                                </div>
                                {
                                    isContentIntroView ?
                                        (productInfor.productIntro != "" ?
                                            (<p className={cx('view_item_content', 'visible')} >
                                                {productInfor.productIntro}</p>) :
                                            (<p className={cx('view_item_content', 'visible', 'data-none')} >
                                                Không có dữ liệu</p>))
                                        : (<p className={cx('view_item_content', 'hidden')} >
                                            {productInfor.productIntro}</p>)
                                }

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className={cx('productCaroursel')}>
                <TitleLayout titleName={'SẢN PHẨM KHÁC'} />
                <ProductCarousels arrayProduct={arrayProducts} />
            </div>
        </div >

    );
}

export default Detail;
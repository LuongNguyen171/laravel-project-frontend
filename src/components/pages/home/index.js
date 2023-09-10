import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { getProducts, handleGetTop10HighestPrice, handleGetTop10SoldOut } from '~/components/callAPI/product.api';
import ProducLayout from '~/components/Layout/comps/product/productLayout';
import Banner from '~/components/Layout/comps/slide/baner';
import Colection from './colection';
import Endow from './endowLayout';
import { useDispatch } from 'react-redux';

import styles from './Home.module.scss';
import ProductCarousels from './productsCarousels';
import StyleShoes from './styleShoesLayout';
import TitleLayout from './titleLayout';
import { visibleItems } from '~/components/redux/reducers/visibleItemsReducer';
import { handleGetPersonalInformation, handleLoginGoogle } from '~/components/callAPI/auth.api';


const cx = classNames.bind(styles);
function Home() {

    const dispath = useDispatch()

    const [arrayProducts, setArrayProducts] = useState([])
    const [arrayProductSoldOut, setArrayProductSoldOut] = useState([])
    const [arrayProductHighestPrice, setArrayProductHighestPrice] = useState([])

    const [visibleItemsPr, setVisbleItemsPr] = useState(8)

    const showMoreItems = () => {
        setVisbleItemsPr(preVisbleItems => preVisbleItems + visibleItemsPr)
    }

    useEffect(() => {
        dispath(visibleItems.actions.VISIBLE_ITEMS(visibleItemsPr))

    }, [visibleItemsPr])

    useEffect(() => {
        const fetchData = async () => {

            try {
                const fetchProductSoldOut = await handleGetTop10SoldOut()
                const fetchProductHighestPrice = await handleGetTop10HighestPrice()
                const fetchProducts = await getProducts()

                // console.log(fetchProductSoldOut)
                setArrayProducts(fetchProducts)
                setArrayProductSoldOut(fetchProductSoldOut)
                setArrayProductHighestPrice(fetchProductHighestPrice)
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
            // save user information in the local storage
            const userInFormation = await handleGetPersonalInformation()
            if (userInFormation) {
                localStorage.setItem('userInFormation', JSON.stringify(userInFormation.userInformation))
            }
        }
        fetchData()
        handleLoginGoogle()
    }, [])

    return (<div className={cx('wrapper')}>
        <Banner />
        <Endow />
        <StyleShoes />
        <div className={cx('layout_carousels')}>
            <div className={cx('attractive_layout')}>
                <TitleLayout titleName={'SẢN PHẨM NỔI BẬT'} />
                <ProductCarousels arrayProduct={arrayProductHighestPrice} />

            </div>
            <div className={cx('bestSell_layout')}>
                <TitleLayout titleName={'BÁN CHẠY NHẤT 2023'} />
                <ProductCarousels arrayProduct={arrayProductSoldOut} />
                <div className={cx('m-about')}>
                    <div className={cx('contaner')}>
                        <div className={cx('prev', 'hover-animation')}>
                            <img src='https://bizweb.dktcdn.net/100/415/502/themes/804563/assets/m_bn_2_1.jpg?1687425549056'></img>
                        </div>
                        <div className={cx('middle', 'hover-animation')}>
                            <img src='https://bizweb.dktcdn.net/100/415/502/themes/804563/assets/m_bn_2_2.jpg?1687425549056'></img>
                        </div>
                        <div className={cx('last', 'hover-animation')}>
                            <img src='https://bizweb.dktcdn.net/100/415/502/themes/804563/assets/m_bn_2_3.jpg?1687425549056'></img>
                        </div>
                    </div>

                </div>

                <div className={cx('colection')}>
                    <TitleLayout titleName={'BỘ SƯU TẬP ULTRABOOST'} />
                    <Colection />
                </div>
                <div className={cx('sneaker')}>
                    <TitleLayout titleName={'SNEAKER THƯƠNG HIỆU'} />
                    <div className={cx('type')}>
                        <div className={cx('items')}>
                            <div className={cx('item_t')}>
                                <p>VAN</p>
                            </div>
                            <div className={cx('item_t')}>
                                <p>NIKE</p>
                            </div>
                            <div className={cx('item_t')}>
                                <p>NEW BALNCE</p>
                            </div>
                            <div className={cx('item_t')}>
                                <p>CLARKS</p>
                            </div>

                        </div>
                    </div>
                    <div className={cx('productLayout')}>
                        <ProducLayout arrayProduct={arrayProducts} itemsPerpage={8} />

                        {

                            visibleItemsPr < arrayProducts.length &&
                            <button className={cx('showmores')} onClick={showMoreItems}>XEM THÊM
                                <FontAwesomeIcon className={cx('icon')} icon={faChevronDown} />

                            </button>
                        }
                    </div>

                </div>
            </div>
        </div>
    </div>);
}

export default Home;
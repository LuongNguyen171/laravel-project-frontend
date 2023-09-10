
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { convertPriceToFloat, handleAfDistcountPrice, limitproductName } from '~/components/Layout/comps/product/productHandleMethod';
import { quantityCartReducer } from '~/components/redux/reducers/quantityCartReducer';
import styles from './Cart.module.scss';


const cx = classNames.bind(styles);
function Cart() {
    const [cartData, setCartData] = useState([])
    const [validData, setValidData] = useState(false)
    const [quantityCart, setQuantityCart] = useState(0)

    const dispath = useDispatch()
    const navigate = useNavigate()



    const calculateTotalPrice = () => {
        let total = 0;
        for (const product of cartData) {
            const priceString = handleAfDistcountPrice(product.productPrice,
                product.productDiscount, product.quantity)

            const price = convertPriceToFloat(priceString)

            total += price;
        }

        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        });

        return formatter.format(total);
    };

    const sumQuantity = () => {
        let sum = 0;
        for (const product of cartData) {
            sum += product.quantity
        }
        if (quantityCart !== sum) {
            setQuantityCart(sum)
        }
        return sum

    }

    useEffect(() => {

        localStorage.setItem('quantityNotice', sumQuantity());

        const quantity = JSON.parse(localStorage.getItem('quantityNotice'))

        dispath(quantityCartReducer.actions.QUANTITY_CART_REDUCER(quantity))

    }, [sumQuantity()])


    const addQuantityCart = (product) => {
        const cart = JSON.parse(localStorage.getItem('cartShoeProject')) || [];

        const existingItemIndex = cart.findIndex(item => item.productId === product.productId);

        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity++;
        } else {
            return;
        }

        localStorage.setItem('cartShoeProject', JSON.stringify(cart));

        const storeCartData = localStorage.getItem('cartShoeProject')
        setCartData(JSON.parse(storeCartData))

    }

    const subQuantityCart = (product) => {
        const cart = JSON.parse(localStorage.getItem('cartShoeProject')) || [];
        const existingItemIndex = cart.findIndex(item => item.productId === product.productId);

        if (existingItemIndex !== -1) {

            cart[existingItemIndex].quantity--;

            if (cart[existingItemIndex].quantity <= 1) {
                cart[existingItemIndex].quantity = 1
            }

        } else {

            return;
        }

        localStorage.setItem('cartShoeProject', JSON.stringify(cart));

        const storeCartData = localStorage.getItem('cartShoeProject')
        setCartData(JSON.parse(storeCartData))

    }

    const deleteCartData = (product) => {
        const cart = JSON.parse(localStorage.getItem('cartShoeProject'));
        const updatedCart = cart.filter(item => item.productId !== product.productId)

        setCartData(updatedCart)
        localStorage.setItem('cartShoeProject', JSON.stringify(updatedCart))
    }

    useEffect(() => {
        const storeCartData = localStorage.getItem('cartShoeProject')
        if (storeCartData) {

            setCartData(JSON.parse(storeCartData))
            setValidData(true)

            console.log(JSON.parse(storeCartData).length)

            if (JSON.parse(storeCartData).length > 0) {


            } else {
                setValidData(false)
                // window.location.reload();
            }
        }

    }, [])

    return (<div className={cx('wrapper')}>
        {
            validData ? (<div className={cx('cart_container')}>
                <div className={cx('Items')}>
                    {
                        cartData.map((product, index) => (
                            <div className={cx('product_item')} key={index}>
                                <img src={product.productImage}></img>

                                <div className={cx('content')}>

                                    <div className={cx('product_Title')}>
                                        <h2 className={cx('product_name')}>
                                            {limitproductName(product.productName, 25)}</h2>
                                        <p className={cx('product_priceTotal')}>{handleAfDistcountPrice(product.productPrice,
                                            product.productDiscount, product.quantity)}</p>

                                    </div>
                                    <p className={cx('product_price')}>Giá :
                                        {handleAfDistcountPrice(product.productPrice,
                                            product.productDiscount)}</p>

                                    <div className={cx('product_footer')}>
                                        <div className={cx('footer_quantity')}>
                                            <button className={cx('sub')} onClick={() => { subQuantityCart(product) }}>-</button>
                                            <p className={cx('quantity')} >{product.quantity}</p>
                                            <button className={cx('add')} onClick={() => { addQuantityCart(product) }}>+</button>
                                        </div>
                                        <button className={cx('btn_delete')} onClick={() => deleteCartData(product)}>Xoá</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>

                <div className={cx('pay')}>
                    <div className={cx('pay_SumContainer')}>
                        <h2 className={cx('sum_label')}>Tổng</h2>
                        <p className={cx('sum_price')}>{calculateTotalPrice()}</p>
                    </div>
                    <button className={cx('pay_btn')} onClick={() => navigate('/bill/create-bill')}>Thanh toán</button>
                </div>

            </div>) : (<h1 className={cx('none_data')}>Không có dữ liệu</h1>)
        }

    </div>);
}

export default Cart;
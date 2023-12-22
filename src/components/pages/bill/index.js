import classNames from 'classnames/bind';
import styles from './Bill.module.scss';

import 'bootstrap/dist/css/bootstrap.min.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMoneyBill1, faUser } from '@fortawesome/free-regular-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { convertPriceToFloat, handleAfDistcountPrice, limitproductName, formatProductPrice } from '~/components/Layout/comps/product/productHandleMethod';
import moment from 'moment';
import { createBill, handleSendPorductOder } from '~/components/callAPI/bill.api';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { handleGetPersonalInformation, handleUpdateUserInformation } from '~/components/callAPI/auth.api';

const cx = classNames.bind(styles);
function Bill() {

    const [emailCustomer, setEmailCustomer] = useState('')
    const [phoneCustomer, setPhoneCustomer] = useState('')
    const [addressCustomer, setAddressCustomer] = useState('')
    const [nameCustomer, setNameCustomer] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [isOrder, setIsOrder] = useState(false)
    const handleCloseModal = () => setShowModal(false)
    const handleShowModal = () => setShowModal(true)

    const [arrayProductOrder, setArayProductOrder] = useState([])
    const arrayProductCart = JSON.parse(localStorage.getItem('cartShoeProject'))

    const { token } = JSON.parse(localStorage.getItem('accessToken'))


    const navigate = useNavigate()

    const calculateTotalPrice = (feeShip = 0) => {
        let total = 0;
        for (const product of arrayProductOrder) {
            const priceString = handleAfDistcountPrice(product.productPrice,
                product.productDiscount, product.quantity)

            const price = convertPriceToFloat(priceString)
            total += price;
        }
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        });

        total += feeShip
        return formatter.format(total);
    };

    const getDatePurchase = () => {
        const currentTime = moment().format('YYYY-MM-DD');
        return currentTime
    }
    const sendProductOrder = async () => {
        await handleSendPorductOder(emailCustomer, nameCustomer)
    }

    const handleCreateBill = async () => {

        for (const product of arrayProductOrder) {

            try {

                if (emailCustomer
                    && nameCustomer
                    && phoneCustomer
                    && addressCustomer
                    && product.productId
                    && product.quantity) {

                    const response = await createBill(
                        emailCustomer,
                        nameCustomer,
                        phoneCustomer,
                        addressCustomer,
                        product.productId,
                        product.quantity,
                        getDatePurchase())

                    await handleUpdateUserInformation(phoneCustomer, addressCustomer, emailCustomer)
                    setIsOrder(true)
                }

            } catch (error) {
                console.log('tạo bill thất bại')

                setIsOrder(false)
            }
        }

    }

    useEffect(() => {
        setArayProductOrder(arrayProductCart)
        // console.log('email: ', emailCustomer)
    }, [emailCustomer])



    useEffect(() => {
        const getUserInfo = async () => {
            if (token) {
                try {
                    const userInfor = await handleGetPersonalInformation(token);
                    console.log('userinfo: ', userInfor);

                    if (userInfor) {
                        setNameCustomer(userInfor.userName);
                        setEmailCustomer(userInfor.userEmail);
                        setPhoneCustomer(userInfor.userPhoneNumber);
                        setAddressCustomer(userInfor.userAddress);
                    }
                } catch (error) {
                    console.error('Error fetching user information:', error);
                }
            }
        };

        getUserInfo();
    }, [token]);

    useEffect(() => {
        if (isOrder) {
            sendProductOrder()
            console.log('is order: ', isOrder)
        }
    }, [isOrder])

    return (<div className={cx('wrapper')}>
        <div className={cx('bill_container')}>

            <div className={cx('forms')}>
                <div className={cx('form_inForCustomer')}>
                    <img className={cx('logo')} src='https://bizweb.dktcdn.net/100/415/502/themes/804563/assets/logo.png?1687425549056'></img>
                    <div className={cx('customer_header', 'ds-between')}>

                        <h3>Thông tin nhận hàng</h3>
                        <i className={cx('user')} onClick={() => navigate('/login')}>
                            <FontAwesomeIcon icon={faUser} className={cx('user_icon')} />
                            <p>Đăng nhập</p>
                        </i>
                    </div>
                    <div className={cx('input_container')}>

                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email"
                            className={cx('input_element')}
                        >
                            <Form.Control
                                className={cx('input_control')}
                                type="email" placeholder="Email"
                                value={emailCustomer}
                                onChange={(e) => setEmailCustomer(e.target.value)} />
                        </FloatingLabel>
                        {
                            emailCustomer ? (<></>) : (<p className={cx('input_textNotice')}>*Vui lòng nhập email!</p>)
                        }
                    </div>
                    <div className={cx('input_container')}>
                        <FloatingLabel controlId="floatingInput"
                            label="Họ và tên"
                            className={cx('input_element')}>
                            <Form.Control
                                className={cx('input_control')}
                                type="text" placeholder="Họ và tên"
                                value={nameCustomer}
                                onChange={(e) => setNameCustomer(e.target.value)} />

                        </FloatingLabel>
                        {
                            nameCustomer ? (<></>) : (<p className={cx('input_textNotice')}>*Vui lòng họ tên!</p>)
                        }
                    </div>
                    <div className={cx('input_container')}>

                        <FloatingLabel controlId="floatingInput"

                            label="Số điện thoại"
                            className={cx('input_element')}>
                            <Form.Control
                                className={cx('input_control')}
                                type="text"
                                placeholder="Số điện thoại"
                                value={phoneCustomer}
                                onChange={(e) => setPhoneCustomer(e.target.value)} />
                        </FloatingLabel>
                        {
                            phoneCustomer ? (<></>) : (<p className={cx('input_textNotice')}>*Vui lòng nhập số điện thoại!</p>)
                        }
                    </div>

                    <div className={cx('input_container')}>

                        <FloatingLabel controlId="floatingTextarea2"
                            label="Địa chỉ"
                            className={cx('input_element')}>
                            <Form.Control
                                as="textarea"
                                placeholder="Địa chỉ"
                                style={{ height: '100px' }}
                                className={cx('input_control')}
                                value={addressCustomer}
                                onChange={(e) => setAddressCustomer(e.target.value)}
                            />
                        </FloatingLabel>
                        {
                            addressCustomer ? (<></>) : (<p className={cx('input_textNotice')}>*Vui lòng nhập địa chỉ!</p>)
                        }
                    </div>



                </div>
                <div className={cx('methods')}>
                    <div className={cx('shipping')}>
                        <h3>Vận chuyển</h3>
                        <div className={cx('shipping_container')}>
                            <p>Vui lòng nhập thông tin mua hàng</p>
                        </div>
                    </div>

                    <div className={cx('pay')}>
                        <h3>Thanh toán</h3>
                        <div className={cx('pay_container', 'ds-between')}>
                            <div div className={cx('pay_method')} >
                                <input type={'radio'} />
                                <p>Thanh toán khi giao hàng (COD)</p>
                            </div>
                            <FontAwesomeIcon icon={faMoneyBill1} className={cx('iconMoney')} />
                        </div>
                    </div>
                </div>


            </div>

        </div >
        <div className={cx('order_container')}>

            <div className={cx('order')}>
                <h3 className={cx('order_header')}>Đơn hàng ({arrayProductOrder.length} sản phẩm)</h3>
                <div className={cx('container')}>
                    {
                        arrayProductOrder.map((product, index) => (

                            <div className={cx('item', 'ds-between')} key={index}>
                                <div className={cx('item_group')}>
                                    <div className={cx('item_img')}>
                                        <img src={product.productImage} />
                                        <p className={cx('quantity')}>{product.quantity}</p>
                                    </div>

                                    <p className={cx('item_name')}>{limitproductName(product.productName, 20)}</p>

                                </div>
                                <p className={cx('item_totalPrice')}>{handleAfDistcountPrice(product.productPrice,
                                    product.productDiscount, product.quantity)}</p>

                            </div>
                        ))
                    }

                </div>
                <div className={cx('container', 'container_discount', 'ds-between')}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Nhập mã giảm giá"
                        className={cx('input_element', 'discount_input')}
                    >
                        <Form.Control className={cx('input_control')} type="email"
                            placeholder="Nhập mã giảm giá" />
                    </FloatingLabel>
                    <button>Áp dụng</button>
                </div>
                <div className={cx('container')}>
                    <div className={cx('priceTemp', 'ds-between')}>
                        <p>Tạm tính</p>
                        <p>{calculateTotalPrice()}</p>
                    </div>
                    <div className={cx('ShipFee', 'ds-between')}>
                        <p>Phí vận chuyển</p>
                        <p>+ {formatProductPrice(30000)}</p>
                    </div>

                </div>
                <div className={cx('container')}>
                    <div className={cx('total', 'ds-between')}>
                        <p className={cx('labelTotal')}>Tổng cộng</p>
                        <p className={cx('priceTotal')}>{calculateTotalPrice(30000)}</p>
                    </div>

                    <div className={cx('total_footer', 'ds-between')}>
                        <i onClick={() => navigate('/cart')}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                            <p>Quay về giỏ hàng</p>
                        </i>
                        <button onClick={() => {
                            handleCreateBill();
                            handleShowModal();
                        }}
                            disabled={(emailCustomer === null) || (emailCustomer === '') ||
                                (nameCustomer === null) || (nameCustomer === '') ||
                                (phoneCustomer === null) || (phoneCustomer === '') ||
                                (addressCustomer === null) || (phoneCustomer === '')}

                            className={cx({
                                disable_btn:
                                    ((emailCustomer === null) || (emailCustomer === '') ||
                                        (nameCustomer === null) || (nameCustomer === '') ||
                                        phoneCustomer === null || (phoneCustomer === '') ||
                                        (addressCustomer === null) || (addressCustomer === ''))
                            })}>Đặt Hàng</button>
                    </div>
                </div>
            </div>
        </div>

        <div className={cx('modal')}>

            {
                isOrder ? (

                    <Modal show={showModal} onHide={handleShowModal}>
                        <div className={cx('modal_container')}>
                            <FontAwesomeIcon icon={faCircleXmark} className={cx('icon_close')} onClick={handleCloseModal} />

                            <div className={cx('log_successfully')}>
                                <img className={cx({ zoom_animation: showModal })} src={'https://static.vecteezy.com/system/resources/previews/011/577/724/original/3d-rendering-of-checkmark-icon-true-choice-png.png'} />
                                <h2>Yêu cầu đã được gửi</h2>

                                <div className={cx('text')}>

                                    <p>Cảm ơn bạn đã ủng hộ Shop
                                        <img className={cx('img_tym')} src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png' />
                                    </p>
                                    <p>làm ơn check mail để kiểm tra đơn hàng!</p>
                                </div>


                            </div>

                        </div>
                        <Modal.Footer className={cx('btn')}>
                            <button onClick={handleCloseModal} className={cx('btn_oke')}>
                                OKE
                            </button>
                        </Modal.Footer>
                    </Modal>
                ) : (<Modal show={showModal} onHide={handleShowModal}>
                    <div className={cx('modal_container')}>
                        <FontAwesomeIcon icon={faCircleXmark} className={cx('icon_close')} onClick={handleCloseModal} />

                        <div className={cx('log_successfully')}>
                            <img className={cx({ zoom_animation: showModal })} src={'https://static.vecteezy.com/system/resources/previews/011/577/724/original/3d-rendering-of-checkmark-icon-true-choice-png.png'} />
                            <h2>Yêu cầu tạm thời chưa được tiếp nhận</h2>

                            <div className={cx('text')}>

                                <p>rất tiếc. đơn hàng bạn đặt đã hết
                                    <img className={cx('img_tym')} src='https://emojigraph.org/media/joypixels/pensive-face_1f614.png' />
                                </p>
                                <p>xin lỗi vì sự cố này</p>
                            </div>
                        </div>

                    </div>
                    <Modal.Footer className={cx('btn')}>
                        <button onClick={handleCloseModal} className={cx('btn_oke')}>
                            OKE
                        </button>
                    </Modal.Footer>
                </Modal>)
            }
        </div>

    </div >);
}

export default Bill;
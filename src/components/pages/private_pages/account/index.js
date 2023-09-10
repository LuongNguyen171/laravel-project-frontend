import classNames from 'classnames/bind';
import styles from './Account.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { handleGetPersonalInformation, handleLogout, handleUpdatePassword } from '~/components/callAPI/auth.api';
import { useNavigate } from 'react-router-dom';
import { handleGetBillUserByEmail } from '~/components/callAPI/bill.api';
import { formatProductPrice } from '~/components/Layout/comps/product/productHandleMethod';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';

const cx = classNames.bind(styles);
function Account() {

    const [activeIndex, setActiveIndex] = useState(0)
    const [userInformation, setUserInformation] = useState({})
    const [userOrder, setUserOrder] = useState([])
    const [isData, setIsData] = useState(true)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('')
    const [checkPasswordText, setCheckPasswordText] = useState(null)
    const [isShowModal, setIsShowModal] = useState(false)

    const navigate = useNavigate()


    const isStrongPassword = (password) => {
        if (password.length < 8) {
            return false;
        }
        const lowercaseRegex = /[a-z]/;
        if (!lowercaseRegex.test(password)) {
            return false;
        }
        const uppercaseRegex = /[A-Z]/;
        if (!uppercaseRegex.test(password)) {
            return false;
        }

        const digitRegex = /[0-9]/;
        if (!digitRegex.test(password)) {
            return false;
        }
        return true;
    }

    const updatePassWord = async () => {

        try {
            if (newPassword === verifyPassword) {
                if (isStrongPassword(newPassword)) {
                    const response = await handleUpdatePassword(userInformation.userEmail, oldPassword, newPassword)
                    if (response === true) {
                        setCheckPasswordText(null)
                        setIsShowModal(true)

                    } else {
                        setCheckPasswordText("*Mật khẩu không chính xác!")
                    }
                } else {
                    setCheckPasswordText("*password chưa đủ mạnh!")
                }
            } else {
                setCheckPasswordText('*Xác nhận password không khớp!')
            }
        } catch (error) {
            setCheckPasswordText('*Mật khẩu không chính xác!')
            throw error
        }


    }

    const handleClose = () => {
        setIsShowModal(false)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userInfor = await handleGetPersonalInformation();
                // console.log("user information: ", userInfor)
                setUserInformation(userInfor.userInformation);
                const userEmail = userInfor.userInformation?.userEmail;

                if (userEmail) {
                    const userOrderBill = await handleGetBillUserByEmail(userEmail);
                    const userOrder = userOrderBill.bills
                    setUserOrder(userOrder);
                }

            } catch (error) {
                setIsData(false)
                console.error('Người dùng chưa đăng nhập hoặc token đã hết hạn!', error.message);
            }
        };
        fetchData();
    }, []);

    return (<div className={cx('wrapper')}>
        {
            isData ? (
                <div className={cx('container')}>

                    <div className={cx('title')}>
                        <h2 className={cx('title_header')}>Trang tài khoản</h2>
                        <div className={cx('title_body')}>
                            <p className={cx('greating')}>Xin chào,<span>{userInformation.userName} !</span></p>
                            <div className={cx('title_main')}>
                                {
                                    ['Thông tin tài khoản',
                                        'Đơn hàng của bạn',
                                        'Đổi mật khẩu',
                                        'Sổ địa chỉ'].map((title, index) => (
                                            <p key={index} onClick={() => setActiveIndex(index)}
                                                className={cx({ active: activeIndex === index })}>{title}</p>
                                        ))
                                }

                            </div>
                        </div>
                        <button className={cx('logout_btn', 'hover-animation')}
                            onClick={() => {
                                handleLogout();
                                navigate('/login');
                            }}> Đăng xuất</button>
                    </div>
                    <div className={cx('content')}>
                        <h2 className={cx('content_header')} >
                            {
                                ['Thông tin tài khoản',
                                    'Đơn hàng của bạn',
                                    'Đổi mật khẩu',
                                    'Địa chỉ của bạn'][activeIndex]
                            }

                        </h2>

                        <div className={cx('content_body')}>
                            {
                                activeIndex === 0 ? (
                                    <>
                                        <div className={cx('text_container')}>
                                            <p>Họ tên: </p>
                                            <span>{userInformation.userName}</span>
                                        </div>
                                        <div className={cx('text_container')}>
                                            <p>Email: </p>
                                            {
                                                !userInformation.userEmail ? (<span>Không có dữ liệu</span>) :
                                                    <span>{userInformation.userEmail}</span>
                                            }
                                        </div>
                                        <div className={cx('text_container')}>
                                            <p>Số điện thoại: </p>
                                            {
                                                !userInformation.userPhoneNumber ? (<span>Không có dữ liệu</span>) :
                                                    <span>{userInformation.userPhoneNumber}</span>
                                            }
                                        </div>
                                    </>
                                ) : activeIndex === 1 ? (
                                    <div>
                                        <> <div className={cx('tableOrder_container')}>

                                            <table className={cx('table')}>
                                                <tr>
                                                    <th>Mã đơn hàng</th>
                                                    <th>Tên đơn hàng</th>
                                                    <th>Ngày</th>
                                                    <th>Địa chỉ</th>
                                                    <th>Giá trị đơn hàng</th>
                                                    <th>TT thanh toán</th>
                                                </tr>
                                                {
                                                    userOrder.length > 0 ? (userOrder.map((order, index) => (
                                                        <tr key={index}>
                                                            <td>{order.billId}</td>
                                                            <td>{order.productName}
                                                                <span>
                                                                    (số lượng :{order.quantityPurchased})
                                                                </span>
                                                            </td>
                                                            <td>{order.DatePurchase}</td>
                                                            <td>{order.userAddress}</td>
                                                            <td>{formatProductPrice(order.orderValue)}</td>
                                                            <td>{formatProductPrice(order.orderValue)}</td>

                                                        </tr>
                                                    ))) : (<tr>
                                                        <p className={cx('textnone')}>Không có dữ liệu</p>
                                                    </tr>)

                                                }

                                            </table>
                                        </div></>
                                    </div>
                                ) : activeIndex === 2 ? (
                                    <>
                                        <div className={cx('updatePassword_container')}>
                                            <p>Để đảm bảo tính bảo mật ,hãy đặt mật khẩu có ít nhất 8 kí tự trong đó:chữ hoa,chữ thường và số</p>
                                            <div className={cx('form')}>
                                                <div className={cx('input_item')}>
                                                    <p>Mật khẩu cũ<span>*</span></p>
                                                    <input type={'password'} value={oldPassword}
                                                        onChange={(e) => setOldPassword(e.target.value)} ></input>
                                                </div>
                                                <div className={cx('input_item')}>
                                                    <p>Mật khẩu mới<span>*</span></p>
                                                    <input type={'password'} value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}></input>
                                                </div>
                                                <div className={cx('input_item')}>
                                                    <p>Xác nhận lại mật khẩu<span>*</span></p>
                                                    <input type={'password'} value={verifyPassword}
                                                        onChange={(e) => setVerifyPassword(e.target.value)}></input>
                                                </div>
                                            </div>
                                            {
                                                <p className={cx('messageFailure')}>{checkPasswordText}</p>
                                            }
                                            <button className={cx('resetPassword_btn',
                                                'hover-animation')}
                                                onClick={() => {
                                                    updatePassWord();
                                                }}>
                                                Đặt lại mật khẩu
                                            </button>
                                            <div className={cx("modal_container")}>
                                                <Modal className={cx('modal')} show={isShowModal} onHide={handleClose} animation={true}>
                                                    <img className={cx({ zoom_animation: isShowModal })} src='https://static.vecteezy.com/system/resources/previews/011/577/724/original/3d-rendering-of-checkmark-icon-true-choice-png.png'></img>
                                                    <p>Cập nhật password thành công!</p>
                                                    <button className={cx("oke_btn")} onClick={() => {
                                                        handleClose()
                                                        setActiveIndex(0);
                                                    }}>OKE</button>
                                                </Modal>
                                            </div>


                                        </div>
                                    </>
                                ) : activeIndex === 3 ? (
                                    <>
                                        <div className={cx('address_container')}>
                                            <p>Địa chỉ: </p>
                                            {
                                                !userInformation.userAddress ?
                                                    (<span>Không có dữ liệu</span>) :
                                                    <span>{userInformation.userAddress}</span>
                                            }
                                        </div>
                                    </>
                                ) : (<>
                                    <p>Không có dữ liệu</p>
                                </>
                                )}

                        </div>
                    </div>
                </div>) : (
                <div className={cx('noneData_container')}>
                    <h2>Bạn chưa đăng nhập </h2>
                    <button className={cx('hover-animation')}
                        onClick={() => navigate('/login')}>Đăng nhập</button>
                </div>
            )
        }

    </div>);
}

export default Account;
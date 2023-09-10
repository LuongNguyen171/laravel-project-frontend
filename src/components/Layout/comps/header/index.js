import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import Logo from '~/components/images/logo.webp'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import { appearMenuBar } from '~/components/redux/reducers/appearMenubarReducer';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { quantityCartSelecter } from '~/components/redux/selector';
import { handleLogout } from '~/components/callAPI/auth.api';

const cx = classNames.bind(styles);
function Header() {

    const [isActive, setIsActive] = useState(false)
    const [quantityCart, setQuantityCart] = useState(0)
    const [expiredToken, setExpiredToken] = useState(-1)

    const quantity = useSelector(quantityCartSelecter)


    const dispath = useDispatch();
    const navigate = useNavigate()

    const handleCheckExpiredToken = () => {
        const currentTime = new Date().getTime();
        return currentTime <= expiredToken
    }

    const handleAppearMenuBar = () => {
        dispath(appearMenuBar.actions.APPEAR_MENU_BAR(true))
    }

    const handleShowDropdown = () => {
        setIsActive(!isActive)
    }

    useEffect(() => {
        setQuantityCart(quantity)

    }, [quantity]);

    useEffect(() => {
        const storedQuantityCart = JSON.parse(localStorage.getItem('quantityNotice'));
        setQuantityCart(storedQuantityCart); // Cập nhật từ localStorage
    }, []);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            const parsedAccessToken = JSON.parse(accessToken);
            const timeExpiredToken = parsedAccessToken.expirationTime;

            if (timeExpiredToken === null) {
                setExpiredToken(-1);
            } else {
                setExpiredToken(timeExpiredToken);
            }
        } else {
            // Xử lý khi không có accessToken trong local storage
            // Ví dụ: đăng xuất người dùng hoặc thực hiện các tác vụ khác
        }
    }, []);


    return (

        <header className={cx('header')}>
            <span className={cx('menubar')} onClick={handleAppearMenuBar}>
                <FontAwesomeIcon icon={faBars} className={cx('icon_menubar')} />
                <p>MENU</p>
            </span>
            <img src={Logo}></img>
            <div className={cx('action')}>
                <FontAwesomeIcon className={cx('action_icon')} icon={faSearch} />
                <div className={cx('action_ResLog')} onClick={handleShowDropdown}>
                    <FontAwesomeIcon className={cx('action_icon')} icon={faCircleUser} />
                    <div className={cx('container', { showDropDown: isActive, hiddenDropDown: !isActive })}>
                        <Link className={cx('container_item')} to={handleCheckExpiredToken() ? '/user/account' : '/login'}>{
                            handleCheckExpiredToken() ? 'Tài Khoản' : 'Đăng nhập'
                        }</Link>
                        <Link className={cx('container_item')}
                            to={handleCheckExpiredToken() ? '/login' : '/register'}
                            onClick={() => {
                                if (handleCheckExpiredToken()) {
                                    handleLogout()
                                }
                            }}>{
                                handleCheckExpiredToken() ? 'Đăng xuất' : 'Đăng ký'
                            }</Link>
                    </div>
                </div>
                <div className={cx('icon_cart')} onClick={() => navigate('/cart')}>
                    <FontAwesomeIcon className={cx('action_icon')} icon={faBagShopping} />
                    {
                        quantityCart !== 0 ? (<p className={cx('quantity')}>{quantityCart}</p>) :
                            <p ></p>
                    }
                </div>
            </div>
        </header>);
}

export default Header;
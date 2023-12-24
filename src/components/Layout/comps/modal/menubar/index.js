import classNames from 'classnames/bind';
import styles from './MenuBar.module.scss';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { appearMenuBar } from '~/components/redux/reducers/appearMenubarReducer';
import logo from '~/components/images/logo.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faCircleXmark, faPaperPlane, faQrcode, faShop } from '@fortawesome/free-solid-svg-icons';
import ProducerTable from '../../arrays/producers';
import 'bootstrap/dist/css/bootstrap.min.css';
import { arrayDownProduct, arrayDownProductRun } from './downProduct';
import { Link, useNavigate } from 'react-router-dom';
import { faOpencart } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);
function MenuBar({ className }) {

    const [isShowDownProduct, setIsShowDownProduct] = useState(false)
    const [isShowDownProductRun, setIsShowDownProductRun] = useState(false)
    const [arrayAdminFunc] = useState(['Danh sách sản phẩm', 'Danh sách Người dùng'])
    const [isShowAdminList, setIsShowAdminList] = useState(false)
    const downRef = useRef(null)
    const accessToken = localStorage.getItem('accessToken');
    const { userRole } = accessToken ? JSON.parse(accessToken) : { userRole: -1 };


    const navigate = useNavigate()
    const dispath = useDispatch()

    const handleClose = () => {

        dispath(appearMenuBar.actions.APPEAR_MENU_BAR(false))
    }

    const showDownProduct = () => {
        setIsShowDownProduct(!isShowDownProduct)
    }

    const ShowAdminList = () => {
        setIsShowAdminList(!isShowAdminList)
    }
    const showDownProductRun = () => {
        setIsShowDownProductRun(!isShowDownProductRun)
    }


    const handleItemClickAdmin = (index) => {
        switch (index) {
            case 1:
                navigate('/admin/productList');
                break;
            case 2:
                navigate('/admin/userList');
                break;
            default:
                break;
        }
        handleClose()
    };


    return (<div className={className} >
        <div className={cx('wrapper')}>
            <header className={cx('menu_header')}>
                <img src={logo} alt={'logo'}></img>
                <FontAwesomeIcon className={cx('icon_close')} icon={faCircleXmark} onClick={handleClose} />
            </header>
            <div className={cx('directions')}>
                <div className={cx('category')}>
                    <FontAwesomeIcon className={cx('category_icon')} icon={faOpencart} />
                    <Link className={cx('category_link')} to={'/'} onClick={handleClose}>Cửa hàng online</Link>
                </div>
                <div className={cx('category')}>
                    <FontAwesomeIcon className={cx('category_icon')} icon={faPaperPlane} />
                    <Link className={cx('category_link')} to={'/'} onClick={handleClose}>Hướng dẫn mua hàng</Link>
                </div>
                <div className={cx('category')}>
                    <FontAwesomeIcon className={cx('category_icon')} icon={faQrcode} />
                    <Link className={cx('category_link')} to={'/'} onClick={handleClose}>Thông tin thanh toán</Link>
                </div>
                <div className={cx('category')}>
                    <FontAwesomeIcon className={cx('category_icon')} icon={faShop} />
                    <Link className={cx('category_link')} to={'/'} onClick={handleClose}>Chuỗi cửa hàng MewShoes</Link>
                </div>
            </div>
            <div className={cx('caterPage')}>
                <div className={cx('caterPage_item')}>
                    <div className={cx('item_header')}>
                        <Link className={cx('header_topic')} to={'/introduction'} onClick={handleClose}>GIỚI THIỆU </Link>
                    </div>
                </div>
                <div className={cx('caterPage_item')}>
                    <div className={cx('item_header')}>
                        <Link className={cx('header_topic')} to={'/'} onClick={handleClose}>TRANG CHỦ </Link>
                    </div>
                </div>
                <div className={cx('caterPage_item')}>
                    <div className={cx('item_header')}>
                        <Link to={'/product'} className={cx('header_topic')} onClick={handleClose}>SẢN PHẨM </Link>
                        <FontAwesomeIcon className={cx('icon-down')} icon={isShowDownProduct ? faCaretUp : faCaretDown} onClick={showDownProduct} />
                    </div>
                    {
                        isShowDownProduct &&
                        (<div className={cx('down', { [styles.scaleUp]: isShowDownProduct, [styles.scaleDown]: !isShowDownProduct })} ref={downRef}>
                            {
                                arrayDownProduct.map((downPro) => (
                                    <p key={downPro.id} >{downPro.name}</p>
                                ))
                            }
                        </div>)
                    }

                </div>
                <div className={cx('caterPage_item')}>
                    <div className={cx('item_header')}>
                        <Link to={'/sportShoe'} className={cx('header_topic')} onClick={handleClose}>GIÀY THỂ THAO </Link>
                        <FontAwesomeIcon className={cx('icon-down')} icon={isShowDownProductRun ? faCaretUp : faCaretDown} onClick={showDownProductRun} />
                    </div>
                    {
                        isShowDownProductRun &&
                        (<div className={cx('down', 'scaleUp')}>
                            {
                                arrayDownProductRun.map((downPro) => (
                                    <p key={downPro.id}>{downPro.name}</p>
                                ))
                            }
                        </div>)
                    }
                </div>
                <div className={cx('caterPage_item')}>
                    <div className={cx('item_header')}>
                        <Link to={'/runShoe'} className={cx('header_topic')} onClick={() => {
                            handleClose();
                        }}>GIÀY CHẠY BỘ </Link>
                    </div>

                </div>
                <div className={cx('caterPage_item')}>
                    <div className={cx('item_header')}>
                        <Link to={'/basketShoe'} className={cx('header_topic')} onClick={handleClose}>GIÀY BÓNG RỔ</Link>
                    </div>

                </div>
                <div className={cx('caterPage_item')}>
                    <div className={cx('item_header')}>
                        <Link to={'/news'} className={cx('header_topic')} onClick={handleClose}>TIN TỨC </Link>
                    </div>

                </div>
                <div className={cx('caterPage_item')}>
                    <div className={cx('item_header')}>
                        <Link to={'/contact'} className={cx('header_topic')} onClick={handleClose}>LIÊN HỆ </Link>
                    </div>

                </div>
                {
                    userRole === 1 && (

                        <div className={cx('caterPage_item')}>
                            <div className={cx('item_header', 'border_top')}>
                                <Link to={'/admin/productList'} className={cx('header_topic',)} onClick={handleClose}>ADMIN </Link>
                                <FontAwesomeIcon className={cx('icon-down')} icon={isShowAdminList ? faCaretUp : faCaretDown} onClick={ShowAdminList} />
                            </div>
                            {
                                isShowAdminList &&
                                (<div className={cx('down', { [styles.scaleUp]: isShowAdminList, [styles.scaleDown]: !isShowAdminList })} ref={downRef}>
                                    {
                                        arrayAdminFunc.map((item, index) => (
                                            <p key={index} onClick={() => handleItemClickAdmin(index + 1)}>{item}</p>
                                        ))
                                    }
                                </div>)
                            }

                        </div>
                    )
                }

            </div>
        </div>
        <div className={cx('style')}>

            <ProducerTable />
        </div>
    </div >
    );
}

export default MenuBar;
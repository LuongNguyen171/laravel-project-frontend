import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import { handleLogin } from '~/components/callAPI/auth.api';
import styles from './Login.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccessReducer } from '~/components/redux/reducers/loginSuccessReducer';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);
function Login() {


    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [isLock, setIsLock] = useState(false)
    const [messageResponse, setMessageResponse] = useState('')
    const [isLoginSuccess, setIsLoginSuccess] = useState(false)
    const navigate = useNavigate()
    const dispath = useDispatch()

    const handleClickLoginBtn = async () => {
        const responseMesage = await handleLogin(userEmail, userPassword)
        if (responseMesage.isLoginSuccess === true) {
            navigate('/')
            setIsLoginSuccess(true)
            setMessageResponse("Đăng nhập thành công!")
        }
        else {
            setMessageResponse("Thông tin tài khoản không chính xác!")
            setIsLoginSuccess(false)
        }
    }
    // useEffect(() => {

    // })

    // useEffect(() => {
    //     console.log("message: ", messageResponse)

    //     if (messageResponse.isLoginSuccess) {

    //         dispath(loginSuccessReducer.actions.LOGIN_SUCCESS_REDUCER(true))
    //         navigate('/')
    //     }
    // }, [messageResponse])

    return (<div className={cx('wrapper')}>
        <section className={cx('loginLayout')}>
            <div className={cx('login_content')}>
                <div className={cx('box-shoe1')}>
                    <img src='https://allbirdsca.myshopify.com/cdn/shop/products/AA000QM_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHER_2.0_Blizzard_Blizzard_b64b03ab-7594-49aa-9992-96aa774a9656_300x300.png?v=1689715383'></img>
                </div>

                <div className={cx('login_form')}>
                    <h2>Đăng nhập</h2>
                    <form>
                        <input placeholder='Email'
                            type={'email'}
                            onChange={(e) => setUserEmail(e.target.value)}
                        >
                        </input>

                        <div className={cx('password_container')}>
                            <div className={cx('password_content')}>

                                <input placeholder='Mật khẩu'
                                    type={isLock ? 'text' : 'password'} value={userPassword}
                                    onChange={(e) => setUserPassword(e.target.value)}>

                                </input>
                                <FontAwesomeIcon icon={isLock ? faLockOpen : faLock}
                                    onClick={() => setIsLock(!isLock)}
                                    className={cx('icon_lock')} />
                            </div>
                        </div>
                        <p className={cx('message',
                            {
                                messageSuccess: isLoginSuccess,
                                messageFailure: isLoginSuccess === false
                            })}
                        >{messageResponse}
                        </p>

                        <div className={cx('login_btn')}>
                            <button className={cx("btn_submit", "hover-animation")}
                                onClick={(e) => {
                                    handleClickLoginBtn();
                                    e.preventDefault();
                                }}>
                                Đăng nhập
                            </button>
                            <a onClick={() => navigate('/user/forgot-password')}>

                                Quên mật khẩu?</a>
                        </div>
                    </form>
                    <div className={cx('options_layout')}>
                        <span className={cx('option_title')}>Hoặc đăng nhập qua</span>
                        <div className={cx('options')}>
                            <div className={cx('opt_item')}>
                                <img src='https://cdn-icons-png.flaticon.com/512/5968/5968764.png'></img>
                            </div>
                            <div className={cx('opt_item')} >
                                <img src='https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png'>

                                </img>
                                <a href='http://127.0.0.1:8000/auth/google'>google</a>
                                {/* <Link to={"/auth/google"}>google</Link> */}
                            </div>
                        </div>
                    </div>
                    <div className={cx('register_layout')}>
                        <h2>Đăng ký</h2>
                        <div className={cx('describe_box')}>
                            <p>Tạo tài khoản để quản ly đơn hàng,
                                và các thông tin thanh toán,
                                gửi hàng một các đơn giản hơn.</p>
                        </div>
                        <div className={cx('btn')}>
                            <button className={cx('btn_link')} onClick={() => navigate('/register')}> Tạo tài khoản</button>
                            <button className={cx('btn_link')} onClick={() => navigate('/')}> Quay về trang chủ</button>


                            {/* <button></button> */}
                        </div>
                    </div>
                </div>
            </div>

        </section>
    </div>);
}

export default Login;
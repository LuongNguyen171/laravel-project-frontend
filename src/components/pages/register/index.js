import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import { handleLoginGoogle, handleRegister } from '~/components/callAPI/auth.api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function Register() {

    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [messageResponse, setMessageResponse] = useState('')
    const [checkStrongPassword, setCheckStrongPassword] = useState('*mật khẩu phải chứa ít nhất 8 kí tự bao gồm : chữ hoa,chữ thường và số')
    const [validEmailText, setValidEmailText] = useState('*email không hợp lệ!')
    const [isRegisterSuccess, setIsRegisterSuccess] = useState(false)

    const [isLock, setIsLock] = useState(false)
    const navigate = useNavigate()

    const handleCickRegisterbtn = async () => {
        const responseMesage = await handleRegister(userName, userEmail, userPassword)
        if (responseMesage.isRegisterSuccess === true) {
            navigate('/')
            setIsRegisterSuccess(true)
            setMessageResponse("Đăng kí tài khoản thành công!")
        }
        else {
            setMessageResponse("Tài khoản này đã tồn tại!")
            setIsRegisterSuccess(false)
        }
    }

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
    function isValidEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    useEffect(() => {
        const checkStrongPassword = () => {
            isStrongPassword(userPassword) ? setCheckStrongPassword('') :
                setCheckStrongPassword('*mật khẩu phải chứa ít nhất 8 kí tự bao gồm : chữ hoa,chữ thường và số')

        }
        const checkIsValidEmail = () => {
            isValidEmail(userEmail) ? setValidEmailText('') :
                setValidEmailText('*email không hợp lệ!')
        }
        checkStrongPassword()
        checkIsValidEmail()

    }, [userPassword, userEmail])

    useEffect(() => {
        handleLoginGoogle()
    }, [])

    return (<div className={cx('wrapper')}>
        <section className={cx('registerLayout')}>
            <div className={cx('register_content')}>
                <div className={cx('box-shoe1')}>
                    <img src='https://allbirdsca.myshopify.com/cdn/shop/products/AA000QM_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHER_2.0_Blizzard_Blizzard_b64b03ab-7594-49aa-9992-96aa774a9656_300x300.png?v=1689715383'></img>
                </div>

                <div className={cx('register_form')}>
                    <h2>Đăng kí tài khoản</h2>
                    <form>
                        <div className={cx('name_container')}>
                            <input placeholder='Họ Tên'
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}>

                            </input>
                            {
                                userName === '' ? (<p className={cx('message')}>*Bạn chưa nhập tên</p>) : (<></>)
                            }
                        </div>
                        <div className={cx('email_container')}>
                            <input placeholder='Email'
                                type={'email'} value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}>
                            </input>
                            <p className={cx('message', 'messageFailure')}>{validEmailText}</p>
                        </div>
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
                            <p className={cx('message', 'messageFailure')}>{checkStrongPassword}</p>

                        </div>

                        <p className={cx('message', {
                            messageSuccess: isRegisterSuccess,
                            messageFailure: isRegisterSuccess === false
                        })}>{messageResponse}</p>

                        <button
                            className={cx("btn_submit", "hover-animation", {
                                disabled_btn:
                                    (!isStrongPassword(userPassword) ||
                                        !isValidEmail(userEmail) ||
                                        userName === '')
                            })}
                            disabled={!isStrongPassword(userPassword) ||
                                !isValidEmail(userEmail) ||
                                userName === ''}
                            onClick={(e) => {
                                handleCickRegisterbtn()
                                e.preventDefault()
                            }}
                        >
                            Đăng ký
                        </button>
                    </form>
                    <div className={cx('options_layout')}>
                        <span className={cx('option_title')}>Hoặc đăng nhập qua</span>
                        <div className={cx('options')}>
                            <div className={cx('opt_item')}>
                                <img src='https://cdn-icons-png.flaticon.com/512/5968/5968764.png'></img>
                            </div>
                            <div className={cx('opt_item')}>
                                <img src='https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png'></img>
                                <a href='http://localhost:3001/auth/google'>google</a>

                            </div>
                        </div>
                    </div>
                    <div className={cx('btn')}>
                        <button className={cx('btn_link')} onClick={() => navigate('/login')}>Đăng nhập</button>
                        <button className={cx('btn_link')} onClick={() => navigate('/')}> Quay về trang chủ</button>

                    </div>
                </div>
            </div>

        </section>
    </div>);
}

export default Register;
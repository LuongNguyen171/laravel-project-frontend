import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleResetPassword } from '~/components/callAPI/auth.api';

import styles from './ResetPassword.module.scss';

const cx = classNames.bind(styles);

function ResetPassword() {
    const [innitPassword, setInitPassword] = useState('')
    const [confirmPassword, setConFirmPassword] = useState('')

    const [comparePasswordError, setComParePasswordError] = useState('')
    const [messageResponse, setMessageResponse] = useState({})

    const url = new URL(window.location.href);
    const token = url.searchParams.get('token');
    const email = url.searchParams.get('email');

    const navigate = useNavigate()

    const handleResetPasswordOnclick = async () => {
        console.log('token:', token)
        console.log('email:', email)
        if (innitPassword === confirmPassword) {

            setMessageResponse(await handleResetPassword(email, token, innitPassword))
            setComParePasswordError('')


        } else {
            setComParePasswordError('password does not match')
        }

    }

    useEffect(() => {
        console.log('isSuccess: ', messageResponse.isSuccess)
        if (messageResponse.isSuccess === true) {
            navigate('/login')
        }
    }, [messageResponse.isSuccess])
    return (<div className={cx('wrapper')}>
        <section className={cx('loginLayout')}>
            <div className={cx('login_content')}>
                <div className={cx('box-shoe1')}>
                    <img src='https://allbirdsca.myshopify.com/cdn/shop/products/AA000QM_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHER_2.0_Blizzard_Blizzard_b64b03ab-7594-49aa-9992-96aa774a9656_300x300.png?v=1689715383'></img>
                </div>
                <div className={cx('login_form')}>
                    <h2>Reset password?</h2>
                    <form>
                        <input placeholder='enter new password'
                            type={'password'}
                            onChange={(e) => setInitPassword(e.target.value)}
                        >
                        </input>

                        <input placeholder='confirm password'
                            type={'password'}
                            onChange={(e) => setConFirmPassword(e.target.value)}
                        >
                        </input>

                        <p className={cx('message', 'messageFailure')}>{comparePasswordError}</p>

                        <p className={cx('message',
                            {
                                messageSuccess: messageResponse.isSuccess,
                                messageFailure: messageResponse.isSuccess === false
                            })}
                        >{messageResponse.message}</p>

                        <div className={cx('login_btn')}>
                            <button
                                className={cx("btn_submit", "hover-animation")}
                                onClick={(e) => (
                                    e.preventDefault(),
                                    handleResetPasswordOnclick())

                                }
                            >
                                Submit
                            </button>

                        </div>
                    </form>


                </div>
            </div>

        </section>
    </div>);
}

export default ResetPassword;
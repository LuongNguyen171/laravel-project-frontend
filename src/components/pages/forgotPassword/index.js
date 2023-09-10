import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { handleForgotPassword } from '~/components/callAPI/auth.api';

import styles from './ForgotPassword.module.scss';

const cx = classNames.bind(styles);
function ForgotPassword() {

    const [messageForgot, setMessageForgot] = useState({})
    const [emailValue, setEmailValue] = useState('')

    const handleGetEmailUser = (e) => {
        setEmailValue(e.target.value)
    }

    const handleOnclickSubmit = async (e) => {
        e.preventDefault();
        const messageResponse = await handleForgotPassword(emailValue);
        console.log('message', messageResponse);
        setMessageForgot(messageResponse);
    };

    useEffect(() => {
        console.log('message', messageForgot)
    }, [])


    return (<div className={cx('wrapper')}>
        <section className={cx('loginLayout')}>
            <div className={cx('login_content')}>
                <div className={cx('box-shoe1')}>
                    <img src='https://allbirdsca.myshopify.com/cdn/shop/products/AA000QM_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHER_2.0_Blizzard_Blizzard_b64b03ab-7594-49aa-9992-96aa774a9656_300x300.png?v=1689715383'></img>
                </div>
                <div className={cx('login_form')}>
                    <h2>Forgot password?</h2>
                    <form>
                        <input placeholder='Email'
                            type={'email'}
                            value={emailValue}
                            onChange={handleGetEmailUser}
                        >
                        </input>

                        <p className={cx('message', {
                            messageSuccess: messageForgot.isSuccess,
                            messageFailure: messageForgot.isSuccess === false
                        })}>{messageForgot.message}</p>

                        <div className={cx('login_btn')}>
                            <button
                                className={cx("btn_submit", "hover-animation")}
                                onClick={handleOnclickSubmit} // Gọi hàm handleOnclickSubmit
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

export default ForgotPassword;
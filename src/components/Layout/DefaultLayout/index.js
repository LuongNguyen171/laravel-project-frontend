import Header from '../comps/header';
import Footer from '../comps/footer';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import MenuBar from '../comps/modal/menubar';
import { useState, useEffect } from 'react'; //Thêm useRef vào đây
import { useSelector } from 'react-redux';
import { appearMenubarSelector } from '~/components/redux/selector';

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    const isMenuBar = useSelector(appearMenubarSelector)
    const [isAppearMenuBar, setIsAppearMenuBar] = useState(isMenuBar)

    // Tạo tham chiếu đến MenuBar

    useEffect(() => {
        setIsAppearMenuBar(isMenuBar);

    }, [isMenuBar]);


    return (
        <div className={cx('wrapper', { 'with-menu-bar': isAppearMenuBar })}>
            <div className={cx("container")}>
                <Header />
                <div className={cx('body')}>
                    <div className={cx('content')}>{children}</div>
                </div>
                <Footer />
            </div>
            {isAppearMenuBar && <MenuBar className={cx('menubar', 'slide-in')} />}
        </div>
    );
}

export default DefaultLayout;

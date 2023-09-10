import classNames from 'classnames/bind';

import styles from './TitleLayout.module.scss';


const cx = classNames.bind(styles);
function TitleLayout({ titleName }) {
    return (<div className={cx('wrapper')}>
        <div className={cx('title_layout')}>
            <div className={cx('title_button')}>
                <p>{titleName}</p>
            </div>

        </div>
    </div>);
}

export default TitleLayout;
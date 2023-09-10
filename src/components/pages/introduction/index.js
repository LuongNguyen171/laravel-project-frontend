import classNames from 'classnames/bind';
import styles from './Introduction.module.scss';

const cx = classNames.bind(styles);
function Introduction() {
    return (<div className={cx('wrapper')}>
        <h1>
            Chức năng chưa được thiết lập
        </h1>
    </div>);
}

export default Introduction;
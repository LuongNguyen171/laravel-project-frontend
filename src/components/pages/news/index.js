import classNames from 'classnames/bind';
import styles from './News.module.scss';

const cx = classNames.bind(styles);
function News() {
    return (<div className={cx('wrapper')}>
        <h1>
            Chức năng chưa được thiết lập
        </h1>
    </div>);
}

export default News;
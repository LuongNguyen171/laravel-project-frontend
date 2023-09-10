import classNames from 'classnames/bind';
import styles from './StyleShoes.module.scss';

import shoesBasketball from '~/components/images/style_shoes/shoes_basketball.webp'
import shoesFemale from '~/components/images/style_shoes/shoes_female.webp'
import shoesFootball from '~/components/images/style_shoes/shoes_football.webp'
import shoesMale from '~/components/images/style_shoes/shoes_male.webp'
import shoesRun from '~/components/images/style_shoes/shoes_run.webp'


const cx = classNames.bind(styles);
function StyleShoes() {
    return (
        <div className={cx('wrapper')}>

            <div className={cx('styleShoes')}>
                <div className={cx('shoes_before', 'space')}>
                    <div className={cx('before_container', 'border-image', 'animation-hover', 'with-container')}>
                        <img className={cx('style_images')} src={shoesMale}></img>
                        <div className={cx('master', 'before-master')}>
                            <p className={cx('master_header')}>GIÀY NAM</p>
                            <p className={cx('master_Count')}>6 Sản Phẩm</p>
                        </div>
                    </div>
                    <div className={cx('before_container', 'border-image', 'animation-hover', 'with-container')}>
                        <img className={cx('style_images')} src={shoesFemale}></img>
                        <div className={cx('master', 'before-master')}>
                            <p className={cx('master_header')}>GIÀY NỮ</p>
                            <p className={cx('master_Count')}>5 Sản phẩm</p>
                        </div>
                    </div>

                </div>
                <div className={cx('shoes_middle', 'space')}>
                    <div className={cx('middle_container', 'border-image', 'animation-hover', 'with-container')}>
                        <img className={cx('style_images')} src={shoesBasketball}></img>
                        <div className={cx('master', 'middle-master')}>
                            <p className={cx('master_header')}>GIÀY BÓNG RỔ</p>
                            <p className={cx('master_Count')}>6 Sản phẩm</p>
                        </div>
                    </div>
                </div>

                <div className={cx('shoes_after', 'space')}>
                    <div className={cx('after_container', 'border-image', 'animation-hover', 'with-container')}>
                        <img className={cx('style_images')} src={shoesFootball}></img>
                        <div className={cx('master', 'affter-master')}>
                            <p className={cx('master_header')}>GIÀY BÓNG ĐÁ</p>
                            <p className={cx('master_Count')}>6 sản phẩm</p>
                        </div>
                    </div>
                    <div className={cx('after_container', 'border-image', 'animation-hover', 'with-container')}>
                        <img className={cx('style_images')} src={shoesRun}></img>
                        <div className={cx('master', 'affter-master')}>
                            <p className={cx('master_header')}>GIÀY CHẠY</p>
                            <p className={cx('master_Count')}>5 sản phẩm</p>
                        </div>
                    </div>

                </div>


            </div>
        </div>);
}

export default StyleShoes;
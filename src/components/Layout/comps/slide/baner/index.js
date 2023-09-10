import Carousel from 'react-bootstrap/Carousel';
import { bannerListHome } from '../../arrays/banners';
import './Banner.css'


const Banner = () => {
    return (
        <Carousel class='banner'>
            {
                bannerListHome.map((baner) => (
                    <Carousel.Item interval={2000} key={baner.id}>
                        <img src={baner.image}></img>

                    </Carousel.Item>
                ))
            }


        </Carousel>
        // <Swiper
        //     modules={[Navigation, Pagination, Scrollbar, A11y]}
        //     spaceBetween={50}
        //     slidesPerView={1}
        //     navigation
        //     pagination={{ clickable: true }}
        //     autoplay={{ delay: 1000 }}
        //     onSwiper={(swiper) => console.log(swiper)}
        //     onSlideChange={() => console.log('slide change')}
        // >
        //     {
        //         bannerListHome.map((banner) => (
        //             <SwiperSlide key={banner.id}><img src={banner.image}></img></SwiperSlide>
        //         ))
        //     }

        // </Swiper>
    );
};

export default Banner
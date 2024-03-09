import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import '../../assets/scss/pages/Home/service.scss';

import ser1 from '../../assets/image/ser1.png';
import ser2 from '../../assets/image/ser2.png';
import ser3 from '../../assets/image/ser3.png';
import ser4 from '../../assets/image/ser4.png';
import ser5 from '../../assets/image/ser5.png';
import ser6 from '../../assets/image/ser6.png';
import ser7 from '../../assets/image/ser7.png';
import ser8 from '../../assets/image/ser8.png';
import ser9 from '../../assets/image/ser9.png';
import ser10 from '../../assets/image/ser10.png';

export default function Service() {
    const servicesSettings = {
        slidesToShow: 5,
        slidesToScroll: 5,
        infinite: true,
        speed: 500,
        nextArrow: (
            <button type="button" className="slick-next">
                Next
            </button>
        ),
        prevArrow: (
            <button type="button" className="slick-prev">
                Previous
            </button>
        ),
    };

    const imageSources = [ser1, ser2, ser3, ser4, ser5, ser6, ser7, ser8, ser9, ser10];

    return (
        <div className='services'>
            <div className="container">
                <h2>Popular professional services</h2>
                <div className="services_slider mt-4">
                    <Slider {...servicesSettings}>
                        {imageSources.map((src, index) => (
                            <div key={index} className="services_item">
                                <img className="img-fluid" src={src} alt={`ser${index + 1}`} />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

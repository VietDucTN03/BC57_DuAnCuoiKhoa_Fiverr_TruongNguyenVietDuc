import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import rooted from '../../assets/image/rooted-logo.png';
import naadam from '../../assets/image/naadam-logo.png';
import lavender from '../../assets/image/lavender-logo.png';
import haerfest from '../../assets/image/haerfest-logo.png';
import res1 from '../../assets/image/response1.png';
import res2 from '../../assets/image/response2.png';
import res3 from '../../assets/image/response3.png';
import res4 from '../../assets/image/response4.png';

import '../../assets/scss/pages/Home/response.scss'

export default function Responses() {

    const testimonialSettings = {
        slidesToShow: 1,
        slidesToScroll: 1,
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

    return (
        <div className='responses'>
            <div className="mt-4">
                <div className="container">
                    <Slider {...testimonialSettings}>
                        <div className="response_item col-lg-12 d-flex align-items-center">
                            <div className="abc">
                                <video controls poster={res1} className="video-player">
                                    <source src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/yja2ld5fnolhsixj3xxw" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div className="response_content">
                                <div className="response_author d-flex align-items-center pb-3">
                                    <h5>Kay Kim, Co-Founder</h5>
                                    <div className="author_logo">
                                        <img
                                            className="logo-img"
                                            src={rooted}
                                            alt="rooted"
                                        />
                                    </div>
                                </div>
                                <div className="response_text">
                                    <i>
                                        "It's extremely exciting that Fiverr has freelancers from
                                        all over the world — it broadens the talent pool. One of the
                                        best things about Fiverr is that while we're sleeping,
                                        someone's working."
                                    </i>
                                </div>
                            </div>
                        </div>
                        <div className="response_item col-lg-12 d-flex align-items-center">
                            <div className="abc">
                                <video controls poster={res2} className="video-player">
                                    <source src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/plfa6gdjihpdvr10rchl" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div className="response_content">
                                <div className="response_author d-flex align-items-center pb-3">
                                    <h5>Caitlin Tormey, Chief Commercial Officer</h5>
                                    <div className="author_logo">
                                        <img
                                            className="logo-img"
                                            src={naadam}
                                            alt="naadam"
                                        />
                                    </div>
                                </div>
                                <div className="response_text">
                                    <i>
                                        "We've used Fiverr for Shopify web development, graphic
                                        design, and backend web development. Working with Fiverr
                                        makes my job a little easier every day."
                                    </i>
                                </div>
                            </div>
                        </div>
                        <div className="response_item col-lg-12 d-flex align-items-center">
                            <div className="abc">
                                <video controls poster={res3} className="video-player">
                                    <source src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/rb8jtakrisiz0xtsffwi" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div className="response_content">
                                <div className="response_author d-flex align-items-center pb-3">
                                    <h5>Brighid Gannon (DNP, PMHNP-BC), Co-Founder</h5>
                                    <div className="author_logo">
                                        <img
                                            className="logo-img"
                                            src={lavender}
                                            alt="lavender"
                                        />
                                    </div>
                                </div>
                                <div className="response_text">
                                    <i>
                                        "We used Fiverr for SEO, our logo, website, copy, animated
                                        videos — literally everything. It was like working with a
                                        human right next to you versus being across the world."
                                    </i>
                                </div>
                            </div>
                        </div>
                        <div className="response_item col-lg-12 d-flex align-items-center">
                            <div className="abc">
                                <video controls poster={res4} className="video-player">
                                    <source src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/bsncmkwya3nectkensun" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div className="response_content">
                                <div className="response_author d-flex align-items-center pb-3">
                                    <h5>Tim and Dan Joo, Co-Founders</h5>
                                    <div className="author_logo">
                                        <img
                                            className="logo-img"
                                            src={haerfest}
                                            alt="haerfest"
                                        />
                                    </div>
                                </div>
                                <div className="response_text">
                                    <i>
                                        "When you want to create a business bigger than yourself,
                                        you need a lot of help. That's what Fiverr does."
                                    </i>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    )
}

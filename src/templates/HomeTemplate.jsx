import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import "../assets/scss/pages/footer.scss"

const HomeTemplate = () => {
    return (
        <div>
            <Header />
            <div className="content">
                <Outlet />
            </div>
            <div className="lines"></div>
            <footer class="footer">
                <div className="footer-top">
                    <div className="container">
                        <div className="categories">
                            <div className="title">
                                <h1 className="title-text">Categories</h1>
                            </div>
                            <div className="content">
                                <a href="#" className="content-text mt-3">Graphics &amp; Design</a>
                                <a href="#" className="content-text mt-3">Digital Marketing</a>
                                <a href="#" className="content-text mt-3">Writing &amp; Translation</a>
                                <a href="#" className="content-text mt-3">Video &amp; Animation</a>
                                <a href="#" className="content-text mt-3">Music &amp; Audio</a>
                                <a href="#" className="content-text mt-3">Programming &amp; Tech</a>
                                <a href="#" className="content-text mt-3">Data</a>
                                <a href="#" className="content-text mt-3">Business</a>
                                <a href="#" className="content-text mt-3">Lifestyle</a>
                                <a href="#" className="content-text mt-3">Sitemap</a>
                            </div>
                        </div>
                        <div className="line" />
                        <div className="about">
                            <div className="title">
                                <h1 className="title-text">About</h1>
                            </div>
                            <div className="content">
                                <a href="#" className="content-text mt-3">Careers</a>
                                <a href="#" className="content-text mt-3">Press &amp; News</a>
                                <a href="#" className="content-text mt-3">Partnerships</a>
                                <a href="#" className="content-text mt-3">Privacy Policy</a>
                                <a href="#" className="content-text mt-3">Terms of Service</a>
                                <a href="#" className="content-text mt-3">Intellectual Property Claims</a>
                                <a href="#" className="content-text mt-3">Investor Relations</a>
                            </div>
                        </div>
                        <div className="line" />
                        <div className="support">
                            <div className="title">
                                <h1 className="title-text">Support</h1>
                            </div>
                            <div className="content">
                                <a href="#" className="content-text mt-3">Help &amp; Support</a>
                                <a href="#" className="content-text mt-3">Trust &amp; Safety</a>
                                <a href="#" className="content-text mt-3">Selling on Fiverr</a>
                                <a href="#" className="content-text mt-3">Buying on Fiverr</a>
                            </div>
                        </div>
                        <div className="community">
                            <div className="title">
                                <h1 className="title-text">Community</h1>
                            </div>
                            <div className="content">
                                <a href="#" className="content-text mt-3">Events</a>
                                <a href="#" className="content-text mt-3">Blog</a>
                                <a href="#" className="content-text mt-3">Forum</a>
                                <a href="#" className="content-text mt-3">Community Standards</a>
                                <a href="#" className="content-text mt-3">Podcast</a>
                                <a href="#" className="content-text mt-3">Affiliates</a>
                                <a href="#" className="content-text mt-3">Invite a Friend</a>
                                <a href="#" className="content-text mt-3">Become a Seller</a>
                                <a href="#" className="content-text mt-3">Fiverr Elevate</a>
                                <a href="#"><span className='content-span'>Exclusive Benefits</span></a>
                            </div>
                        </div>
                        <div className="line" />
                        <div className="moreFromFiverr">
                            <div className="title">
                                <h1 className="title-text">More From Fiverr</h1>
                            </div>
                            <div className="content">
                                <a href="#" className="content-text mt-3">Fiverr Business</a>
                                <a href="#" className="content-text mt-3">Fiverr Pro</a>
                                <a href="#" className="content-text mt-3">Fiverr Studios</a>
                                <a href="#" className="content-text mt-3">Fiverr Logo Maker</a>
                                <a href="#" className="content-text mt-3">Fiverr Guides</a>
                                <a href="#" className="content-text mt-3">Get Inspired</a>
                                <a href="#" className="content-text mt-3">ClearVoice</a>
                                <a href="#"><span className='content-span'>Conetnt Marketing</span></a>
                                <a href="#" className="content-text mt-3">AND CO</a>
                                <a href="#"><span className='content-span'>Invoice Software</span></a>
                                <a href="#" className="content-text mt-3">Learn</a>
                                <a href="#"><span className='content-span'>Online Courses</span></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lines"></div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className='contactLeft'>
                            <p className='name-page'>fiverr <i class="fa fa-registered"></i> <span className='title-contact'>© Fiverr International Ltd. 2023</span></p>
                        </div>
                        <div className='contactRight my-3'>
                            <ul className='iconList'>
                                <li>
                                    <a href="https://twitter.com/fiverr">
                                        <span className='iconContact'>
                                            <i className="fa-brands fa-twitter fa-xl"></i>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.facebook.com/Fiverr/">
                                        <span className='iconContact'>
                                            <i className="fa-brands fa-facebook fa-xl"></i>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.linkedin.com/company/fiverr-com">
                                        <span className='iconContact'>
                                            <i className="fa-brands fa-linkedin fa-xl"></i>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.pinterest.com/fiverr/">
                                        <span className='iconContact'>
                                            <i className="fa-brands fa-pinterest fa-xl"></i>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com/fiverr/">
                                        <span className='iconContact'>
                                            <i className="fa-brands fa-instagram fa-xl"></i>
                                        </span>
                                    </a>
                                </li>
                            </ul>
                            <section className="event-link d-flex">
                                <section className="english">
                                    <a href='#' className='english-link'>
                                        <span className='icon'>
                                            <i className="fa-solid fa-globe"></i>
                                        </span>
                                        <span className="label"> English</span>
                                    </a>
                                </section>
                                <section className="money">
                                    <a href='#' className='money-link'>$USD</a>
                                </section>
                                <i class="fa fa-male"></i>
                            </section>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default HomeTemplate
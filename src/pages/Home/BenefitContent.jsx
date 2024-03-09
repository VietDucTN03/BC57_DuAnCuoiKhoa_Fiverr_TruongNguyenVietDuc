import React from 'react'

import '../../assets/scss/pages/Home/benefitContent.scss'

import imgVideo from '../../assets/image/be-content-img.png'
import video from '../../assets/video/benefit-content-video.mp4'

export default function BenefitContent() {
    return (
        <div className='benefit-contents'>
            <div className="container">
                <div className="row align-items-center justify-content-between">
                    <div className="benefit-details col-12 col-md-12 col-lg-5 col-xl-5">
                        <h2 className='title-benefit-contents'>A whole world of freelance talent at your fingertips</h2>
                        <ul>
                            <div>
                                <li>
                                    <i className="fa-regular fa-circle-check" />
                                    <span>The best for every budget</span>
                                    <p>
                                        Find high-quality services at every price point. No hourly
                                        rates, just project-based pricing.
                                    </p>
                                </li>
                                <li>
                                    <i className="fa-regular fa-circle-check" />
                                    <span>Quality work done quickly</span>
                                    <p>
                                        Find the right freelancer to begin working on your project
                                        within minutes.
                                    </p>
                                </li>
                                <li>
                                    <i className="fa-regular fa-circle-check" />
                                    <span>Protected payments, every time</span>
                                    <p>
                                        Always know what you'll pay upfront. Your payment isn't
                                        released until you approve the work.
                                    </p>
                                </li>
                                <li>
                                    <i className="fa-regular fa-circle-check" />
                                    <span>24/7 support</span>
                                    <p>
                                        Questions? Our round-the-clock support team is available to
                                        help anytime, anywhere.
                                    </p>
                                </li>
                            </div>
                        </ul>
                    </div>
                    <div className="video-content col-12 col-md-12 col-lg-7 col-xl-7">
                        <video controls poster={imgVideo} className="video-player">
                            <source src={video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>
        </div>
    )
}

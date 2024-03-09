import React from 'react'

import fb from '../../assets/image/fb.png';
import google from '../../assets/image/google.png';
import netflix from '../../assets/image/netflix.png';
import pg from '../../assets/image/pg.png';
import paypal from '../../assets/image/paypal.png';

export default function Partners() {
    return (
        <div>
            <div className="partners">
                <div className="container">
                    <div className="d-flex justify-content-center align-items-center">
                        <span>Trusted by:</span>
                        <ul className="partners_logo d-flex align-items-center">
                            <li className="partners_logo_item">
                                <img className="img-fluid" src={fb} alt="fb" />
                            </li>
                            <li className="partners_logo_item">
                                <img className="img-fluid" src={google} alt="google" />
                            </li>
                            <li className="partners_logo_item">
                                <img
                                    className="img-fluid"
                                    src={netflix}
                                    alt="netflix"
                                />
                            </li>
                            <li className="partners_logo_item">
                                <img className="img-fluid" src={pg} alt="pg" />
                            </li>
                            <li className="partners_logo_item">
                                <img className="img-fluid" src={paypal} alt="paypal" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

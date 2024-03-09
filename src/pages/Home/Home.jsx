import React, { useState, useEffect } from 'react';
import b1 from '../../assets/image/b1.png';
import b2 from '../../assets/image/b2.png';
import b3 from '../../assets/image/b3.png';
import b4 from '../../assets/image/b4.png';
import b5 from '../../assets/image/b5.png';

import '../../assets/scss/pages/Home/home.scss'
import Partners from './Partners';
import Service from './Service';
import BenefitContent from './BenefitContent';
import Responses from './Responses';
import Marketplace from './Marketplace';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    b1,
    b2,
    b3,
    b4,
    b5
  ];
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleGetKeyword = (e) => {
    setKeyword(e.target.value);
  };
  const handleSearch = (e) => {
    e.preventDefault();

    navigate(`/result/${keyword}`);
  };

  return (
    <div className="home">
      <div className='carousel'>
        <div className="carousel_item">
          <img
            className="d-block w-100 object-fit"
            src={images[currentImageIndex]}
            alt={`carouselSlider${currentImageIndex + 1}`}
          />
        </div>
        <div className="carousel_info">
          <div className="container">
            <div className="search-box">
              <h1>
                Find the perfect <i>freelance</i> services for your business
              </h1>
              <div className="carousel_search">
                <form action="" onSubmit={handleSearch}>
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder={`Try "building mobile app"`} name="keyword" onChange={handleGetKeyword} />
                    <div className="input-group-append">
                      <button className="btn btn-success" type="submit">
                        Search
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="carousel_popular">
                <p>Popular:</p>
                <button className="btn">Website Design</button>
                <button className="btn">WordPress</button>
                <button className="btn">Logo Design</button>
                <button className="btn">Video Editing</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Partners/>
      <Service/>
      <BenefitContent/>
      <Responses/>
      <Marketplace/>
    </div>
  );
}

export default Home;

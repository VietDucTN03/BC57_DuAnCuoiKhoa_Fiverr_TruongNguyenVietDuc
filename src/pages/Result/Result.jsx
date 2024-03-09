import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import '../../assets/scss/pages/Result/result.scss';
import { getJobByNameAsyncThunkAPi, setJobByNameAction } from '../../redux/reducers/JobReducer';
import { useDispatch, useSelector } from 'react-redux';

const Result = () => {

  const params = useParams();
  const dispatch = useDispatch();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const arrJobByName = useSelector((state) => state.jobReducer.arrJobByName);
  console.log(arrJobByName);
  const jobCount = useSelector((state) => state.jobReducer.jobCount);

  const toggleDropdown = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  useEffect(() => {
    dispatch(getJobByNameAsyncThunkAPi(params.keyword))
  }, [dispatch, params.keyword]);

  // const renderCardItem = () => {
  //   return arrJobByName?.map((element) => {
  //     const { id, danhGia, giaTien, tenCongViec, saoCongViec } = element.congViec;

  //     return (
  //       <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-4" key={id}>
  //         <div className="card">
  //           <NavLink to={`/job-detail/${id}`}>
  //             <img className="card-img-top" src={element.congViec.hinhAnh} alt="" />
  //           </NavLink>
  //           <div className="card-body">
  //             <div className="seller-info">
  //               <div className="avatar">
  //                 <img src={element.avatar} alt="" />
  //               </div>
  //               <div className="info">
  //                 <h5>{element.tenNguoiTao}</h5>
  //                 <p>Level {saoCongViec} Seller</p>
  //               </div>
  //             </div>
  //             <div className="card-text">
  //               <NavLink to={`/job-detail/${id}`}>{tenCongViec}</NavLink>
  //             </div>
  //             <div className="rating">
  //               <i className="fa-solid fa-star" />
  //               <span className="star-rate">{saoCongViec}</span>
  //               <span className="rating-amount">({danhGia})</span>
  //             </div>
  //           </div>
  //           <div className="card-footer">
  //             <i className="fa-solid fa-heart" />
  //             <div className="price">
  //               <p className="mr-1">STARTING AT</p>
  //               <span>US${giaTien}</span>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   });
  // };  

  return (
    <div className="job-detail">
      <div className="container">
        <div className="job-detail-title">
          <span>Result for "{`${params.keyword}`}"</span>
        </div>
        <div className="job-detail-optionbar">
          <div className="left">
            <div className={`dropdown ${activeDropdown === 'serviceOptions' ? 'show' : ''}`}>
              <button
                type="button"
                className="btn dropdown-toggle"
                onClick={() => toggleDropdown('serviceOptions')}
              >
                Service Options
              </button>
              <div className={`dropdown-menu ${activeDropdown === 'serviceOptions' ? 'show' : ''}`}>
                <a className="dropdown-item active" href="#">
                  All Categories
                </a>
                <a className="dropdown-item" href="#">
                  Web Programing
                  <span>(20,566)</span>
                </a>
                <a className="dropdown-item" href="#">
                  Data Entry
                  <span>(12,566)</span>
                </a>
              </div>
            </div>
            <div className={`dropdown ${activeDropdown === 'sellerDetails' ? 'show' : ''}`}>
              <button
                type="button"
                className="btn dropdown-toggle"
                onClick={() => toggleDropdown('sellerDetails')}
              >
                Seller Details
              </button>
              <div className={`dropdown-menu ${activeDropdown === 'sellerDetails' ? 'show' : ''}`}>
                <a className="dropdown-item active" href="#">
                  All Categories
                </a>
                <a className="dropdown-item" href="#">
                  Web Programing
                  <span>(20,566)</span>
                </a>
                <a className="dropdown-item" href="#">
                  Data Entry
                  <span>(12,566)</span>
                </a>
              </div>
            </div>
            <div className={`dropdown ${activeDropdown === 'budget' ? 'show' : ''}`}>
              <button
                type="button"
                className="btn dropdown-toggle"
                onClick={() => toggleDropdown('budget')}
              >
                Budget
              </button>
              <div className={`dropdown-menu ${activeDropdown === 'budget' ? 'show' : ''}`}>
                <a className="dropdown-item active" href="#">
                  All Categories
                </a>
                <a className="dropdown-item" href="#">
                  Web Programing
                  <span>(20,566)</span>
                </a>
                <a className="dropdown-item" href="#">
                  Data Entry
                  <span>(12,566)</span>
                </a>
              </div>
            </div>
            <div className={`dropdown ${activeDropdown === 'deliveryTime' ? 'show' : ''}`}>
              <button
                type="button"
                className="btn dropdown-toggle"
                onClick={() => toggleDropdown('deliveryTime')}
              >
                Delivery Time
              </button>
              <div className={`dropdown-menu ${activeDropdown === 'deliveryTime' ? 'show' : ''}`}>
                <a className="dropdown-item active" href="#">
                  All Categories
                </a>
                <a className="dropdown-item" href="#">
                  Web Programing
                  <span>(20,566)</span>
                </a>
                <a className="dropdown-item" href="#">
                  Data Entry
                  <span>(12,566)</span>
                </a>
              </div>
            </div>
          </div>
          <div className="right">
            {/* <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="switch1"
              />
              <label className="custom-control-label" htmlFor="switch1">
                Pro services
              </label>
            </div>
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="switch2"
              />
              <label className="custom-control-label" htmlFor="switch2">
                Local Sellers
              </label>
            </div>
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="switch3"
              />
              <label className="custom-control-label" htmlFor="switch3">
                Online Sellers
              </label>
            </div> */}

            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Pro Service</label>
            </div>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Local Seller</label>
            </div>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Online Seller</label>
            </div>

          </div>
        </div>
        <div className="job-detail-sort py-3">
          <div className="categories-amount">
            <span>{jobCount} services available</span>
          </div>
          <div className="sort-by">
            <span>Sort by</span>
            <select name="" id="">
              <option value="relevance">Relevance</option>
              <option value="bestselling">Best Selling</option>
              <option value="newarrival">New Arrivals</option>
            </select>
          </div>
        </div>
        {arrJobByName && arrJobByName.length > 0 ? (
          <div className="job-detail-content">
            <div className="row">
              {arrJobByName.map((job) => (
                <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-4" key={job.id}>
                  <div className="card">
                    {job.congViec && job.congViec.hinhAnh ? (
                      <NavLink to={`/job-detail/${job.id}`}>
                        <img className="card-img-top w-100" src={job.congViec.hinhAnh} alt="" />
                      </NavLink>
                    ) : (
                      <div className="placeholder-image">Image not available</div>
                    )}
                    <div className="card-body">
                      <div className="seller-info">
                        <div className="avatar">
                          <img src={job.avatar} alt="" />
                        </div>
                        <div className="info">
                          <h5>{job.tenNguoiTao}</h5>
                          <p>Level {job.congViec.saoCongViec} Seller</p>
                        </div>
                      </div>
                      <div className="card-text">
                        <NavLink className='name-job' to={`/job-detail/${job.id}`}>{job.congViec.tenCongViec}</NavLink>
                      </div>
                      <div className="rating">
                        <i className="fa-solid fa-star" />
                        <span className="star-rate">{job.congViec.saoCongViec}</span>
                        <span className="rating-amount">({job.congViec.danhGia})</span>
                      </div>
                    </div>
                    <div className="card-footer">
                      <i className="fa-solid fa-heart" />
                      <div className="price">
                        <p>STARTING AT</p>
                        <span>US${job.congViec.giaTien}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>No jobs found</div>
        )}

      </div>
    </div>
  )
}

export default Result

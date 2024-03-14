import React, { useEffect, useState } from 'react';
import '../../assets/scss/pages/Categories/categories.scss'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getCategoriesAsyncThunkAction } from '../../redux/reducers/JobReducer';

export default function Categories() {

    const dispatch = useDispatch();
    const params = useParams();
    const categories = useSelector((state) => state.jobReducer.Categories);
    console.log(categories);

    const [activeDropdown, setActiveDropdown] = useState(null);

    const toggleDropdown = (dropdown) => {
        if (activeDropdown === dropdown) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(dropdown);
        }
    };

    useEffect(() => {
        dispatch(getCategoriesAsyncThunkAction(params.id))
    }, [dispatch, params.id])

    const renderCardItem = () => {
        return categories?.map(element => {
            const { id, congViec: { danhGia, giaTien, hinhAnh, tenCongViec, saoCongViec }, avatar, tenNguoiTao } = element;
            return (
                <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-4" key={id}>
                    <div className="card">
                        <NavLink to={`/job-detail/${id}`}>
                            <img className="card-img-top" src={hinhAnh} alt="" />
                        </NavLink>
                        <div className="card-body">
                            <div className="seller-info">
                                <div className="avatar">
                                    <img src={avatar} alt="" />
                                </div>
                                <div className="info">
                                    <h5>{tenNguoiTao}</h5>
                                    <p>Level {saoCongViec} Seller</p>
                                </div>
                            </div>
                            <div className="card-text">
                                <NavLink to={`/job-detail/${id}`}>{tenCongViec}</NavLink>
                            </div>
                            <div className="rating">
                                <i className="fa-solid fa-star" />
                                <span className="star-rate mx-1">{saoCongViec}</span>
                                <span className="rating-amount">({danhGia})</span>
                            </div>
                        </div>
                        <div className="card-footer">
                            <i className="fa-solid fa-heart" />
                            <div className="price">
                                <p className="m-1">STARTING AT</p>
                                <span>US${giaTien}</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="categories-detail">
            <div className="container">
                <div className="categories-detail-title">
                    <span>{categories[0]?.tenChiTietLoai}</span>
                </div>
                <div className="categories-detail-option">
                    <div className="left">
                        <div className={`dropdown ${activeDropdown === 'serviceOptions' ? 'show' : ''}`}>
                            <button
                                type="button"
                                className="btn dropdown-toggle"
                                onClick={() => toggleDropdown('serviceOptions')}
                            >
                                Category
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
                                Service Options
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
                                Seller Details
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
                        <div className="form-check form-switch">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="switch1"
                            />
                            <label className="custom-control-label" htmlFor="switch1">
                                Pro services
                            </label>
                        </div>
                        <div className="form-check form-switch">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="switch2"
                            />
                            <label className="custom-control-label" htmlFor="switch2">
                                Local Sellers
                            </label>
                        </div>
                        <div className="form-check form-switch">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="switch3"
                            />
                            <label className="custom-control-label" htmlFor="switch3">
                                Online Sellers
                            </label>
                        </div>
                    </div>
                </div>
                <div className="categories-detail-sort py-3">
                    <div className="categories-amount">
                        <span>{categories.length} services available</span>
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
                <div className="categories-detail-content">
                    <div className="row">{renderCardItem()}</div>
                </div>
            </div>
        </div>
    )
}

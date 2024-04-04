import React, { useEffect, useState } from 'react';
import HeaderAdmin from '../components/HeaderAdmin';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import '../assets/scss/pages/Footer/footerAdmin.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getUserByIDAPI } from '../redux/reducers/UserReducer';
import { history } from '../index';
import { notification } from 'antd';

export default function AdminTemplate() {

    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.userReducer.userInfoFromLogin);
    console.log(userInfo);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!userInfo && userId) {
            dispatch(getUserByIDAPI(userId));
        } else if (!userId) {
            notification.error({
                message: 'Vui lòng đăng nhập để vào trang!!',
                duration: 5,
            });
            history.push('/user/login');
        }
    }, [dispatch]);

    useEffect(() => {
        if (userInfo && userInfo.role !== 'ADMIN') {
            notification.warning({
                message: 'Bạn không có quyền truy cập vào trang này!',
                placement: 'top',
                duration: 5,
            });
            navigate('/');
        }
    }, [userInfo, navigate]);

    return (
        <div className="">
            <HeaderAdmin />
            <footer className='footer-admin'>
                <div className="container d-flex below-section justify-content-between">
                    <div className="footer-left text-center pt-4">
                        <p className="CopyRights">
                            Ant Design ©2023 Created by Ant UED | Product created by
                            <a href="#"> Truong Nguyen Viet Duc</a>
                        </p>
                    </div>
                    <div className="footer-right pt-3">
                        <ul className="social d-flex">
                            <li>
                                <NavLink to="https://www.facebook.com/">
                                    <span className='icon'>
                                        <i className="fab fa-facebook-f" aria-hidden="true" />
                                    </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink href="#">
                                    <span className='icon'>
                                        <i className="fab fa-linkedin-in" aria-hidden="true" />
                                    </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink href="#">
                                    <span className='icon'>
                                        <i className="fab fa-twitter" aria-hidden="true" />
                                    </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="https://github.com/">
                                    <span className='icon'>
                                        <i className="fab fa-github" aria-hidden="true" />
                                    </span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    )
}

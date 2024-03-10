import React, { useState } from 'react';
import '../assets/scss/pages/Header/headerAdmin.scss'
import { useDispatch, useSelector } from 'react-redux';
import unknownAvatar from '../assets/image/Avatar.jpg';
import { history } from '../index';
import { ACCESS_TOKEN, USER_PROFILE } from '../util/config';

import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('Manager User', '1', <PieChartOutlined />),
    getItem('Manager Job', '2', <DesktopOutlined />),
    getItem('Manager JobType', '3', <ContainerOutlined />),
    getItem('Manager Service', '4', <MailOutlined />),
];

export default function HeaderAdmin() {

    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
        const menuWrapper = document.querySelector('.menu-wrapper');
        if (collapsed) {
            menuWrapper.classList.remove('collapsed');
        } else {
            menuWrapper.classList.add('collapsed');
        }
    };
    

    const dispatch = useDispatch();
    const [isScrolled, setIsScrolled] = useState(false);

    const { userLogin } = useSelector(state => state.userReducer);
    const userAvatar = useSelector((state) => state.userReducer.userProfile);

    const [isLoggedIn, setIsLoggedIn] = useState(!!userLogin);

    const handleLogout = () => {
        localStorage.removeItem('tokenCyberSoft');
        localStorage.removeItem('userId');
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(USER_PROFILE);
        setIsLoggedIn(false);
        history.push('/user/login');
    };

    const renderButtonProfile = () => {
        if (isLoggedIn) {
            return (
                <li className="nav-item dropdown show-user">
                    <button class="nav-link user-profile dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <div className="user-info">
                            {userAvatar?.avatar ? (
                                <img src={userAvatar.avatar} alt="Avatar" className="user-avatar" />
                            ) : (
                                <img src={unknownAvatar} alt="Unknown Avatar" className="user-avatar" />
                            )}
                        </div>
                    </button>
                    <div className="dropdown-menu">
                        {/* <li className="nav-item d-flex">
                  <i className="fa-solid fa-user" />
                  <NavLink className="nav-link nav-profile" aria-disabled="true" to="/user/profile">Profile</NavLink>
                </li> */}
                        <button onClick={handleLogout} className="dropdown-item logout">
                            <i className="fa-solid fa-arrow-right-from-bracket" />
                            Log Out
                        </button>
                    </div>
                </li>
            )
        } else {
            return (
                <div className="">Not Avatar</div>
            );
        }
    }

    return (
        <section className="container">
            <div className="row">
                <div className="d-flex">
                    <div className="menu-wrapper">
                        <Menu
                            className='menu'
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                            theme="light"
                            inlineCollapsed={collapsed}
                            items={items}
                        />
                    </div>
                    <div className="vertical-divider"></div>
                    <section className={`db row ${collapsed ? 'collapsed' : ''}`}>
                        <header className='d-flex justify-content-between'>
                            <div className="header-left">
                                <Button className='btn' onClick={toggleCollapsed}>
                                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                </Button>
                                <NavLink className='name-project navbar-brand' to="/">fiverr</NavLink>
                            </div>
                            <div className="header-right">
                                {renderButtonProfile()}
                            </div>
                        </header>
                        <Outlet />
                    </section>
                </div>
            </div>
        </section>
    )
}

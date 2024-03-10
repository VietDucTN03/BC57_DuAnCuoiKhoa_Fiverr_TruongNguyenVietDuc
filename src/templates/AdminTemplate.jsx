import React, { useState } from 'react';
import HeaderAdmin from '../components/HeaderAdmin';
import { Outlet } from 'react-router-dom';
import '../assets/scss/pages/Footer/footerAdmin.scss'

export default function AdminTemplate() {

    return (
        <div className="">
            <HeaderAdmin/>
            {/* <div className="content">
                <Outlet />
            </div> */}
            <footer style={{ textAlign: "center", backgroundColor: "green" }}>
                Ant Design ©2023 Created by Ant UED
            </footer>
        </div>
    )
}

import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../pages/Footer/Footer'

export default function UserTemplate() {
    return (
        <div>
            <Header />
            <div className="content">
                <Outlet />
            </div>
            <div className="lines"></div>
            <Footer/>
        </div>
    )
}

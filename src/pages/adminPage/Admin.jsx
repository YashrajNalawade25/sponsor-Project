import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './NavBar'


function Admin() {
    return (
        <>
            <Navbar />
            <div>
                <Outlet />
            </div>

        </>
    )
}

export default Admin
import React from 'react';
import { FaLock, FaTachometerAlt, FaStore, FaPlus } from 'react-icons/fa'; // Importing icons
import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-white p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo on the left */}
                <div className="text-black text-2xl font-bold">
                    ListMyShow
                </div>

                {/* Buttons on the right */}
                <div className="flex items-center space-x-8">
                    <NavLink to="/admin/" className="text-gray-500 hover:text-gray-700 text-sm flex items-center space-x-2">
                        <FaTachometerAlt />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink to="/admin/create" className="text-gray-500 hover:text-gray-700 text-sm flex items-center space-x-2">
                        <FaPlus />
                        <span>Create new Event</span>
                    </NavLink>
                    <NavLink to="/admin/auth" className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-600 transition-all">
                        <FaLock />
                        <span>Authenticate</span>
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

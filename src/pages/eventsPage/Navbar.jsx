import { FaHome, FaList, FaUserLock } from 'react-icons/fa';  // Import icons
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="w-full p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo or Icon */}
                <div className="flex items-center space-x-2">
                    <NavLink to="/events"><span className="text-xl font-semibold">ListMyShow</span></NavLink>
                </div>

                {/* Navigation Items */}
                <div className="flex space-x-6 items-center gap-x-7">
                    <NavLink to="/events/shows" className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">

                        <span>your shows</span>
                    </NavLink>
                    <NavLink to="/events/auth" className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold">
                        <FaUserLock className="h-5 w-5" />
                        <span>Authenticate</span>
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

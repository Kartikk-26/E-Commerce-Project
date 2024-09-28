import React from 'react';
import logo from '../../assets/NavLogoMain.png';
import { AiOutlineUser } from 'react-icons/ai';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { GoSignOut } from "react-icons/go";
import { Link } from 'react-router-dom';
import Navitems from './Navitems';
import { NavData } from './data';
import { logout } from '../../redux/user';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const { totalQuantity } = useSelector((state) => state.cart);
  const name = localStorage.getItem('name');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="p-2 sticky top-0 z-50 bg-gradient-to-r from-white via-gray-100 to-gray-200 shadow-lg">
      <div>
        {/* First row */}
        <div className="flex justify-between items-center py-1 mb-2"> {/* Reduced padding */}
          {/* Logo and Name Container */}
          <div className="flex items-center space-x-2"> {/* Reduced space */}
            <img 
              src={logo} 
              className="h-16 w-16 rounded-full object-contain" // Reduced size to h-16 and w-16
              alt="WebifyMart Logo" 
            />
            <p className="text-2xl font-semibold text-gray-800 hover:text-emerald-500 transition-colors duration-300"> {/* Reduced font size */}
              WebifyMart
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-1/3 hidden lg:block">
            <input
              className="w-full p-1 pl-8 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-colors" // Reduced padding
              type="text"
              placeholder="Search for products"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width="16"
              height="16"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 4a6 6 0 100 12 6 6 0 000-12zM21 21l-4.35-4.35"
              />
            </svg>
          </div>

          {/* Icons (Profile, Cart, Logout) */}
          <div className="flex items-center space-x-3 text-gray-700"> {/* Reduced space */}
            <Link to="/profile" className="flex items-center space-x-1 hover:text-emerald-500 transition-colors duration-300">
              <AiOutlineUser size={20} />
              <span className="text-xl font-bold"> {/* Increased font size */}
                {name ? name : 'User'}
              </span>
            </Link>

            <Link to="/cart" className="relative flex items-center space-x-1 hover:text-emerald-500 transition-colors duration-300">
              <HiOutlineShoppingBag size={20} />
              <span className="text-xl font-bold">Cart</span> {/* Increased font size */}
              {totalQuantity > 0 && (
                <span className="absolute rounded-full bg-emerald-400 text-xs p-1 px-2 text-white top-[-8px] right-[-8px] shadow-md">
                  {totalQuantity}
                </span>
              )}
            </Link>

            <button onClick={handleLogOut} className="flex items-center space-x-1 hover:text-emerald-500 transition-colors duration-300">
              <GoSignOut size={20} />
              <span className="text-xl font-bold"> {/* Increased font size */}
                Log-Out
              </span>
            </button>
          </div>
        </div>

        {/* Second row - Navigation */}
        <div className="border-t border-gray-300 pt-2">
          <nav className="flex justify-center space-x-2">
            <ul className="flex space-x-4 text-gray-600 text-base font-medium">
              {NavData.map((items) => (
                <Navitems key={items.text} to={items.url} text={items.text} />
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

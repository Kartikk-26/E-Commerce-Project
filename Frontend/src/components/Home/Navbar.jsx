import React from 'react';
import logo from '../../assets/logo1.png';
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
    <header className="p-4 sticky top-0 z-50 bg-white shadow-md">
      <div>
        {/* First row */}
        <div className="flex justify-between items-center p-2 mb-6">
          <div className="flex items-center space-x-2">
            <img src={logo} className="h-10" alt="QuickBazaar Logo" />
            <p className="text-2xl tracking-wide font-semibold text-gray-800 hover:text-emerald-500 transition-all duration-200">
              QuickBazaar
            </p>
          </div>

          <div className="w-96">
            <input
              className="w-full p-2 font-normal bg-gray-100 border border-gray-300 focus:border-emerald-400 transition-colors rounded-md"
              type="text"
              placeholder="Search for products"
            />
          </div>

          <div className="flex items-center space-x-8 text-gray-600">
            <Link to="/profile" className="flex items-center space-x-1 hover:text-emerald-500 transition-all duration-200">
              <AiOutlineUser size={24} className="text-pastel-blue" />
              <span className="text-sm font-medium">
                {name ? name : 'User'}
              </span>
            </Link>

            <Link to="/cart" className="relative flex items-center space-x-1 hover:text-emerald-500 transition-all duration-200">
              <HiOutlineShoppingBag size={24} className="text-pastel-blue" />
              <span className="text-sm font-medium">Cart</span>
              {totalQuantity > 0 && (
                <span className="absolute rounded-full bg-emerald-400 text-xs p-1 top-[-10px] right-[-10px]">
                  {totalQuantity}
                </span>
              )}
            </Link>

            <Link onClick={handleLogOut} className="flex items-center space-x-1 hover:text-emerald-500 transition-all duration-200">
              <GoSignOut size={24} className="text-pastel-blue" />
              <span className="text-sm font-medium">Log-Out</span>
            </Link>
          </div>
        </div>

        {/* Second row */}
        <div>
          <div className="flex justify-center items-center">
            <ul className="flex space-x-8 text-gray-600">
              {NavData.map((items) => (
                <Navitems key={items.text} to={items.url} text={items.text} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { userLogin } from '../redux/user';
import { useDispatch } from 'react-redux';
import { FaGoogle, FaUser, FaLock } from 'react-icons/fa';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useNavigate , useLocation } from 'react-router-dom';

function Login() {
  const { handleSubmit, register, formState: { errors } } = useForm(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); 
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    dispatch(userLogin(data));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-gray-900 dark:to-gray-800">
      <div className="p-8 w-[25rem] shadow-lg bg-white dark:bg-gray-800 rounded-md transition-all border border-gray-200 dark:border-gray-700">
        <h1 className="text-black dark:text-white font-bold text-3xl text-center mb-4">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Email Field */}
          <div className="relative mb-4">
            <FaUser className="absolute left-3 top-3 text-gray-500 dark:text-gray-300" />
            <input
              className={`pl-10 w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white`}
              type="email"
              placeholder="Email"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div className="relative mb-4">
            <FaLock className="absolute left-3 top-3 text-gray-500 dark:text-gray-300" />
            <input
              className={`pl-10 pr-10 w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white`}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500 dark:text-gray-300"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            className="bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-600 px-8 py-2 rounded-md w-full mt-3 text-white transition-all"
            type="submit"
          >
            Login
          </button>
        </form>

        <button
          className="flex items-center justify-center mt-5 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full transition-all" onClick={()=>window.location.href="http://localhost:3000/api/auth/google"}
        >
          <FaGoogle className="mr-2" />
          Login with Google
        </button>

        {/* New member register section */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">New member? <Link to="/register" className="text-blue-500 hover:underline">Register here</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { Register } from '../Redux/user';

import { FaUser, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  name: z.string().min(1, "Name is required").max(40, "Name cannot exceed 40 characters"),
  email: z.string().email("A valid email is required"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  password: z.string()
    .min(8, "Password is too short")
    .regex(/[0-9]/, "Password must contain a number")
    .regex(/[a-z]/, "Password must contain a lowercase letter")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[\W_]/, "Password must contain a special character"),
});

function Signup() {
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    await dispatch(Register(data));
    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="p-10 w-[30rem] shadow-xl bg-white text-gray-800 rounded-xl border border-gray-200">
        <h1 className="text-gray-800 font-bold text-2xl text-center mb-6">Create Your Account</h1>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="relative mb-6">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              className="pl-12 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-800"
              type="text"
              placeholder="Full Name"
              {...register('name')}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div className="relative mb-6">
            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            <input
              className="pl-12 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-800"
              type="email"
              placeholder="Email Address"
              {...register('email')}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="relative mb-6">
            <FaPhone className="absolute left-3 top-3 text-gray-500" />
            <input
              className="pl-12 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-800"
              type="text"
              placeholder="Phone Number"
              {...register('phone')}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          <div className="relative mb-6">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              className="pl-12 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-800"
              type="password"
              placeholder="Password"
              {...register('password')}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 px-10 py-3 rounded-lg w-full mt-5 text-white font-semibold"
            type="submit"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;

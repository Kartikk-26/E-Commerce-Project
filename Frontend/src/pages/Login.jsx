import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { userLogin } from '../redux/user';

function Login() {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(userLogin(data));
    console.log(data);
    // dispatch(userLogin(data)); Uncomment if using redux
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-8 w-full max-w-md bg-white shadow-lg rounded-lg">
        <h1 className="text-black font-bold text-3xl text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="Email">
              Email
            </label>
            <input
              className="input_field w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              {...register('email')}
              placeholder="Enter your email"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="Password">
              Password
            </label>
            <input
              className="input_field w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              {...register('password')}
              placeholder="Enter your password"
            />
          </div>

          <button
            className="bg-blue-600 hover:bg-green-500 text-white font-semibold py-2 rounded-md w-full transition-colors duration-300"
            type="submit"
          >
            Login
          </button>
        </form>
        <p className="text-gray-600 text-sm text-center mt-4">
          Don't have an account? <a href="#" className="text-blue-500 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;

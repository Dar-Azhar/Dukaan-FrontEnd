import React, { useState } from 'react';
import book from "../assets/Login_Book.png";
import { Link } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form"

const Login = () => {
  const [message, setMessage] = useState('');
  const {
    register, handleSubmit, watch, formState: { errors } } = useForm()
  const onSubmit = (data) => {
    console.log("logged in with", data.email);
  }

  const handleGoogleSignIn = () => { }
  return (
    <div className="flex justify-between items-center ">
      <div className="hidden lg:flex flex-col w-10/12 p-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome Back!</h1>
        <p className="text-gray-600 mb-8">
          Login to access your personalized dashboard and manage your account effortlessly.
        </p>
        <img
          src={book}
          alt="A book representing learning and growth"
          className="w-1/2 object-contain rounded-lg self-center"
        />
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 md:m-auto p-12 shadow-2xl bg-white rounded-xl">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Login</h2>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="border bg-gray-100 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary mb-4"
          />
          {errors.email && <p className='text-red-500 text-xs italic mb-3'>{errors.email.message}</p>}
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className=" shadow appearance-none border w-full  leading-tight focus:outline-none focus:shadow  bg-gray-100 border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary mb-4"
          />
          {errors.password && <p className='text-red-500 text-xs italic mb-3'>{errors.password.message}</p>}
          {
            message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>
          }
          <button
            type="submit"
            className="bg-primary text-white py-2 rounded-md hover:bg-[#e2bf40] transition-all duration-200"
          >
            Login
          </button>
        </form>
        <p className='align-baseline font-medium mt-4 text-sm'>Haven't an account? Please <Link to="/register" className='text-blue-500 hover:text-blue-700'>Register</Link></p>
        {/* google sign in */}
        <div className='mt-4'>
          <button
            onClick={handleGoogleSignIn}
            className='w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none'>
            <FaGoogle className='mr-2' />
            <span className='block'>Sign in </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
import React, { useState } from 'react';
import book from "../assets/Login_Book.png";
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const navigate = useNavigate()
    const [message, setMessage] = useState('');
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const password = watch("password");
    const {registerUser, signInWithGoogle} = useAuth();

    const onSubmit = async(data) => {
        if (data.password !== data.confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }
        try {
            await registerUser(data.email, data.password);
            alert("User registered successfully!")
        } catch (error) {
            setMessage("Please provide a valid email and password")
            console.error(error)
        }

    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            alert("Login successful!");
            navigate("/")
        } catch (error) {
            alert("Google sign in failed!")
            console.error(error)
        }
    }

    return (
        <div className="flex justify-between items-center">
            <div className="hidden lg:flex flex-col w-10/12 p-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Join Us Today!</h1>
                <p className="text-gray-600 mb-8">
                    Create an account to explore amazing features, manage your preferences, and enjoy a seamless experience.
                </p>
                <img
                    src={book}
                    alt="A book representing learning and growth"
                    className="w-1/2 object-contain rounded-lg self-center"
                />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 md:m-auto p-12 shadow-2xl bg-white rounded-xl">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Register</h2>
                <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                    <input
                        {...register("email", { required: "Email is required" })}
                        type="email"
                        id="Registeremail"
                        placeholder="Email"
                        autoComplete='username'
                        className="border bg-gray-100 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary mb-4"
                    />
                    {errors.email && <p className="text-red-500 text-xs italic mb-3">{errors.email.message}</p>}

                    <input
                        {...register("password", { required: "Password is required" })}
                        type="password"
                        id="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        className="border bg-gray-100 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary mb-4"
                    />
                    {errors.password && <p className="text-red-500 text-xs italic mb-3">{errors.password.message}</p>}

                    <input
                        {...register("confirmPassword", {
                            required: "Confirm Password is required",
                            validate: (value) => value === password || "Passwords do not match",
                        })}
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        autoComplete="new-password"
                        className="border bg-gray-100 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary mb-4"
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-xs italic mb-3">{errors.confirmPassword.message}</p>
                    )}

                    {message && <p className="text-red-500 text-xs italic mb-3">{message}</p>}
                    <button
                        type="submit"
                        className="bg-primary text-white py-2 rounded-md hover:bg-[#e2bf40] transition-all duration-200"
                    >
                        Register
                    </button>
                </form>
                <p className="align-baseline font-medium mt-4 text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:text-blue-700">
                        Login
                    </Link>
                </p>

                {/* Google Sign-In */}
                <div className="mt-4">
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                    >
                        <FaGoogle className="mr-2" />
                        <span>Sign up</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;

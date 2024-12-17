import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { IoIosSearch } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { IoMdHeartEmpty } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";

import avatar from '../assets/avatar.png'

const dropDownOptions = [
    { name: 'Dashboard', href: "/dashboard" },
    { name: 'Orders', href: "/orders" },
    { name: 'Cart-Page', href: "/cart" },
    { name: 'Check Out', href: "/checkout" },
]

export const Navbar = () => {
    const currentUser = false;
    const [isDropDownOpen, setIsDropDownOpen] = useState(false)
    return (
        <header className='max-w-screen-2xl mx-auto px-6 lg:px-12 py-6'>
            <nav className='flex justify-between items-center'>
                <div className="flex items-center justify-between gap-4">
                    <Link to="/">
                        <HiMiniBars3CenterLeft className="text-2xl" />
                    </Link>

                    <div className="relative w-full  md:w-96 ">
                        <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
                        <input
                            type="text"
                            placeholder="Search here"
                            className="bg-gray-200 w-full rounded-md pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>
                </div>


                <div className='relative flex items-center md:space-x-3 space-x-2'>
                    {currentUser ?
                        <>

                            <button onClick={() => setIsDropDownOpen(!isDropDownOpen)} >
                                <img src={avatar} alt="user" className={`size-7 max-w-none rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''}`} />
                            </button>
                            {isDropDownOpen && (
                                <div className="absolute right-0 top-8 bg-white rounded-md py-2 w-48 shadow-lg z-40">
                                    <ul className="py-2">
                                        {dropDownOptions.map((item) => (
                                            <li key={item.name} onClick={() => setIsDropDownOpen(false)}>
                                                <Link to={item.href} className="block px-4 py-2 text-sm hover:bg-gray-100">
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                        {/* Uncomment if needed
            <li>
                <button
                    onClick={handleLogOut}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                    Logout
                </button>
            </li>
            */}
                                    </ul>
                                </div>
                            )}

                        </>
                        : <Link to='/login'><FaRegUser className='size-6 sm:ml-1' /></Link>}
                    <button className='hidden sm:block'><IoMdHeartEmpty className='size-7' /></button>

                    <Link to='/cart' className='bg-primary  sm:px-6 p-1 flex items-center rounded-lg' >
                        <AiOutlineShoppingCart className='size-6' />
                        <span className='text-sm font-semibold sm:ml-1'>0</span>
                    </Link>
                </div>
            </nav>
        </header>
    )
}

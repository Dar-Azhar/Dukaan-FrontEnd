import React from 'react'
import footerLogo from '../assets/footer-logo.png'
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"


const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-10 px-4">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className='w-full md:w-1/2'>
                    <img src={footerLogo} alt="book" className='w-36' />
                    <ul className='flex flex-col sm:flex-row gap-4 py-7'>
                        <li><a href="#home" className="hover:text-primary">Home</a></li>
                        <li><a href="#services" className="hover:text-primary">Services</a></li>
                        <li><a href="#about" className="hover:text-primary">About Us</a></li>
                        <li><a href="#contact" className="hover:text-primary">Contact</a></li>
                    </ul>
                </div>
                <div className="md:w-1/2 w-full flex flex-col gap-5">
                    <p>Subscribe to stay tuned for new product and latest updates. Let’s do it!</p>
                    <div className='flex'>
                        <input type="email" name="email" id="email" required placeholder='Enter your email address' className='w-full px-4 py-2 rounded-l-md text-black' />
                        <button  className='bg-primary px-6 py-2 rounded-r-md  hover:bg-secondary'>Subscribe</button>
                    </div>
                </div>
            </div>

            <div className='container mx-auto flex flex-col gap-8 md:flex-row justify-between items-center mt-10 border-t border-gray-700 pt-6'>
                <div>
                    <ul className='flex justify-center items-center gap-5'>
                        <li><a href="#privacy" className="hover:text-primary">Privacy Policy</a></li>
                        <li><a href="#terms" className="hover:text-primary">Terms of Use</a></li>
                        <li><a href="#salesandrefunds" className="hover:text-primary">Sales and Refunds</a></li>
                        <li><a href="#legal" className="hover:text-primary">Legal</a></li>
                    </ul>
                </div>
                <div className='flex justify-center items-center gap-16'>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                        <FaFacebook className='size-8' />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                        <FaInstagram className='size-8' />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                        <FaTwitter className='size-8' />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
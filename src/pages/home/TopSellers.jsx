import React, { useEffect, useState } from 'react'
import BookCard from '../books/BookCard'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { useGetAllBooksQuery } from '../../redux/features/books/booksAPI';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



const categories = ["Choose a genre", "Business", "Fiction", "Horror", "Adventure"]
export const TopSellers = () => {
    // const [books, setBooks] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("Choose a genre")

    // useEffect(() => {
    //     fetch('Books.json')
    //         .then((res) => res.json())
    //         .then((data) => setBooks(data))
    //         .catch((error) => {
    //             console.error('failed to fetch books', error)
    //         })
    // }, [])

    const { data: allbooks } = useGetAllBooksQuery()
    const books = allbooks?.data || [];
    console.log(books);
    const filteredBooks = selectedCategory === "Choose a genre" ? books : books.filter((book) => book.category === selectedCategory.toLocaleLowerCase())
    return (
        <div className=' mt-10'>
            <h2 className='text-3xl font-semibold text-secondary mb-6'>Top Sellers</h2>

            <div className="mb-8 flex items-center">
                <select name="category" id="category" onChange={(e) => setSelectedCategory(e.target.value)}
                    className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'>
                    {
                        categories.map((category, index) => (
                            <option value={category} key={index}>{category}</option>
                        ))
                    }
                </select>
            </div>

            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                    },
                    1180: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    }
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {
                    filteredBooks.map((book, index) => (
                        <SwiperSlide key={index}>
                            <BookCard book={book} />
                        </SwiperSlide>
                    ))
                }

            </Swiper>

        </div>
    )
}

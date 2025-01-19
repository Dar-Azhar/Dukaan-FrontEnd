import React, { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useGetSingleBookQuery, useUpdateBookMutation } from '../../../redux/features/books/booksAPI';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';
import axios from 'axios';
import getBaseUrl from '../../../utils/baseURL';
import InputField from '../addBook/InputField';
import SelectField from '../addBook/SelectField';

const EditBook = () => {
    const { id } = useParams();
    const { data: allBookData, isLoading, isError, refetch } = useGetSingleBookQuery(id);
    const [imageFile, setimageFile] = useState(null)
    const bookData = allBookData?.data
    // console.log(bookData)
    const [updateBook] = useUpdateBookMutation();
    const { register, handleSubmit, setValue, reset } = useForm();
    useEffect(() => {
        if (bookData) {
            setValue('title', bookData.title);
            setValue('description', bookData.description);
            setValue('category', bookData?.category);
            setValue('trending', bookData.trending);
            setValue('oldPrice', bookData.oldPrice);
            setValue('newPrice', bookData.newPrice);
            // setValue('coverImage', bookData.coverImage)
        }
    }, [bookData, setValue])

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('trending', data.trending);
        formData.append('oldPrice', Number(data.oldPrice));
        formData.append('newPrice', Number(data.newPrice));
        // Append the image file
        if (imageFile) {
            formData.append('coverImage', imageFile);
        }
        try {
            await axios.put(`${getBaseUrl()}/api/books/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            Swal.fire({
                title: "Book Updated",
                text: "Your book is updated successfully!",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, It's Okay!"
            });
            await refetch()
        } catch (error) {
            console.log("Failed to update book.");
            alert("Failed to update book.");
        }
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setimageFile(file);
        }
    };
    if (isLoading) return <Loading />
    if (isError) return <div>Error fetching book data</div>
    return (
        <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    label="Title"
                    name="title"
                    placeholder="Enter book title"
                    register={register}
                />

                <InputField
                    label="Description"
                    name="description"
                    placeholder="Enter book description"
                    type="textarea"
                    register={register}
                />

                <SelectField
                    label="Category"
                    name="category"
                    options={[
                        { value: '', label: 'Choose A Category' },
                        { value: 'business', label: 'Business' },
                        { value: 'technology', label: 'Technology' },
                        { value: 'fiction', label: 'Fiction' },
                        { value: 'horror', label: 'Horror' },
                        { value: 'adventure', label: 'Adventure' },
                    ]}
                    register={register}
                />
                <div className="mb-4">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            {...register('trending')}
                            className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
                    </label>
                </div>

                <InputField
                    label="Old Price"
                    name="oldPrice"
                    type="number"
                    placeholder="Old Price"
                    register={register}
                />

                <InputField
                    label="New Price"
                    name="newPrice"
                    type="number"
                    placeholder="New Price"
                    register={register}
                />

                {/* <InputField
                    label="Cover Image URL"
                    name="Cover Image"
                    type="file"
                    accept="image/*"
                    placeholder="Cover Image URL"
                    register={register}
                /> */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
                    <input type="file" name='cover Image' accept="image/*" onChange={handleFileChange} className="mb-2 w-full" />
                </div>

                <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded-md">
                    Update Book
                </button>
            </form>
        </div>
    )
}

export default EditBook


// import React, { useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { useParams } from 'react-router-dom';
// import { useGetSingleBookQuery } from '../../../redux/features/books/booksAPI';
// import Swal from 'sweetalert2';
// import axios from 'axios';
// import getBaseUrl from '../../../utils/baseURL';
// import InputField from '../addBook/InputField';
// import SelectField from '../addBook/SelectField';
// import Loading from '../../../components/Loading';

// const EditBook = () => {
//     const { id } = useParams();
//     const { data: allBookData, isLoading, isError, refetch } = useGetSingleBookQuery(id);
//     const { register, handleSubmit, setValue, reset } = useForm();
//     const bookData = allBookData?.data;    // Pre-fill form when book data is available
//     useEffect(() => {
//         if (bookData) {
//             setValue('title', bookData.title);
//             setValue('description', bookData.description);
//             setValue('category', bookData?.category);
//             setValue('trending', bookData.trending);
//             setValue('oldPrice', bookData.oldPrice);
//             setValue('newPrice', bookData.newPrice);
//         }
//     }, [bookData, setValue]);

//     // Handle form submission
//     const onSubmit = async (data) => {
//         const formData = new FormData();
//         console.log(formData.entries());
//         formData.append('title', data.title);
//         formData.append('description', data.description);
//         formData.append('category', data.category);
//         formData.append('trending', data.trending);
//         formData.append('oldPrice', Number(data.oldPrice));
//         formData.append('newPrice', Number(data.newPrice));

//         // Handle file input
//         if (data.coverImage && data.coverImage[0]) {
//             formData.append('coverImage', data.coverImage[0]);
//         } else {
//             formData.append('coverImage', bookData.coverImage); // Use existing cover image if no new file is uploaded
//         }
//         for (let [key, value] of formData.entries()) {
//             console.log(`${key}: ${value}`);
//         }

//         try {
//             await axios.put(`${getBaseUrl()}/api/books/update/${id}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                 },
//             });

//             Swal.fire({
//                 title: 'Book Updated',
//                 text: 'Your book has been updated successfully!',
//                 icon: 'success',
//             });

//             await refetch();
//         } catch (error) {
//             Swal.fire({
//                 title: 'Update Failed',
//                 text: error.response?.data?.message || 'An error occurred while updating the book.',
//                 icon: 'error',
//             });
//         }
//     };

//     if (isLoading) return <Loading />;
//     if (isError) return <div>Error fetching book data</div>;

//     return (
//         <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>

//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <InputField
//                     label="Title"
//                     name="title"
//                     placeholder="Enter book title"
//                     register={register}
//                     defaultValue={bookData?.title}
//                 />

//                 <InputField
//                     label="Description"
//                     name="description"
//                     placeholder="Enter book description"
//                     type="textarea"
//                     register={register}
//                     defaultValue={bookData?.description}
//                 />

//                 <SelectField
//                     label="Category"
//                     name="category"
//                     options={[
//                         { value: '', label: 'Choose A Category' },
//                         { value: 'business', label: 'Business' },
//                         { value: 'technology', label: 'Technology' },
//                         { value: 'fiction', label: 'Fiction' },
//                         { value: 'horror', label: 'Horror' },
//                         { value: 'adventure', label: 'Adventure' },
//                     ]}
//                     register={register}
//                     defaultValue={bookData?.category}
//                 />

//                 <div className="mb-4">
//                     <label className="inline-flex items-center">
//                         <input
//                             type="checkbox"
//                             {...register('trending')}
//                             defaultChecked={bookData?.trending}
//                             className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
//                         />
//                         <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
//                     </label>
//                 </div>

//                 <InputField
//                     label="Old Price"
//                     name="oldPrice"
//                     type="number"
//                     placeholder="Old Price"
//                     register={register}
//                     defaultValue={bookData?.oldPrice}
//                 />

//                 <InputField
//                     label="New Price"
//                     name="newPrice"
//                     type="number"
//                     placeholder="New Price"
//                     register={register}
//                     defaultValue={bookData?.newPrice}
//                 />

//                 <div className="mb-4">
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
//                     <input
//                         type="file"
//                         accept="image/*"
//                         {...register('coverImage')}
//                         className="mb-2 w-full"
//                     />
//                 </div>

//                 <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded-md">
//                     Update Book
//                 </button>
//             </form>

//         </div>
//     );
// };

// export default EditBook;

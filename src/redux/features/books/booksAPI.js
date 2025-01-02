import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/baseURL';
const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/books/`,
    // credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            Headers.set('authorization', `Bearer ${token}`)
        }
        return Headers;
    }
});

const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery,
    tagTypes: ['Books'],
    endpoints: (builder) => ({
        getAllBooks: builder.query({
            query: () => 'all',
            providesTags: ["Books"]

        }),
        getSingleBook: builder.query({
            query: (id) => `single/${id}`,
            providesTags: (result, error, id) => [{ type: "Books", id }],

        }),
        addBook: builder.mutation({
            query: (newBook) => ({
                url: 'create',
                method: 'POST',
                body: newBook
            }),
            invalidatesTags: ["Books"]

        }),

        updateBook: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `update/${id}`,
                method: 'PUT',
                body: rest,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }),

        deleteBook: builder.mutation({
            query: (id) => ({
                url: `delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["Books"]

        })
    })

})

export const { useGetAllBooksQuery, useGetSingleBookQuery, useAddBookMutation, useUpdateBookMutation, useDeleteBookMutation } = booksApi;
export default booksApi;
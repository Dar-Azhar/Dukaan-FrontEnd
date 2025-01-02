import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

const ordersApi = createApi({
    reducerPath: "ordersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/orders`,
        credentials: 'include',
    }),
    credentials: "include",
    tagTypes: ["Orders"],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: "/create-new-order",
                method: "POST",
                body: newOrder,
                // credentials: "include",
            }),
            invalidatesTags: ["Orders"],
        }),
        getOrdersByEmailId: builder.query({
            query: (email) => ({
                url: `/get-order-by-email/${email}`,
                method: "GET",
            }),
            providesTags: ["Orders"],
        }),
    }),
})
export const { useCreateOrderMutation, useGetOrdersByEmailIdQuery } = ordersApi; 
export default ordersApi;
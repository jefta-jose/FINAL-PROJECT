import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the API slice
export const timeApi = createApi({
    reducerPath: 'timeApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
    endpoints: (builder) => ({
        ////////////////////////////////////////
        updateTime: builder.mutation({
            query: (timeData) => ({
                url: '/updateTime',
                method: 'POST',
                body: timeData,
            }),
        }),
        /////////////////////////////////////////////
        getTime: builder.query({
            query: (id) => `/getTime/${id}`,
        }),
        //////////////////////////////////////////
        createTime: builder.mutation({
            query: (timeData) => ({
                url: '/createTime',
                method: 'POST',
                body: timeData,
            }),
        }),
    }),
});

// Export generated hooks
export const { useUpdateTimeMutation, useGetTimeQuery, useCreateTimeMutation } = timeApi;

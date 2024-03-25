// Import necessary modules
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the API slice
export const timeApi = createApi({
    reducerPath: 'timeApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
    endpoints: (builder) => ({
        updateTime: builder.mutation({
            query: (timeData) => ({
                url: '/updateTime',
                method: 'POST',
                body: timeData,
            }),
            invalidatesTags: ['Time'], // Invalidate 'Time' tag after updating
        }),
        getTime: builder.query({
            query: (id) => `/getTime/${id}`,
            providesTags: ['Time'], // Provide 'Time' tag after fetching
        }),
        createTime: builder.mutation({
            query: (timeData) => ({
                url: '/createTime',
                method: 'POST',
                body: timeData,
            }),
            invalidatesTags: ['Time'],
        }),
        getAllTimes: builder.query({
            query: () => '/getTime',
            providesTags: ['Time'],
        }),
        getBestEmployee: builder.query({
            query: () => ({
                url: '/bestemployee',
                method: 'GET',
            })
        }),
        getHoursWorked: builder.query({
            query: () => ({
                url: '/hoursworked',
                method: 'GET',
            }),
        }),        
    }),
});

// Export generated hooks
export const { useGetHoursWorkedQuery , useGetBestEmployeeQuery , useUpdateTimeMutation, useGetTimeQuery, useCreateTimeMutation, useGetAllTimesQuery } = timeApi;

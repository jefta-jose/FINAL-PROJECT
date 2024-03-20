import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const scheduleApi = createApi({
    reducerPath: 'scheduleApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/schedule/' }),
    tagTypes: ['schedule'],

    endpoints: (builder) => ({
        createSchedule: builder.mutation({
            query: (schedule) => ({
                url: '',
                method: 'POST',
                body: schedule
            }),
            invalidatesTags: ['schedule'],
        }),
        getScheduleByID: builder.query({
            query: (scheduleID) => scheduleID,
            providesTags: ['schedule'],
        }),
        updateSchedule: builder.mutation({
            query: ({ scheduleID, ...schedule }) => ({
                url: `/${scheduleID}`,
                method: 'PUT',
                body: schedule
            }),
            invalidatesTags: ['schedule'],
        }),
        deleteSchedule: builder.mutation({
            query: (scheduleID) => ({
                url: `/${scheduleID}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['schedule'],
        }),
    }),
});

export const {
    useCreateScheduleMutation,
    useGetScheduleByIDQuery,
    useUpdateScheduleMutation,
    useDeleteScheduleMutation
} = scheduleApi;

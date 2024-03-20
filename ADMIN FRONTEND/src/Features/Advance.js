import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const advanceApi = createApi({
    reducerPath: 'advanceApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
    tagTypes: ['advance'],

    endpoints: (builder) => ({
        createAdvanceRecord: builder.mutation({
            query: (record) => ({
                url: 'createAdvance',
                method: 'POST',
                body: record
            }),
            invalidatesTags: ['advance'],
        }),
        getAllAdvanceRecords: builder.query({
            query: () => '',
            providesTags: ['advance'],
        }),
        getAdvanceRecordById: builder.query({
            query: (id) => `getAdvanceById/${id}`,
            providesTags: ['advance'],
        }),
        deleteAdvanceRecord: builder.mutation({
            query: (id) => ({
                url: `deleteAdvance/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['advance'],
        }),
    }),
});

export const {
    useCreateAdvanceRecordMutation,
    useGetAllAdvanceRecordsQuery,
    useGetAdvanceRecordByIdQuery,
    useDeleteAdvanceRecordMutation
} = advanceApi;

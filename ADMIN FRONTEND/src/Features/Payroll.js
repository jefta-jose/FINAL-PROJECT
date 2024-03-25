import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


// Define the API slice
export const payrollApi = createApi({
    reducerPath: 'payrollApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
    endpoints: (builder) => ({
        createPayrollRecord: builder.mutation({
            query: (payrollData) => ({
                url: '/payroll',
                method: 'POST',
                body: payrollData,
            }),
        }),
        getAllPayrollRecords: builder.query({
            query: () => '/payroll',
        }),
        getPayrollRecordById: builder.query({
            query: (payrollId) => `/payroll/${payrollId}`,
        }),
        deletePayrollRecord: builder.mutation({
            query: (id) => ({
                url: `/payroll/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

// Export generated hooks
export const { useCreatePayrollRecordMutation, useGetAllPayrollRecordsQuery, useGetPayrollRecordByIdQuery, useDeletePayrollRecordMutation } = payrollApi;

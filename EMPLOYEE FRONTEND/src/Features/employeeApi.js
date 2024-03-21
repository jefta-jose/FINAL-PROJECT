import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const employeeApi = createApi({
    reducerPath: 'employeeApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }), // Adjusted base URL
    tagTypes: ['employee'],

    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({ Email, Password }) => ({
                url: 'employee/login', // Adjusted URL
                method: 'POST',
                body: { Email: Email, Password: Password },
                invalidateTags: ['employee'],
            }),
        }),
        getAllEmployees: builder.query({
            query: () => 'employee/', // Adjusted URL
            providesTags: ['employee'],
        }),
        updateEmployee: builder.mutation({
            query: ({ id, employeeData }) => ({
                url: `employee/${id}`, // Adjusted URL
                method: 'PUT',
                body: employeeData,
                invalidateTags: ['employee'],
            }),
        }),
        updateTime: builder.mutation({
            query: ({ EmployeeID, ClockInTime, ClockOutTime }) => ({
                url: 'updateTime', // Adjusted URL
                method: 'POST',
                body: { EmployeeID, ClockInTime, ClockOutTime },
                invalidateTags: ['employee'],
            }),
        }),
        createTime: builder.mutation({
            query: ({ EmployeeID, ClockInTime, ClockOutTime }) => ({
                url: 'createTime', // Adjusted URL
                method: 'POST',
                body: { EmployeeID, ClockInTime, ClockOutTime },
                invalidateTags: ['employee'],
            }),
        }),
        getTimeById: builder.query({
            query: (EmployeeID) => `getTimeByEmployeeID/${EmployeeID}`, // Adjusted URL
            providesTags: (result, error, arg) => [{ type: 'employee', id: arg }],
        }),
        upload: builder.mutation({
            query: (file) => ({
                url: 'upload-user-profile',
                method: 'POST',
                body: file
            })
        }),
    }),
});

export const { useUpdateEmployeeMutation ,useUploadMutation ,useLoginMutation, useGetAllEmployeesQuery, useUpdateTimeMutation, useCreateTimeMutation, useGetTimeByIdQuery } = employeeApi;

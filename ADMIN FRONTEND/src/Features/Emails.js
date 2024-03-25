import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const emailApi = createApi({
    reducerPath: 'emailApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
    tagTypes: ['email'],

    endpoints: (builder) => ({
        createEmail: builder.mutation({
            query: ({ EmployeeID, EmailSubject, EmailContent, Emailbody }) => ({
                url: '/email',
                method: 'POST',
                body: { EmployeeID, EmailSubject, EmailContent, Emailbody },
            }),
            invalidatesTags: ['email'],
        }),
        getEmail: builder.query({
            query: () => '/email',
            providesTags: ['email'],
        }),
        getEmailById: builder.query({
            query: (emailId) => `/email/${emailId}`,
            providesTags: ['email'],
        }),
        getTotalEmails: builder.query({
            query: () => ({
                url: 'emails',
                method: 'GET',
            }),
            invalidatesTags: ['email'],
        }),
    }),
});

export const { useGetTotalEmailsQuery, useCreateEmailMutation, useGetEmailQuery, useGetEmailByIdQuery } = emailApi;

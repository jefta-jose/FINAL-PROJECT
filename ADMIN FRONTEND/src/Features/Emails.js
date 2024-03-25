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
            invalidatesTags: ['email'], // Invalidate the 'email' tag after creating an email
        }),
        getEmail: builder.query({
            query: () => '/emails',
            providesTags: ['email'], // Provide the 'email' tag when fetching emails
        }),
        getEmailById: builder.query({
            query: (emailId) => `/email/${emailId}`,
            providesTags: ['email'], // Provide the 'email' tag when fetching a specific email
        })
    }),
});

export const { useCreateEmailMutation, useGetEmailQuery, useGetEmailByIdQuery } = emailApi;

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { employeeApi } from '../Features/Employee';
import { timeApi } from '../Features/Time';
import { payrollApi } from '../Features/Payroll';
import { advanceApi } from '../Features/Advance';
import { emailApi } from '../Features/Emails';

export const store = configureStore({
  reducer: {
    [employeeApi.reducerPath]: employeeApi.reducer,
    [timeApi.reducerPath]: timeApi.reducer,
    [payrollApi.reducerPath]: payrollApi.reducer,
    [advanceApi.reducerPath]: advanceApi.reducer,
    [emailApi.reducerPath]: emailApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(employeeApi.middleware, timeApi.middleware, payrollApi.middleware, advanceApi.middleware, emailApi.middleware),
});

setupListeners(store.dispatch);

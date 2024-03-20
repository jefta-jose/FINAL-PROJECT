import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import { employeeApi } from '../Features/employeeApi';

export const store = configureStore({
  reducer: {
    [employeeApi.reducerPath]: employeeApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(employeeApi.middleware)
});

setupListeners(store.dispatch);

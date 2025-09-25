import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './dashboardSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['dashboard/updateFilters'],
        ignoredPaths: ['dashboard.filters.dateRange.start', 'dashboard.filters.dateRange.end'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import metricsReducer from './metricSlice';
import filtersReducer from './filterSlice';

export const store = configureStore({
  reducer: {
    metrics: metricsReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

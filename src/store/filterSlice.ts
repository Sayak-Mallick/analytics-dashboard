import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface DateRange {
  start: Date;
  end: Date;
  label: string;
}

interface FiltersState {
  dateRange: DateRange;
  selectedTab: 'Campaigns' | 'Ad Groups' | 'Keywords' | 'Ads';
  sortBy: 'Spend' | 'Installs' | 'Conversions';
  sortOrder: 'asc' | 'desc';
  activeFilters: string[];
}

const initialState: FiltersState = {
  dateRange: {
    start: new Date('2025-07-05'),
    end: new Date('2025-07-11'),
    label: 'Last 7 Days',
  },
  selectedTab: 'Campaigns',
  sortBy: 'Spend',
  sortOrder: 'desc',
  activeFilters: [],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setDateRange: (state, action: PayloadAction<DateRange>) => {
      state.dateRange = action.payload;
    },
    setSelectedTab: (state, action: PayloadAction<'Campaigns' | 'Ad Groups' | 'Keywords' | 'Ads'>) => {
      state.selectedTab = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'Spend' | 'Installs' | 'Conversions'>) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },
    toggleFilter: (state, action: PayloadAction<string>) => {
      const filter = action.payload;
      const index = state.activeFilters.indexOf(filter);
      if (index >= 0) {
        state.activeFilters.splice(index, 1);
      } else {
        state.activeFilters.push(filter);
      }
    },
    clearFilters: (state) => {
      state.activeFilters = [];
    },
  },
});

export const {
  setDateRange,
  setSelectedTab,
  setSortBy,
  setSortOrder,
  toggleFilter,
  clearFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;

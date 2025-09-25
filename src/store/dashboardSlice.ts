import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { DashboardState, KPIMetric, CampaignData, ChartDataPoint, GeographicData, FilterState } from '../types/dashboard';

// Mock data generator
const generateMockData = () => {
  const kpis: KPIMetric[] = [
    {
      id: '1',
      title: 'Total Impressions',
      value: '2.4M',
      change: 12.5,
      trend: 'up',
      sparklineData: [20, 25, 22, 30, 28, 35, 40],
      isPositive: true
    },
    {
      id: '2',
      title: 'Click-through Rate',
      value: '3.2%',
      change: -2.1,
      trend: 'down',
      sparklineData: [40, 35, 38, 32, 30, 28, 32],
      isPositive: false
    },
    {
      id: '3',
      title: 'Cost Per Acquisition',
      value: '$24.50',
      change: -8.3,
      trend: 'down',
      sparklineData: [50, 48, 45, 42, 40, 38, 35],
      isPositive: true
    },
    {
      id: '4',
      title: 'Total Spend',
      value: '$6,109.89',
      change: 15.7,
      trend: 'up',
      sparklineData: [30, 32, 35, 38, 42, 45, 48],
      isPositive: false
    },
    {
      id: '5',
      title: 'Conversion Rate',
      value: '4.8%',
      change: 6.2,
      trend: 'up',
      sparklineData: [25, 28, 30, 32, 35, 38, 42],
      isPositive: true
    }
  ];

  const campaigns: CampaignData[] = [
    {
      id: '1',
      name: 'Discovery',
      country: 'India',
      type: 'Discovery',
      status: 'active',
      spend: 6109.89,
      installs: 44,
      conversions: 0,
      roas: 27.42,
      change: 27.42
    },
    {
      id: '2',
      name: 'Competitor',
      country: 'India',
      type: 'Competitor',
      status: 'active',
      spend: 6109.89,
      installs: 121,
      conversions: 0,
      roas: 27.42,
      change: 27.42
    },
    {
      id: '3',
      name: 'Today tab',
      country: 'India',
      type: 'Today tab',
      status: 'active',
      spend: 6109.89,
      installs: 44,
      conversions: 0,
      roas: 27.42,
      change: 27.42
    },
    {
      id: '4',
      name: 'Branding',
      country: 'India',
      type: 'Branding',
      status: 'active',
      spend: 6109.89,
      installs: 44,
      conversions: 0,
      roas: 27.42,
      change: 27.42
    }
  ];

  const chartData: ChartDataPoint[] = [
    { date: '5 July', spend: 4200, roas: 27.42 },
    { date: '6 July', spend: 5800, roas: 27.45 },
    { date: '7 July', spend: 6200, roas: 27.48 },
    { date: '8 July', spend: 4800, roas: 27.35 },
    { date: '9 July', spend: 5200, roas: 27.40 },
    { date: '10 July', spend: 6800, roas: 27.52 },
    { date: '11 July', spend: 6109.89, roas: 27.42 }
  ];

  const geographicData: GeographicData[] = [
    { country: 'India', spend: 6109.89, coordinates: [77.2090, 28.6139] },
    { country: 'United States', spend: 3500, coordinates: [-98.5795, 39.8283] },
    { country: 'United Kingdom', spend: 2100, coordinates: [-2.0, 54.0] },
    { country: 'Germany', spend: 1800, coordinates: [10.4515, 51.1657] }
  ];

  return { kpis, campaigns, chartData, geographicData };
};

const initialState: DashboardState = {
  kpis: [],
  campaigns: [],
  chartData: [],
  geographicData: [],
  filters: {
    dateRange: {
      start: new Date('2025-07-05'),
      end: new Date('2025-07-11'),
      preset: 'Last 7 Days'
    },
    campaign: 'all',
    adGroup: 'all',
    keywordCategory: 'all'
  },
  loading: false,
  error: null
};

// Async thunk for loading dashboard data
export const loadDashboardData = createAsyncThunk(
  'dashboard/loadData',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return generateMockData();
    } catch {
      return rejectWithValue('Failed to load dashboard data');
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    updateFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    toggleCampaignStatus: (state, action: PayloadAction<string>) => {
      const campaign = state.campaigns.find(c => c.id === action.payload);
      if (campaign) {
        campaign.status = campaign.status === 'active' ? 'paused' : 'active';
      }
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.kpis = action.payload.kpis;
        state.campaigns = action.payload.campaigns;
        state.chartData = action.payload.chartData;
        state.geographicData = action.payload.geographicData;
      })
      .addCase(loadDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { updateFilters, toggleCampaignStatus, clearError } = dashboardSlice.actions;
export default dashboardSlice.reducer;

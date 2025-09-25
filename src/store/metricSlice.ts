import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { summaryMetricsMock, storefrontsMock, trendsMock, topListMock, biggestChangesMock } from '../data/mockData';

export interface ConversionROAS {
  value: number;
  percentage: string;
  change: number; // positive or negative percentage
}

export interface SummaryMetric {
  label: string;
  value: string;
  percentage: string;
  change: number;
}

export interface StorefrontData {
  region: string;
  spend: number;
  coordinates?: [number, number];
}

export interface TrendData {
  date: string;
  spend: number;
  revenue: number;
  conversions: number;
}

export interface CampaignData {
  id: string;
  campaign: string;
  spend: number;
  installs: number;
  conversions: number;
  change: number;
  region: string;
}

interface MetricsState {
  totalSummary: SummaryMetric[];
  storefronts: StorefrontData[];
  trends: TrendData[];
  topList: CampaignData[];
  biggestChanges: CampaignData[];
  loading: boolean;
  error: string | null;
}

const initialState: MetricsState = {
  totalSummary: summaryMetricsMock,
  storefronts: storefrontsMock,
  trends: trendsMock,
  topList: topListMock,
  biggestChanges: biggestChangesMock,
  loading: false,
  error: null,
};

const metricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    updateMetrics: (state, action: PayloadAction<Partial<MetricsState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setLoading, setError, updateMetrics } = metricsSlice.actions;
export default metricsSlice.reducer;

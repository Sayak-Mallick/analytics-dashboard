export interface KPIMetric {
  id: string;
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  sparklineData: number[];
  isPositive: boolean;
}

export interface CampaignData {
  id: string;
  name: string;
  country: string;
  type: 'Discovery' | 'Competitor' | 'Today tab' | 'Branding';
  status: 'active' | 'paused';
  spend: number;
  installs: number;
  conversions: number;
  roas: number;
  change: number;
}

export interface ChartDataPoint {
  date: string;
  spend: number;
  installs?: number;
  conversions?: number;
  roas?: number;
}

export interface GeographicData {
  country: string;
  spend: number;
  coordinates: [number, number];
}

export interface FilterState {
  dateRange: {
    start: Date;
    end: Date;
    preset: string;
  };
  campaign: string;
  adGroup: string;
  keywordCategory: string;
}

export interface DashboardState {
  kpis: KPIMetric[];
  campaigns: CampaignData[];
  chartData: ChartDataPoint[];
  geographicData: GeographicData[];
  filters: FilterState;
  loading: boolean;
  error: string | null;
}

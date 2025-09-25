// Comprehensive Mock Data for Analytics Dashboard
// Generates ~500+ data points across different categories

const regions = ['India', 'US', 'UK', 'Canada', 'Germany', 'France', 'Japan', 'Australia', 'Brazil', 'Mexico', 'Singapore', 'UAE', 'South Korea', 'Italy', 'Spain', 'Netherlands', 'Sweden', 'Norway', 'Denmark', 'Finland'];

const campaignTypes = [
  'Discovery', 'Competitor', 'Today tab', 'Branding', 'Search', 'Display', 'Video', 'Social', 
  'Retargeting', 'Lookalike', 'Interest-based', 'Demographic', 'Behavioral', 'Geographic',
  'Custom Audience', 'App Install', 'Lead Generation', 'Conversion', 'Traffic', 'Awareness',
  'Engagement', 'App Promotion', 'Local', 'Shopping', 'Performance Max', 'Smart', 'Manual'
];

const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};

// Generate Storefronts Data (20 regions)
export const storefrontsMock = regions.map((region) => {
  const coordinates: { [key: string]: [number, number] } = {
    'India': [77.2090, 28.6139],
    'US': [-95.7129, 37.0902],
    'UK': [-3.4360, 55.3781],
    'Canada': [-106.3468, 56.1304],
    'Germany': [10.4515, 51.1657],
    'France': [2.2137, 46.2276],
    'Japan': [138.2529, 36.2048],
    'Australia': [133.7751, -25.2744],
    'Brazil': [-51.9253, -14.2350],
    'Mexico': [-102.5528, 23.6345],
    'Singapore': [103.8198, 1.3521],
    'UAE': [53.8478, 23.4241],
    'South Korea': [127.7669, 35.9078],
    'Italy': [12.5674, 41.8719],
    'Spain': [-3.7492, 40.4637],
    'Netherlands': [5.2913, 52.1326],
    'Sweden': [18.6435, 60.1282],
    'Norway': [8.4689, 60.4720],
    'Denmark': [9.5018, 56.2639],
    'Finland': [25.7482, 61.9241]
  };

  return {
    region,
    spend: Math.round((Math.random() * 50000 + 5000) * 100) / 100,
    coordinates: coordinates[region] || [0, 0]
  };
});

// Generate Trends Data (90 days of data)
export const trendsMock = Array.from({ length: 90 }, (_, index) => {
  const date = new Date('2025-06-27');
  date.setDate(date.getDate() + index);
  
  const baseSpend = 1500;
  const spendVariation = Math.sin(index / 7) * 300 + Math.random() * 200 - 100;
  const spend = Math.max(500, Math.round(baseSpend + spendVariation));
  
  const revenue = Math.round(spend * (2.5 + Math.random() * 1.5));
  const conversions = Math.round(spend / (20 + Math.random() * 10));
  
  return {
    date: formatDate(date),
    spend,
    revenue,
    conversions
  };
});

// Generate Campaign Data (200 campaigns)
const generateCampaignData = (count: number) => {
  return Array.from({ length: count }, (_, index) => {
    const campaignType = campaignTypes[Math.floor(Math.random() * campaignTypes.length)];
    const region = regions[Math.floor(Math.random() * regions.length)];
    const locationSuffix = Math.random() > 0.5 ? ' (LOC)' : '';
    
    const spend = Math.round((Math.random() * 15000 + 1000) * 100) / 100;
    const installs = Math.round(spend / (40 + Math.random() * 60));
    const conversions = Math.round(installs * (0.1 + Math.random() * 0.3));
    const change = Math.round((Math.random() * 100 - 50) * 100) / 100;
    
    return {
      id: (index + 1).toString(),
      campaign: `${campaignType}${locationSuffix}`,
      spend,
      installs,
      conversions,
      change,
      region
    };
  });
};

export const topListMock = generateCampaignData(200);

// Generate Biggest Changes (campaigns with significant changes)
export const biggestChangesMock = generateCampaignData(100)
  .map(campaign => ({
    ...campaign,
    change: Math.random() > 0.5 
      ? Math.round((Math.random() * 75 + 25) * 100) / 100  // Positive changes: 25% to 100%
      : Math.round((Math.random() * -75 - 25) * 100) / 100  // Negative changes: -25% to -100%
  }))
  .sort((a, b) => Math.abs(b.change) - Math.abs(a.change));

// Generate Summary Metrics
export const summaryMetricsMock = [
  {
    label: 'Total Spend',
    value: `$${topListMock.reduce((sum, campaign) => sum + campaign.spend, 0).toLocaleString()}`,
    percentage: '+15.7%',
    change: 15.7
  },
  {
    label: 'Total Revenue',
    value: `$${Math.round(topListMock.reduce((sum, campaign) => sum + campaign.spend * 3.2, 0)).toLocaleString()}`,
    percentage: '+22.4%',
    change: 22.4
  },
  {
    label: 'Total Conversions',
    value: topListMock.reduce((sum, campaign) => sum + campaign.conversions, 0).toLocaleString(),
    percentage: '+8.9%',
    change: 8.9
  },
  {
    label: 'ROAS',
    value: '3.2x',
    percentage: '+12.3%',
    change: 12.3
  },
  {
    label: 'Total Installs',
    value: topListMock.reduce((sum, campaign) => sum + campaign.installs, 0).toLocaleString(),
    percentage: '+18.5%',
    change: 18.5
  },
  {
    label: 'Cost per Install',
    value: `$${Math.round((topListMock.reduce((sum, campaign) => sum + campaign.spend, 0) / topListMock.reduce((sum, campaign) => sum + campaign.installs, 0)) * 100) / 100}`,
    percentage: '-5.2%',
    change: -5.2
  },
  {
    label: 'Conversion Rate',
    value: `${Math.round((topListMock.reduce((sum, campaign) => sum + campaign.conversions, 0) / topListMock.reduce((sum, campaign) => sum + campaign.installs, 0)) * 100 * 100) / 100}%`,
    percentage: '+3.1%',
    change: 3.1
  }
];

// Additional utility functions for data manipulation
export const getTopCampaignsBySpend = (limit: number = 10) => {
  return [...topListMock]
    .sort((a, b) => b.spend - a.spend)
    .slice(0, limit);
};

export const getTopCampaignsByConversions = (limit: number = 10) => {
  return [...topListMock]
    .sort((a, b) => b.conversions - a.conversions)
    .slice(0, limit);
};

export const getCampaignsByRegion = (region: string) => {
  return topListMock.filter(campaign => campaign.region === region);
};

export const getTrendsForDateRange = (startDate: string, endDate: string) => {
  return trendsMock.filter(trend => 
    trend.date >= startDate && trend.date <= endDate
  );
};

// Export all data for easy access
export const mockData = {
  storefronts: storefrontsMock,
  trends: trendsMock,
  topList: topListMock,
  biggestChanges: biggestChangesMock,
  summaryMetrics: summaryMetricsMock
};

export default mockData;

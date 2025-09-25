import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import type { CampaignData } from '../store/metricSlice';

// Custom hook for data filtering and analytics
export const useAnalyticsData = () => {
  const { topList, biggestChanges, trends, storefronts, totalSummary } = useSelector(
    (state: RootState) => state.metrics
  );

  // Analytics calculations
  const analytics = useMemo(() => {
    const totalSpend = topList.reduce((sum, campaign) => sum + campaign.spend, 0);
    const totalInstalls = topList.reduce((sum, campaign) => sum + campaign.installs, 0);
    const totalConversions = topList.reduce((sum, campaign) => sum + campaign.conversions, 0);
    const totalRevenue = trends.reduce((sum, day) => sum + day.revenue, 0);

    const avgCPI = totalSpend / totalInstalls;
    const conversionRate = (totalConversions / totalInstalls) * 100;
    const roas = totalRevenue / totalSpend;

    return {
      totalSpend,
      totalInstalls,
      totalConversions,
      totalRevenue,
      avgCPI,
      conversionRate,
      roas,
    };
  }, [topList, trends]);

  // Top performers by different metrics
  const topPerformers = useMemo(() => {
    const bySpend = [...topList]
      .sort((a, b) => b.spend - a.spend)
      .slice(0, 5);
    
    const byConversions = [...topList]
      .sort((a, b) => b.conversions - a.conversions)
      .slice(0, 5);

    const byInstalls = [...topList]
      .sort((a, b) => b.installs - a.installs)
      .slice(0, 5);

    const byROI = [...topList]
      .filter(campaign => campaign.spend > 0)
      .sort((a, b) => (b.conversions / b.spend) - (a.conversions / a.spend))
      .slice(0, 5);

    return {
      bySpend,
      byConversions,
      byInstalls,
      byROI,
    };
  }, [topList]);

  // Regional performance
  const regionalPerformance = useMemo(() => {
    const regionData: { [region: string]: { campaigns: number; spend: number; installs: number; conversions: number } } = {};

    topList.forEach(campaign => {
      if (!regionData[campaign.region]) {
        regionData[campaign.region] = { campaigns: 0, spend: 0, installs: 0, conversions: 0 };
      }
      
      regionData[campaign.region].campaigns += 1;
      regionData[campaign.region].spend += campaign.spend;
      regionData[campaign.region].installs += campaign.installs;
      regionData[campaign.region].conversions += campaign.conversions;
    });

    return Object.entries(regionData).map(([region, data]) => ({
      region,
      ...data,
      avgCPI: data.spend / data.installs,
      conversionRate: (data.conversions / data.installs) * 100,
    })).sort((a, b) => b.spend - a.spend);
  }, [topList]);

  // Trend analysis
  const trendAnalysis = useMemo(() => {
    if (trends.length < 2) return null;

    const recent = trends.slice(-7); // Last 7 days
    const previous = trends.slice(-14, -7); // Previous 7 days

    const recentAvg = {
      spend: recent.reduce((sum, day) => sum + day.spend, 0) / recent.length,
      revenue: recent.reduce((sum, day) => sum + day.revenue, 0) / recent.length,
      conversions: recent.reduce((sum, day) => sum + day.conversions, 0) / recent.length,
    };

    const previousAvg = {
      spend: previous.reduce((sum, day) => sum + day.spend, 0) / previous.length,
      revenue: previous.reduce((sum, day) => sum + day.revenue, 0) / previous.length,
      conversions: previous.reduce((sum, day) => sum + day.conversions, 0) / previous.length,
    };

    return {
      spendTrend: ((recentAvg.spend - previousAvg.spend) / previousAvg.spend) * 100,
      revenueTrend: ((recentAvg.revenue - previousAvg.revenue) / previousAvg.revenue) * 100,
      conversionTrend: ((recentAvg.conversions - previousAvg.conversions) / previousAvg.conversions) * 100,
    };
  }, [trends]);

  // Filter functions
  const filterCampaignsByRegion = (region: string): CampaignData[] => {
    return topList.filter(campaign => campaign.region === region);
  };

  const filterCampaignsBySpendRange = (min: number, max: number): CampaignData[] => {
    return topList.filter(campaign => campaign.spend >= min && campaign.spend <= max);
  };

  const getCampaignsByDateRange = (startDate: string, endDate: string) => {
    return trends.filter(trend => 
      trend.date >= startDate && trend.date <= endDate
    );
  };

  return {
    // Raw data
    topList,
    biggestChanges,
    trends,
    storefronts,
    totalSummary,
    
    // Computed analytics
    analytics,
    topPerformers,
    regionalPerformance,
    trendAnalysis,
    
    // Filter functions
    filterCampaignsByRegion,
    filterCampaignsBySpendRange,
    getCampaignsByDateRange,
  };
};

export default useAnalyticsData;

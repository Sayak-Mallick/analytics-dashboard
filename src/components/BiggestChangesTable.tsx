import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import type { RootState } from '../store';
import { setSelectedTab } from '../store/filterSlice';
import { useAnalyticsData } from '../hooks/useAnalyticsData';

const BiggestChangesTable: React.FC = () => {
  const dispatch = useDispatch();
  const { biggestChanges } = useAnalyticsData(); // Use filtered data from analytics hook
  const { selectedTab } = useSelector((state: RootState) => state.filters);
  
  // Sorting state
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Show only top 10 biggest changes with sorting
  const displayedChanges = useMemo(() => {
    const sorted = [...biggestChanges].sort((a, b) => {
      if (sortOrder === 'desc') {
        return b.spend - a.spend;
      } else {
        return a.spend - b.spend;
      }
    });
    return sorted.slice(0, 10);
  }, [biggestChanges, sortOrder]);

  const tabs = ['Campaigns', 'Ad Groups', 'Keywords', 'Ads'] as const;

  const handleTabChange = (tab: typeof tabs[number]) => {
    dispatch(setSelectedTab(tab));
  };

  const handleSortToggle = () => {
    setSortOrder(prevOrder => prevOrder === 'desc' ? 'asc' : 'desc');
  };

  const getChangeBarColor = (change: number) => {
    if (change < 0) {
      // Negative changes (losses) - Orange colors
      if (Math.abs(change) > 20) return 'bg-orange-500';
      if (Math.abs(change) > 10) return 'bg-orange-400';
      return 'bg-orange-300';
    } else {
      // Positive changes (gains) - Yellow colors
      if (Math.abs(change) > 20) return 'bg-yellow-500';
      if (Math.abs(change) > 10) return 'bg-yellow-400';
      return 'bg-yellow-300';
    }
  };

  const getChangeBarWidth = (change: number) => {
    const maxChange = Math.max(...displayedChanges.map(c => Math.abs(c.change)));
    return `${(Math.abs(change) / maxChange) * 50}%`; // 50% max width for each side
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
    >
      <h3 className="text-lg font-medium text-black mb-6">Biggest Changes</h3>

      {/* Tabs */}
      <div className="flex space-x-6 mb-6 border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`pb-3 text-sm font-medium transition-colors relative ${
              selectedTab === tab
                ? 'text-black border-b-2 border-black'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-2 gap-4 py-3 border-b border-gray-100 text-sm font-medium text-gray-600 mb-4">
        <button 
          onClick={handleSortToggle}
          className="flex items-center hover:text-gray-800 transition-colors cursor-pointer text-left"
        >
          Spend
          {sortOrder === 'desc' ? (
            <ChevronDownIcon className="w-4 h-4 ml-1" />
          ) : (
            <ChevronUpIcon className="w-4 h-4 ml-1" />
          )}
        </button>
      </div>

      {/* Table Rows with Progress Bars */}
      <div className="space-y-3">
        {displayedChanges.map((campaign, index) => {
          return (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="flex items-center justify-between py-2"
            >
              {/* Left side - Campaign info */}
              <div className="flex items-center space-x-3 flex-1">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-black text-sm truncate">{campaign.campaign}</div>
                  <div className="text-xs text-gray-500">{campaign.region}</div>
                </div>
              </div>

              {/* Center - Bidirectional Progress Bar */}
              <div className="flex-1 mx-4">
                <div className="relative flex items-center h-5">
                  {/* Background track */}
                  <div className="absolute inset-0 bg-gray-100 rounded-full h-4"></div>
                  
                  {/* Center divider */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-5 bg-gray-300 z-10"></div>
                  
                  {/* Progress bar - extends from center */}
                  <div className="relative w-full h-4 flex items-center">
                    {campaign.change >= 0 ? (
                      /* Positive change - extends to the right from center */
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: getChangeBarWidth(campaign.change) }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                        className={`h-4 ml-[50%] ${getChangeBarColor(campaign.change)}`}
                      />
                    ) : (
                      /* Negative change - extends to the left from center */
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: getChangeBarWidth(campaign.change) }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                        className={`h-4 ml-auto mr-[50%] ${getChangeBarColor(campaign.change)}`}
                        style={{ marginLeft: `${50 - parseFloat(getChangeBarWidth(campaign.change))}%` }}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Right side - Spend and change */}
              <div className="text-right flex-shrink-0">
                <div className="font-semibold text-gray-900 text-sm">
                  ${campaign.spend.toLocaleString()}
                </div>
                <div className={`text-xs font-medium ${campaign.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {campaign.change > 0 ? '+' : ''}{campaign.change.toFixed(2)}%
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom spacing */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="text-xs text-gray-500 text-center">
          Showing top performing campaigns with highest growth
        </div>
      </div>
    </motion.div>
  );
};

export default BiggestChangesTable;

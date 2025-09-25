import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import type { RootState } from '../store';
import { setSelectedTab } from '../store/filterSlice';

const BiggestChangesTable: React.FC = () => {
  const dispatch = useDispatch();
  const { biggestChanges } = useSelector((state: RootState) => state.metrics);
  const { selectedTab } = useSelector((state: RootState) => state.filters);

  // Show only top 10 biggest changes
  const displayedChanges = useMemo(() => {
    return biggestChanges.slice(0, 10);
  }, [biggestChanges]);

  const tabs = ['Campaigns', 'Ad Groups', 'Keywords', 'Ads'] as const;

  const handleTabChange = (tab: typeof tabs[number]) => {
    dispatch(setSelectedTab(tab));
  };

  const getChangeBarColor = (change: number) => {
    if (change > 20) return 'bg-green-500';
    if (change > 10) return 'bg-green-400';
    if (change > 0) return 'bg-yellow-400';
    if (change < -20) return 'bg-red-500';
    if (change < -10) return 'bg-red-400';
    if (change < 0) return 'bg-orange-400';
    return 'bg-gray-300';
  };

  const getChangeBarWidth = (change: number) => {
    const maxChange = Math.max(...displayedChanges.map(c => Math.abs(c.change)));
    return `${(Math.abs(change) / maxChange) * 100}%`;
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
        <div className="flex items-center">
          Spend
          <ChevronDownIcon className="w-4 h-4 ml-1" />
        </div>
      </div>

      {/* Table Rows with Progress Bars */}
      <div className="space-y-4">
        {displayedChanges.map((campaign, index) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <div className="font-medium text-black text-sm">{campaign.campaign}</div>
                  <div className="text-xs text-gray-500">{campaign.region}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-700 text-sm">
                  ${campaign.spend.toLocaleString()}
                </div>
                <div className={`text-xs font-medium ${campaign.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {campaign.change > 0 ? '+' : ''}{campaign.change}%
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="relative">
              <div className="w-full bg-gray-100 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: getChangeBarWidth(campaign.change) }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                  className={`h-2 rounded-full ${getChangeBarColor(campaign.change)}`}
                />
              </div>
            </div>
          </motion.div>
        ))}
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

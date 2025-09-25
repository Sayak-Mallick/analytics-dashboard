import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import type { RootState } from '../store';
import { setSelectedTab, setSortBy, setSortOrder } from '../store/filterSlice';
import { useAnalyticsData } from '../hooks/useAnalyticsData';

const TopListTable: React.FC = () => {
  const dispatch = useDispatch();
  const { topList } = useAnalyticsData(); // Use filtered data from analytics hook
  const { selectedTab, sortBy, sortOrder } = useSelector((state: RootState) => state.filters);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const tabs = ['Campaigns', 'Ad Groups', 'Keywords', 'Ads'] as const;
  const sortColumns = ['Spend', 'Installs', 'Conversions'] as const;

  const handleTabChange = (tab: typeof tabs[number]) => {
    dispatch(setSelectedTab(tab));
  };

  const handleSort = (column: typeof sortColumns[number]) => {
    if (sortBy === column) {
      dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      dispatch(setSortBy(column));
      dispatch(setSortOrder('desc'));
    }
  };

  const getSortIcon = (column: string) => {
    if (sortBy !== column) return null;
    return (
      <ChevronDownIcon
        className={`w-4 h-4 ml-1 transition-transform ${
          sortOrder === 'asc' ? 'rotate-180' : ''
        }`}
      />
    );
  };

  // Sort and paginate data
  const sortedData = useMemo(() => {
    const sorted = [...topList].sort((a, b) => {
      let aValue: number;
      let bValue: number;
      
      switch (sortBy) {
        case 'Spend':
          aValue = a.spend;
          bValue = b.spend;
          break;
        case 'Installs':
          aValue = a.installs;
          bValue = b.installs;
          break;
        case 'Conversions':
          aValue = a.conversions;
          bValue = b.conversions;
          break;
        default:
          aValue = a.spend;
          bValue = b.spend;
      }
      
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });
    
    return sorted;
  }, [topList, sortBy, sortOrder]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
    >
      <h3 className="text-lg font-medium text-black mb-6">Top List</h3>

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
      <div className="grid grid-cols-4 gap-4 py-3 border-b border-gray-100 text-sm font-medium text-gray-600">
        <div>Campaign</div>
        {sortColumns.map((column) => (
          <button
            key={column}
            onClick={() => handleSort(column)}
            className="flex items-center justify-start hover:text-gray-900 transition-colors"
          >
            {column}
            {getSortIcon(column)}
          </button>
        ))}
      </div>

      {/* Table Rows */}
      <div className="space-y-3 mt-4">
        {paginatedData.map((campaign, index) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="grid grid-cols-4 gap-4 py-3 text-sm border-b border-gray-50 last:border-b-0"
          >
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <div className="font-medium text-black">{campaign.campaign}</div>
                <div className="text-xs text-gray-500">{campaign.region}</div>
              </div>
            </div>
            <div className="font-semibold text-gray-700">
              ${campaign.spend.toLocaleString()}
              <div className="text-xs text-orange-500 font-normal">+{campaign.change}%</div>
            </div>
            <div className="font-semibold text-gray-700">
              {campaign.installs}
              <div className="text-xs text-orange-500 font-normal">+{campaign.change}%</div>
            </div>
            <div className="font-semibold text-gray-700">
              {campaign.conversions.toFixed(2)}%
              <div className="text-xs text-gray-500 font-normal">{campaign.conversions}%</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} campaigns
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeftIcon className="w-4 h-4 mr-1" />
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRightIcon className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TopListTable;

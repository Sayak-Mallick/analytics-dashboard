import React from 'react';
import { Calendar, ChevronDown, Download, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import type { FilterState } from '../types/dashboard';

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: Partial<FilterState>) => void;
  onRefresh: () => void;
  onExport: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFiltersChange,
  onRefresh,
  onExport
}) => {
  const datePresets = [
    'Today',
    'Yesterday', 
    'Last 7 Days',
    'Last 30 Days',
    'This Month',
    'Last Month',
    'Custom Range'
  ];

  const campaigns = [
    { value: 'all', label: 'All Campaigns' },
    { value: 'discovery', label: 'Discovery' },
    { value: 'competitor', label: 'Competitor' },
    { value: 'today-tab', label: 'Today Tab' },
    { value: 'branding', label: 'Branding' }
  ];

  const adGroups = [
    { value: 'all', label: 'All Ad Groups' },
    { value: 'keywords', label: 'Keywords' },
    { value: 'search-match', label: 'Search Match' },
    { value: 'category', label: 'Category' }
  ];

  const keywordCategories = [
    { value: 'all', label: 'All Keywords' },
    { value: 'broad', label: 'Broad Match' },
    { value: 'exact', label: 'Exact Match' },
    { value: 'brand', label: 'Brand Terms' }
  ];

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6"
    >
      <div className="flex flex-wrap items-center gap-4">
        {/* Date Range Picker */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Date Range:</label>
          <div className="relative">
            <select 
              value={filters.dateRange.preset}
              onChange={(e) => onFiltersChange({
                dateRange: {
                  ...filters.dateRange,
                  preset: e.target.value
                }
              })}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {datePresets.map(preset => (
                <option key={preset} value={preset}>{preset}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-1" />
            Jul 5 - Jul 11, 2025
          </div>
        </div>

        {/* Campaign Filter */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Campaign:</label>
          <div className="relative">
            <select 
              value={filters.campaign}
              onChange={(e) => onFiltersChange({ campaign: e.target.value })}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {campaigns.map(campaign => (
                <option key={campaign.value} value={campaign.value}>{campaign.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Ad Group Filter */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Ad Group:</label>
          <div className="relative">
            <select 
              value={filters.adGroup}
              onChange={(e) => onFiltersChange({ adGroup: e.target.value })}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {adGroups.map(adGroup => (
                <option key={adGroup.value} value={adGroup.value}>{adGroup.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Keyword Category Filter */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Keywords:</label>
          <div className="relative">
            <select 
              value={filters.keywordCategory}
              onChange={(e) => onFiltersChange({ keywordCategory: e.target.value })}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {keywordCategories.map(category => (
                <option key={category.value} value={category.value}>{category.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 ml-auto">
          <button
            onClick={onRefresh}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
          
          <button
            onClick={onExport}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterPanel;

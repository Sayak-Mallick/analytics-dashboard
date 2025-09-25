import React from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { CalendarIcon, FunnelIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { type RootState } from '../store';
import { setDateRange } from '../store/filterSlice';

const Filters: React.FC = () => {
  const dispatch = useDispatch();
  const { dateRange } = useSelector((state: RootState) => state.filters);

  const handleDateRangeChange = (label: string, days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    
    dispatch(setDateRange({
      start,
      end,
      label
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex items-center justify-between mb-8 bg-white rounded-lg p-4 shadow-sm border border-gray-100"
    >
      <div className="flex items-center space-x-4">
        {/* PDF Export Button */}
        <div className="flex items-center space-x-2 px-3 py-2 border border-gray-200 rounded-lg">
          <div className="w-4 h-4 bg-red-500 rounded-sm flex items-center justify-center">
            <span className="text-white text-xs font-bold">P</span>
          </div>
          <span className="text-sm text-gray-600">Pdf Name</span>
          <ChevronDownIcon className="w-4 h-4 text-gray-400" />
        </div>

        {/* Filter Button */}
        <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors">
          <FunnelIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Date Range Picker */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg bg-white">
          <CalendarIcon className="w-4 h-4 text-gray-500" />
          <div className="text-right">
            <div className="text-xs text-gray-500">{dateRange.label}</div>
            <div className="text-sm font-medium text-black">
              {dateRange.start.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })} - {dateRange.end.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
          </div>
        </div>

        {/* Quick Date Range Options */}
        <div className="hidden md:flex items-center space-x-2">
          <button
            onClick={() => handleDateRangeChange('Last 7 Days', 7)}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              dateRange.label === 'Last 7 Days'
                ? 'bg-orange-100 text-orange-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => handleDateRangeChange('Last 30 Days', 30)}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              dateRange.label === 'Last 30 Days'
                ? 'bg-orange-100 text-orange-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            30 Days
          </button>
          <button
            onClick={() => handleDateRangeChange('Last 90 Days', 90)}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              dateRange.label === 'Last 90 Days'
                ? 'bg-orange-100 text-orange-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            90 Days
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Filters;

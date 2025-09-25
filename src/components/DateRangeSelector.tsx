import React, { useState, useRef, useEffect } from 'react';
import { CalendarIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { setDateRange } from '../store/filterSlice';
import type { RootState } from '../store';

const DateRangeSelector: React.FC = () => {
  const dispatch = useDispatch();
  const { dateRange } = useSelector((state: RootState) => state.filters);
  const [isOpen, setIsOpen] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [showCustom, setShowCustom] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Predefined date ranges
  const predefinedRanges = [
    { label: 'Last 7 Days', days: 7 },
    { label: 'Last 14 Days', days: 14 },
    { label: 'Last 30 Days', days: 30 },
    { label: 'Last 60 Days', days: 60 },
    { label: 'Last 90 Days', days: 90 },
    { label: 'This Month', custom: true, start: new Date('2025-07-01'), end: new Date('2025-07-31') },
    { label: 'Last Month', custom: true, start: new Date('2025-06-01'), end: new Date('2025-06-30') },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowCustom(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePredefinedRangeSelect = (range: { label: string; days?: number; custom?: boolean; start?: Date; end?: Date }) => {
    let start: Date, end: Date;
    
    if (range.days) {
      end = new Date();
      start = new Date();
      start.setDate(end.getDate() - range.days);
    } else if (range.custom && range.start && range.end) {
      start = new Date(range.start);
      end = new Date(range.end);
    } else {
      return;
    }
    
    dispatch(setDateRange({ start, end, label: range.label }));
    setIsOpen(false);
    setShowCustom(false);
  };

  const handleCustomRangeApply = () => {
    if (customStartDate && customEndDate) {
      const start = new Date(customStartDate);
      const end = new Date(customEndDate);
      
      if (start <= end) {
        const label = 'Custom Range';
        dispatch(setDateRange({ start, end, label }));
        setIsOpen(false);
        setShowCustom(false);
        setCustomStartDate('');
        setCustomEndDate('');
      } else {
        alert('Start date must be before or equal to end date');
      }
    }
  };

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    if (showCustom) {
      setCustomStartDate(formatDateForInput(dateRange.start));
      setCustomEndDate(formatDateForInput(dateRange.end));
    }
  }, [showCustom, dateRange]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors cursor-pointer"
      >
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
        <ChevronDownIcon 
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Select Date Range</h3>
            
            {!showCustom ? (
              <div className="space-y-2">
                {predefinedRanges.map((range) => (
                  <button
                    key={range.label}
                    onClick={() => handlePredefinedRangeSelect(range)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 transition-colors ${
                      dateRange.label === range.label 
                        ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                        : 'text-gray-700'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
                
                <div className="border-t pt-2 mt-2">
                  <button
                    onClick={() => setShowCustom(true)}
                    className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Custom Range
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex space-x-2 pt-2">
                  <button
                    onClick={() => setShowCustom(false)}
                    className="flex-1 px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleCustomRangeApply}
                    disabled={!customStartDate || !customEndDate}
                    className="flex-1 px-3 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeSelector;

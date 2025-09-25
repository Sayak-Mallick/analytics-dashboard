import { ChevronDown, Bell, User, Menu, Search } from 'lucide-react';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { setDateRange } from '../store/filterSlice';
import { type RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header = ({ onMenuToggle }: HeaderProps) => {
  const dispatch = useDispatch();
  const { dateRange } = useSelector((state: RootState) => state.filters);

  const handleDateRangeChange = (label: string, days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    dispatch(setDateRange({start,end,label }));
  };
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white shadow-sm border-b mb-8 border-gray-200 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        {/* Left side - Logo and Navigation */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>

          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Overview dashboard</h1>
                <p className="text-sm text-gray-500">A consolidated view of your app efficiency by storefronts and key metrics.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Controls and User */}
        <div className="flex items-center space-x-4">
          {/* App Selector */}
          <div className="hidden sm:flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
            <div className="w-5 h-5 bg-red-500 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">P</span>
            </div>
            <span className="text-sm font-medium text-gray-700">Pdf Name</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>

          {/* Date Range */}
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
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <User className="h-5 w-5" />
            </button>
          </div>

          {/* Menu Toggle for Mobile */}
          <button className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors">
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </motion.header>
  )
}

export default Header

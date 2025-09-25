import { Calendar, ChevronDown, Bell, User, Menu, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header = ({ onMenuToggle }: HeaderProps) => {
  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white shadow-sm border-b border-gray-200 px-6 py-4"
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
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
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
          <div className="hidden md:flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Last 7 Days</span>
            <span className="text-sm text-gray-500">Jul 5 - Jul 11, 2025</span>
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

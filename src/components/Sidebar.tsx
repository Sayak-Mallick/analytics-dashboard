import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HomeIcon,
  ChartBarIcon,
  MegaphoneIcon,
  MagnifyingGlassIcon,
  PhotoIcon,
  BoltIcon,
  ClockIcon,
  CogIcon,
  QuestionMarkCircleIcon,
  UserCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

interface SidebarProps {
  onToggle?: (isCollapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onToggle?.(newCollapsed);
  };

  const menuItems = [
    { icon: HomeIcon, active: true, label: 'Home' },
    { icon: ChartBarIcon, active: false, label: 'Analytics' },
    { icon: MegaphoneIcon, active: false, label: 'Campaigns' },
    { icon: MagnifyingGlassIcon, active: false, label: 'Search' },
    { icon: PhotoIcon, active: false, label: 'Media' },
    { icon: BoltIcon, active: false, label: 'Performance' },
    { icon: ClockIcon, active: false, label: 'History' },
  ];

  const bottomItems = [
    { icon: CogIcon, active: false, label: 'Settings' },
    { icon: QuestionMarkCircleIcon, active: false, label: 'Help' },
    { icon: UserCircleIcon, active: false, label: 'Profile' },
  ];
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ 
          opacity: 1, 
          x: 0,
          width: isCollapsed ? '64px' : '240px'
        }}
        transition={{ duration: 0.3 }}
        className={`fixed left-0 top-0 h-full ${isCollapsed ? 'w-16' : 'w-60'} bg-orange-500 flex flex-col py-6 z-50 transition-all duration-300`}
      >
        {/* Toggle Button */}
        <div className="absolute -right-3 top-8 z-10">
          <button
            onClick={handleToggle}
            className="w-6 h-6 bg-orange-500 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRightIcon className="w-3 h-3" />
            ) : (
              <ChevronLeftIcon className="w-3 h-3" />
            )}
          </button>
        </div>

        <div className={`flex flex-col ${isCollapsed ? 'items-center' : 'px-6'}`}>
          {/* Logo */}
          <div className={`flex items-center mb-8 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
            </div>
            {!isCollapsed && (
              <span className="ml-3 text-white font-semibold text-lg">Dashboard</span>
            )}
          </div>

          {/* Main Menu Items */}
          <div className={`flex flex-col ${isCollapsed ? 'space-y-6 items-center' : 'space-y-2 w-full'} mb-auto`}>
            {menuItems.map((item, index) => (
              <motion.button
                key={index}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`${isCollapsed ? 'w-8 h-8' : 'w-full h-10 px-3'} flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} rounded-lg transition-colors ${
                  item.active
                    ? 'bg-white text-orange-500'
                    : 'text-white hover:bg-orange-400'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {!isCollapsed && (
                  <span className="ml-3 text-sm font-medium">{item.label}</span>
                )}
              </motion.button>
            ))}
          </div>

          {/* Bottom Menu Items */}
          <div className={`flex flex-col ${isCollapsed ? 'space-y-4 items-center' : 'space-y-2 w-full'}`}>
            {bottomItems.map((item, index) => (
              <motion.button
                key={index}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: (menuItems.length + index) * 0.1 }}
                className={`${isCollapsed ? 'w-8 h-8' : 'w-full h-10 px-3'} flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} rounded-lg text-gray-300 hover:text-white hover:bg-orange-400 transition-colors`}
              >
                <item.icon className="w-5 h-5" />
                {!isCollapsed && (
                  <span className="ml-3 text-sm font-medium">{item.label}</span>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default Sidebar

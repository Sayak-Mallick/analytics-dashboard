/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { 
  BarChart3, 
  Target, 
  Users, 
  Settings, 
  HelpCircle,
  Clock,
  DollarSign,
  TrendingUp,
  Search,
  X,
  ArrowRight,
  Hash,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem?: string;
  onItemClick?: (item: string) => void;
  onSearchSelect?: (type: string, item: any) => void;
}

interface SearchResult {
  type: 'menu' | 'campaign' | 'keyword' | 'metric';
  title: string;
  subtitle?: string;
  icon: React.ComponentType<any>;
  data?: any;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeItem = 'Overview', onItemClick, onSearchSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // Get dashboard data from Redux store
  const { campaigns, kpis } = useSelector((state: RootState) => state.dashboard);
  const menuItems = useMemo(() => [
    { icon: BarChart3, label: 'Overview' },
    { icon: Target, label: 'Campaigns' },
    { icon: Search, label: 'Keywords' },
    { icon: TrendingUp, label: 'Performance' },
    { icon: DollarSign, label: 'Budget' },
    { icon: Users, label: 'Audiences' },
    { icon: Clock, label: 'Reports' },
    { icon: Settings, label: 'Settings' },
    { icon: HelpCircle, label: 'Help' },
  ], []);

  const handleItemClick = (label: string) => {
    if (onItemClick) {
      onItemClick(label);
    }
    // Clear search when navigating
    setSearchQuery('');
    setIsSearchFocused(false);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const handleSearchSelect = (result: SearchResult) => {
    if (result.type === 'menu') {
      handleItemClick(result.title);
    } else if (onSearchSelect) {
      onSearchSelect(result.type, result.data);
    }
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  // Search results logic
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    const results: SearchResult[] = [];
    
    // Search menu items
    menuItems.forEach(item => {
      if (item.label.toLowerCase().includes(query)) {
        results.push({
          type: 'menu',
          title: item.label,
          subtitle: 'Navigation',
          icon: item.icon,
          data: item
        });
      }
    });
    
    // Search campaigns
    campaigns.forEach(campaign => {
      if (campaign.name.toLowerCase().includes(query) || 
          campaign.type.toLowerCase().includes(query) ||
          campaign.country.toLowerCase().includes(query)) {
        results.push({
          type: 'campaign',
          title: campaign.name,
          subtitle: `${campaign.type} • ${campaign.country}`,
          icon: Target,
          data: campaign
        });
      }
    });
    
    // Search KPIs/metrics
    kpis.forEach(kpi => {
      if (kpi.title.toLowerCase().includes(query)) {
        results.push({
          type: 'metric',
          title: kpi.title,
          subtitle: `${kpi.value} • ${kpi.change > 0 ? '+' : ''}${kpi.change}%`,
          icon: Hash,
          data: kpi
        });
      }
    });
    
    // Add some common search terms
    const commonSearches = [
      { term: 'performance', label: 'Performance', icon: TrendingUp },
      { term: 'budget', label: 'Budget', icon: DollarSign },
      { term: 'campaign', label: 'Campaigns', icon: Target },
      { term: 'keyword', label: 'Keywords', icon: Search },
      { term: 'report', label: 'Reports', icon: Clock },
    ];
    
    commonSearches.forEach(search => {
      if (search.term.includes(query) && !results.some(r => r.title === search.label)) {
        results.push({
          type: 'menu',
          title: search.label,
          subtitle: 'Quick access',
          icon: search.icon,
          data: { label: search.label }
        });
      }
    });
    
    return results.slice(0, 8); // Limit results
  }, [searchQuery, menuItems, campaigns, kpis]);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ type: 'tween', duration: 0.3 }}
        className={`fixed left-0 top-0 z-30 w-64 h-full bg-orange-500 text-white shadow-lg lg:relative lg:translate-x-0 lg:shadow-none lg:block ${isOpen ? 'block' : 'hidden lg:block'}`}
      >
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            </div>
            <span className="text-lg font-semibold">Apple Search Ads</span>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-orange-200" />
              <input
                type="text"
                placeholder="Search dashboard..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg pl-10 pr-10 py-2.5 text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-200 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            
            {/* Search Results */}
            <AnimatePresence>
              {(isSearchFocused && searchQuery) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 overflow-y-auto z-50"
                >
                  {searchResults.length > 0 ? (
                    <div className="py-2">
                      {searchResults.map((result, index) => {
                        const Icon = result.icon;
                        return (
                          <motion.button
                            key={`${result.type}-${result.title}-${index}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => handleSearchSelect(result)}
                            className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors group"
                          >
                            <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                              result.type === 'menu' ? 'bg-orange-100 text-orange-600' :
                              result.type === 'campaign' ? 'bg-blue-100 text-blue-600' :
                              result.type === 'metric' ? 'bg-green-100 text-green-600' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-gray-900 truncate">
                                {result.title}
                              </div>
                              {result.subtitle && (
                                <div className="text-xs text-gray-500 truncate">
                                  {result.subtitle}
                                </div>
                              )}
                            </div>
                            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                          </motion.button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-8 px-4 text-center text-gray-500">
                      <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                      <div className="text-sm">No results found</div>
                      <div className="text-xs text-gray-400 mt-1">
                        Try searching for campaigns, metrics, or menu items
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {!searchQuery && menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.label}
                  onClick={() => handleItemClick(item.label)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeItem === item.label 
                      ? 'bg-white bg-opacity-20 text-white' 
                      : 'text-orange-100 hover:bg-white hover:bg-opacity-10 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <div className="text-sm font-medium mb-1">Need help?</div>
            <div className="text-xs text-orange-100 mb-3">
              Check our documentation and support resources
            </div>
            <button className="w-full bg-white text-orange-500 px-3 py-2 rounded-md text-sm font-medium hover:bg-opacity-90 transition-colors">
              Get Support
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;

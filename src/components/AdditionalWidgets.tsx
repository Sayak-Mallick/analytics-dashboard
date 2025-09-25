import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Smartphone, Tablet, Monitor, Crown, Star } from 'lucide-react';

interface AdditionalWidgetsProps {
  loading?: boolean;
}

const AdditionalWidgets: React.FC<AdditionalWidgetsProps> = ({ loading }) => {
  const topKeywords = [
    { keyword: 'pdf reader', impressions: '125K', ctr: '4.2%', position: 1 },
    { keyword: 'document viewer', impressions: '98K', ctr: '3.8%', position: 2 },
    { keyword: 'file converter', impressions: '87K', ctr: '3.5%', position: 3 },
    { keyword: 'mobile scanner', impressions: '76K', ctr: '3.2%', position: 4 },
    { keyword: 'office tools', impressions: '65K', ctr: '2.9%', position: 5 },
  ];

  const devicePerformance = [
    { device: 'iPhone', icon: Smartphone, spend: 3254.33, installs: 89, percentage: 53 },
    { device: 'iPad', icon: Tablet, spend: 1876.45, installs: 45, percentage: 31 },
    { device: 'Mac', icon: Monitor, spend: 979.11, installs: 23, percentage: 16 },
  ];

  const timeOfDayData = [
    { hour: '00:00', performance: 15 },
    { hour: '04:00', performance: 8 },
    { hour: '08:00', performance: 45 },
    { hour: '12:00', performance: 78 },
    { hour: '16:00', performance: 65 },
    { hour: '20:00', performance: 92 },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-4 w-1/2"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Top Performing Keywords */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Top Keywords</h3>
            <p className="text-sm text-gray-500">Best performing search terms</p>
          </div>
          <Crown className="h-5 w-5 text-yellow-500" />
        </div>
        
        <div className="space-y-4">
          {topKeywords.map((keyword, index) => (
            <motion.div
              key={keyword.keyword}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    index === 0 ? 'bg-yellow-500 text-white' :
                    index === 1 ? 'bg-gray-400 text-white' :
                    index === 2 ? 'bg-orange-500 text-white' :
                    'bg-gray-300 text-gray-700'
                  }`}>
                    {keyword.position}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {keyword.keyword}
                  </div>
                  <div className="text-xs text-gray-500">
                    {keyword.impressions} impressions
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-green-600">
                  {keyword.ctr}
                </div>
                <div className="text-xs text-gray-500">CTR</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Device Performance Breakdown */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Device Performance</h3>
            <p className="text-sm text-gray-500">Spend and installs by device type</p>
          </div>
          <Smartphone className="h-5 w-5 text-blue-500" />
        </div>
        
        <div className="space-y-4">
          {devicePerformance.map((device, index) => {
            const Icon = device.icon;
            return (
              <motion.div
                key={device.device}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">
                      {device.device}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {device.percentage}%
                  </span>
                </div>
                
                <div className="mb-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${device.percentage}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    ${device.spend.toLocaleString()} spend
                  </span>
                  <span className="text-gray-600">
                    {device.installs} installs
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Time of Day Performance */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Time Performance</h3>
            <p className="text-sm text-gray-500">Performance by hour of day</p>
          </div>
          <Clock className="h-5 w-5 text-purple-500" />
        </div>
        
        <div className="space-y-3">
          {timeOfDayData.map((data, index) => (
            <motion.div
              key={data.hour}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              className="flex items-center justify-between"
            >
              <div className="text-sm font-medium text-gray-700 w-16">
                {data.hour}
              </div>
              <div className="flex-1 mx-3">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${data.performance}%` }}
                    transition={{ delay: 0.5 + 0.1 * index, duration: 0.8 }}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
                  ></motion.div>
                </div>
              </div>
              <div className="text-sm text-gray-600 w-12 text-right">
                {data.performance}%
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-purple-50 rounded-lg">
          <div className="flex items-center text-sm text-purple-700">
            <Star className="h-4 w-4 mr-2" />
            Peak performance: 8:00 PM - 10:00 PM
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdditionalWidgets;

import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { MapPin, Globe } from 'lucide-react';
import { type RootState } from '../store';

const StorefrontsMap: React.FC = () => {
  const { storefronts } = useSelector((state: RootState) => state.metrics);
  const totalSpend = storefronts.reduce((sum, item) => sum + item.spend, 0);

  const maxSpend = Math.max(...storefronts.map(s => s.spend));

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-black">Storefronts</h3>
          <p className="text-sm text-gray-500">Spend by geographic location</p>
        </div>
        <div className="flex items-center space-x-2">
          <Globe className="h-5 w-5 text-orange-500" />
          <span className="text-sm font-medium text-gray-700">Global Distribution</span>
        </div>
      </div>
      
      {/* World Map Visualization with Image */}
      <div className="relative h-80 bg-white rounded-xl overflow-hidden border border-gray-200 mb-4">
        {/* World map background image */}
        <div className="absolute inset-0">
          <img 
            src="/world-map.png" 
            alt="World Map"
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        {/* Country data points with accurate positioning */}
        <div className="absolute inset-0">
          {storefronts.map((region, index) => {
            const size = 32; // Fixed uniform small size for all markers
            
            // Accurate positioning based on the world map
            const positions: { [key: string]: { top: string; left: string } } = {
              'India': { top: '45%', left: '68%' },
              'US': { top: '35%', left: '18%' },
              'UK': { top: '25%', left: '48%' },
              'Canada': { top: '28%', left: '22%' },
            };
            
            const position = positions[region.region] || { top: '50%', left: '50%' };
            
            return (
              <motion.div
                key={region.region}
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.2, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                className="absolute group z-10"
                style={{
                  top: position.top,
                  left: position.left,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {/* Pulsing background effect */}
                <div 
                  className="absolute inset-0 bg-orange-400 rounded-full animate-ping opacity-30"
                  style={{ width: size, height: size }}
                ></div>
                
                {/* Main marker */}
                <div 
                  className="relative bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-white group-hover:scale-110"
                  style={{ width: size, height: size }}
                >
                  <MapPin className="text-white drop-shadow" size={14} />
                </div>
                
                {/* Enhanced info tooltip */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 + 0.5 }}
                  className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 z-20"
                >
                  <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200 min-w-max">
                    <div className="text-sm font-bold text-gray-900">{region.region}</div>
                    <div className="text-lg font-bold text-orange-600">
                      ${region.spend.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">Total Spend</div>
                  </div>
                  
                  {/* Tooltip arrow */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <div className="w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg border border-gray-200 z-10">
          <div className="flex items-center space-x-2 mb-2">
            <Globe className="h-5 w-5 text-orange-600" />
            <span className="text-sm font-semibold text-gray-900">Global Storefronts</span>
          </div>
          <div className="text-xs text-gray-600">
            Total: ${totalSpend.toLocaleString()}
          </div>
        </div>
        
        {/* Spend indicator */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border border-gray-200 z-10">
          <div className="text-xs text-gray-600 flex items-center space-x-1">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span>Spend Amount</span>
          </div>
        </div>
      </div>
      
      {/* Regional Data Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {storefronts.map((region, index) => (
          <motion.div
            key={region.region}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="bg-gray-50 rounded-lg p-3 text-center"
          >
            <div className="text-xs font-medium text-gray-700 mb-1">
              {region.region}
            </div>
            <div className="text-sm font-semibold text-gray-900">
              ${region.spend.toLocaleString()}
            </div>
            <div className="mt-2">
              <div
                className="h-1 bg-orange-500 rounded-full"
                style={{
                  width: `${(region.spend / maxSpend) * 100}%`,
                  minWidth: '2px'
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default StorefrontsMap;

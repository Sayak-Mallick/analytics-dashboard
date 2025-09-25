import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import type { ChartDataPoint, GeographicData } from '../types/dashboard';
import { TrendingUp, Globe, BarChart3, MapPin } from 'lucide-react';

interface ChartsSectionProps {
  chartData: ChartDataPoint[];
  geographicData: GeographicData[];
  loading?: boolean;
}

const COLORS = ['#FF6B35', '#F7931E', '#FFD23F', '#06FFA5', '#4ECDC4', '#45B7D1'];

const WorldMapVisualization: React.FC<{ data: GeographicData[] }> = ({ data }) => {
  const totalSpend = data.reduce((sum, item) => sum + item.spend, 0);
  
  return (
    <div className="relative h-80 bg-white rounded-xl overflow-hidden border border-gray-200">
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
        {data.map((item, index) => {
          const size = Math.max(40, Math.min(80, (item.spend / totalSpend) * 200));
          
          // More accurate positioning based on the actual world map
          const positions = [
            { top: '45%', left: '68%', name: 'India' },      // India - center of India
            { top: '35%', left: '18%', name: 'United States' }, // USA - center of continental US
            { top: '25%', left: '48%', name: 'United Kingdom' }, // UK - British Isles
            { top: '28%', left: '52%', name: 'Germany' },    // Germany - central Europe
          ];
          
          const position = positions.find(p => p.name === item.country) || positions[index];
          
          return (
            <motion.div
              key={item.country}
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
                className="relative bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border-4 border-white group-hover:scale-110"
                style={{ width: size, height: size }}
              >
                <MapPin className="text-white drop-shadow" size={Math.max(16, size / 3)} />
              </div>
              
              {/* Enhanced info tooltip */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 + 0.5 }}
                className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 z-20"
              >
                <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200 min-w-max">
                  <div className="text-sm font-bold text-gray-900">{item.country}</div>
                  <div className="text-lg font-bold text-orange-600">
                    ${item.spend.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">Land Area Spend</div>
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
      
      {/* Enhanced legend */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg border border-gray-200 z-10">
        <div className="flex items-center space-x-2 mb-2">
          <Globe className="h-5 w-5 text-orange-600" />
          <span className="text-sm font-semibold text-gray-900">Global Land Area Distribution</span>
        </div>
        <div className="text-xs text-gray-600">
          Total: ${totalSpend.toLocaleString()}
        </div>
      </div>
      
      {/* Zoom indicator */}
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border border-gray-200 z-10">
        <div className="text-xs text-gray-600 flex items-center space-x-1">
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          <span>Land Area Spend</span>
        </div>
      </div>
    </div>
  );
};

const ChartsSection: React.FC<ChartsSectionProps> = ({ chartData, geographicData, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Trends Chart */}
      <motion.div 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Trends</h3>
            <p className="text-sm text-gray-500">Performance over time</p>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-orange-500" />
            <span className="text-sm font-medium text-gray-700">Spend</span>
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Spend']}
            />
            <Line 
              type="monotone" 
              dataKey="spend" 
              stroke="#FF6B35" 
              strokeWidth={3}
              dot={{ fill: '#FF6B35', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, stroke: '#FF6B35', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Geographic Storefronts */}
      <motion.div 
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Storefronts</h3>
            <p className="text-sm text-gray-500">Spend by geographic location</p>
          </div>
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-orange-500" />
            <span className="text-sm font-medium text-gray-700">Global Distribution</span>
          </div>
        </div>
        
        <WorldMapVisualization data={geographicData} />
        
        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4">
          {geographicData.map((item, index) => (
            <div key={item.country} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <span className="text-sm text-gray-700">{item.country}</span>
              <span className="text-sm font-medium text-gray-900">
                ${item.spend.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ChartsSection;

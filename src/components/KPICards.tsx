import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import type { KPIMetric } from '../types/dashboard';

interface KPICardsProps {
  kpis: KPIMetric[];
  loading?: boolean;
}

const SparkLine: React.FC<{ data: number[]; isPositive: boolean }> = ({ data, isPositive }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = range === 0 ? 50 : 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg className="w-16 h-8" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke={isPositive ? '#10B981' : '#EF4444'}
        strokeWidth="3"
        points={points}
        className="opacity-80"
      />
    </svg>
  );
};

const KPICards: React.FC<KPICardsProps> = ({ kpis, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-8 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {kpis.map((kpi, index) => (
        <motion.div
          key={kpi.id}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">{kpi.title}</h3>
            <div className="flex items-center space-x-2">
              {kpi.trend === 'up' ? (
                <TrendingUp className={`h-4 w-4 ${kpi.isPositive ? 'text-green-500' : 'text-red-500'}`} />
              ) : kpi.trend === 'down' ? (
                <TrendingDown className={`h-4 w-4 ${kpi.isPositive ? 'text-red-500' : 'text-green-500'}`} />
              ) : null}
            </div>
          </div>
          
          <div className="mb-4">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {kpi.value}
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium ${
                kpi.isPositive 
                  ? (kpi.change > 0 ? 'text-green-600' : 'text-red-600')
                  : (kpi.change > 0 ? 'text-red-600' : 'text-green-600')
              }`}>
                {kpi.change > 0 ? '+' : ''}{kpi.change}%
              </span>
              <SparkLine data={kpi.sparklineData} isPositive={kpi.isPositive} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default KPICards;

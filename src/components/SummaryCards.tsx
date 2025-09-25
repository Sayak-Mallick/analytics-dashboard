import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { type RootState } from '../store';

const SummaryCards: React.FC = () => {
  const { totalSummary } = useSelector((state: RootState) => state.metrics);

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-500';
    if (change < 0) return 'text-orange-500';
    return 'text-gray-400';
  };

  return (
    <div className="mb-8 p-4">
      <h2 className="text-xl font-medium text-black mb-6">Total Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
        {totalSummary.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-md p-4 border border-gray-100"
          >
            <div className="text-sm text-gray-600 mb-2">{metric.label}</div>
            <div className="text-lg font-bold text-black mb-1">{metric.value}</div>
            <div className={`text-sm font-medium ${getChangeColor(metric.change)}`}>
              {metric.percentage}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SummaryCards;

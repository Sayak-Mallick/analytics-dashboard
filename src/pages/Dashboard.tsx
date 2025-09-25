import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import SummaryCards from '../components/SummaryCards';
import StorefrontsMap from '../components/StorefrontsMap';
import TrendsChart from '../components/TrendsChart';
import TopListTable from '../components/TopListTable';
import BiggestChangesTable from '../components/BiggestChangesTable';
import Header from '../components/Header';

const Dashboard: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar onToggle={setSidebarCollapsed} />
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-60'}`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className=""
        >

          <Header onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

          {/* Summary Cards */}
          <SummaryCards />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 p-4">
            <StorefrontsMap />
            <TrendsChart />
          </div>

          {/* Tables Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
            <TopListTable />
            <BiggestChangesTable />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;

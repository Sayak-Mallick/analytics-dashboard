import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import type { RootState } from '../store';
import { loadDashboardData } from '../store/dashboardSlice';
import Header from '../components/Header';
import Sidebar from '../layouts/Sidebar';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('Overview');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    dispatch(loadDashboardData() as any);
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(loadDashboardData() as any);
  };

  const handleMenuItemClick = (item: string) => {
    setActiveMenuItem(item);
    // You can add navigation logic here for different sections
    console.log(`Navigated to: ${item}`);
  };

  const handleSearchSelect = (type: string, item: unknown) => {
    console.log(`Search selected: ${type}`, item);
    // Handle different search result types
    switch (type) {
      case 'campaign':
        // Could navigate to campaign details or filter campaigns
        console.log(`Selected campaign:`, item);
        break;
      case 'metric':
        // Could highlight the metric or show details
        console.log(`Selected metric:`, item);
        break;
      case 'keyword':
        // Could navigate to keywords section
        setActiveMenuItem('Keywords');
        break;
      default:
        break;
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 max-w-md"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-red-500 rounded-full"></div>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Dashboard</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </motion.div>
      </div>
    );
  }
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeItem={activeMenuItem}
          onItemClick={handleMenuItemClick}
          onSearchSelect={handleSearchSelect}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        </div>
      </div>
    </>
  )
}

export default Dashboard

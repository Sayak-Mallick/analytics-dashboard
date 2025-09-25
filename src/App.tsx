function App() {

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
              <p className="text-3xl font-bold text-blue-600">12,543</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-700">Revenue</h3>
              <p className="text-3xl font-bold text-green-600">$45,231</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-700">Page Views</h3>
              <p className="text-3xl font-bold text-purple-600">98,742</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-700">Conversion Rate</h3>
              <p className="text-3xl font-bold text-orange-600">3.2%</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">New user registered</span>
                  <span className="text-sm text-gray-400">2 min ago</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Order completed</span>
                  <span className="text-sm text-gray-400">5 min ago</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Payment processed</span>
                  <span className="text-sm text-gray-400">10 min ago</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Desktop</span>
                    <span className="text-sm text-gray-600">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '65%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Mobile</span>
                    <span className="text-sm text-gray-600">35%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '35%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

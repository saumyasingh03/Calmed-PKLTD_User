import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import {
  BarChart3,
  Users,
  Settings,
  Bell,
  Search,
  Plus,
  FileText,
  Target,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  User,
  Calendar,
  MoreHorizontal,
  Cpu,
  HardDrive,
  Database,
  Activity,
  UserPlus,
  FolderPlus,
  Download,
  Edit,
  Image,
  UserCheck
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Stats data with your original categories
  const stats = [
    { title: 'Total Users', value: '1,234', subtitle: '+12% this week', color: 'blue', icon: Users },
    { title: 'Resources', value: '56', subtitle: '+8% this month', color: 'green', icon: FileText },
    { title: 'Gallery Items', value: '89', subtitle: '+15% this week', color: 'purple', icon: Image },
    { title: 'Active Partners', value: '24', subtitle: 'In progress', color: 'orange', icon: UserCheck }
  ];

  const recentActivity = [
    {
      user: user?.firstName || 'Admin',
      action: 'updated gallery items',
      role: 'Administrator',
      time: '10:15:53 PM',
      avatar: user?.firstName?.charAt(0) || 'A',
      color: 'bg-blue-500'
    },
    {
      user: 'Content Manager',
      action: 'added new resource',
      role: 'Manager',
      time: '8:45:03 PM',
      avatar: 'CM',
      color: 'bg-green-500'
    },
    {
      user: 'Partner Admin',
      action: 'updated partner information',
      role: 'Partner',
      time: '7:08:34 PM',
      avatar: 'PA',
      color: 'bg-purple-500'
    },
    {
      user: 'System Admin',
      action: 'modified user permissions',
      role: 'Admin',
      time: '6:22:23 PM',
      avatar: 'SA',
      color: 'bg-orange-500'
    },
    {
      user: 'Gallery Manager',
      action: 'uploaded new images',
      role: 'Manager',
      time: '5:30:14 PM',
      avatar: 'GM',
      color: 'bg-red-500'
    }
  ];

  const teamMembers = [
    { name: user?.fullName || 'Administrator', role: 'Super Admin', score: '98%', avatar: user?.firstName?.charAt(0) || 'A', color: 'bg-blue-500' },
    { name: 'Content Manager', role: 'Content Manager', score: '95%', avatar: 'CM', color: 'bg-purple-500' },
    { name: 'Gallery Admin', role: 'Gallery Manager', score: '92%', avatar: 'GA', color: 'bg-green-500' }
  ];

  const systemStats = [
    { label: 'Server Load', value: 45, color: 'bg-blue-500' },
    { label: 'Memory Usage', value: 67, color: 'bg-green-500' },
    { label: 'Storage', value: 80, color: 'bg-yellow-500' }
  ];

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'resources', label: 'Resources', icon: FileText },
    { id: 'gallery', label: 'Gallery Management', icon: Image },
    { id: 'partners', label: 'Partner Management', icon: UserCheck },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'content', label: 'Content Management', icon: Edit }
  ];

  const analyticsItems = [
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'data', label: 'Data Management', icon: Database },
    { id: 'insights', label: 'User Insights', icon: Activity }
  ];

  const systemItems = [
    { id: 'settings', label: 'System Settings', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-xl font-bold text-blue-600">AdminPanel</h1>
        </div>

        {/* Search */}
        <div className="px-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search (CTRL + K)"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 space-y-1">
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Management</h3>
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-3 py-2.5 text-sm rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.label}
              </button>
            ))}
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Analytics</h3>
            {analyticsItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-3 py-2.5 text-sm rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.label}
              </button>
            ))}
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">System</h3>
            {systemItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-3 py-2.5 text-sm rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.firstName || 'Administrator'}! 👋</h1>
              <p className="text-gray-600 text-sm">Here's what's happening with your admin panel today</p>
              <p className="text-gray-400 text-xs">Last updated 3s ago</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full">24h</span>
                <span className="px-3 py-1 bg-blue-600 text-white rounded-full">7d</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full">30d</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full">90d</span>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Download className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg relative transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">5</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${
                    stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                    stat.color === 'green' ? 'bg-green-100 text-green-600' :
                    stat.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1 text-gray-900">{stat.value}</h3>
                  <p className="text-gray-600 text-sm mb-2">{stat.title}</p>
                  <p className={`text-xs font-medium ${
                    stat.color === 'green' ? 'text-green-600' :
                    stat.color === 'orange' ? 'text-orange-600' :
                    'text-blue-600'
                  }`}>
                    {stat.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Performance Chart */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
                  <p className="text-gray-600 text-sm">Content management trends over time</p>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreHorizontal className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              
              {/* Mock Chart */}
              <div className="relative h-64">
                <svg className="w-full h-full" viewBox="0 0 400 200">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1"/>
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  
                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4].map(i => (
                    <line key={i} x1="0" y1={i * 40} x2="400" y2={i * 40} stroke="#E5E7EB" strokeWidth="1"/>
                  ))}
                  
                  {/* Chart line */}
                  <path
                    d="M 50 150 Q 100 120 150 100 T 250 80 T 350 60"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    fill="none"
                  />
                  
                  {/* Data points */}
                  {[
                    { x: 50, y: 150 },
                    { x: 150, y: 100 },
                    { x: 250, y: 80 },
                    { x: 350, y: 60 }
                  ].map((point, i) => (
                    <circle key={i} cx={point.x} cy={point.y} r="4" fill="#3B82F6"/>
                  ))}
                  
                  {/* Fill area */}
                  <path
                    d="M 50 150 Q 100 120 150 100 T 250 80 T 350 60 L 350 200 L 50 200 Z"
                    fill="url(#gradient)"
                  />
                </svg>
                
                {/* Legend */}
                <div className="absolute bottom-4 left-4 flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">Content Created</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Users Added</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-6 text-gray-900">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group">
                  <UserPlus className="w-6 h-6 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-blue-700 font-medium">Add User</span>
                </button>
                <button className="flex flex-col items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group">
                  <FileText className="w-6 h-6 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-purple-700 font-medium">New Resource</span>
                </button>
                <button className="flex flex-col items-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group">
                  <Image className="w-6 h-6 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-green-700 font-medium">Upload Image</span>
                </button>
                <button className="flex flex-col items-center p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors group">
                  <BarChart3 className="w-6 h-6 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-orange-700 font-medium">View Reports</span>
                </button>
              </div>

              {/* System Status */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">System Status</h4>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600 font-medium">All Systems Operational</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {systemStats.map((stat, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">{stat.label}</span>
                        <span className="font-medium text-gray-900">{stat.value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${stat.color} transition-all duration-500`}
                          style={{ width: `${stat.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View all</button>
              </div>
              
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`w-8 h-8 ${activity.color} rounded-full flex items-center justify-center text-white text-sm font-medium`}>
                      {activity.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-medium text-gray-900">{activity.user}</span>
                        <span className="text-gray-600"> {activity.action}</span>
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">{activity.role}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Overview */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Admin Team</h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Manage team</button>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">8</div>
                  <div className="text-gray-600 text-sm">Total Admins</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">6</div>
                  <div className="text-gray-600 text-sm">Active</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">3</div>
                  <div className="text-gray-600 text-sm">Online</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4 text-gray-900">Top Performers</h4>
                <div className="space-y-3">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 ${member.color} rounded-full flex items-center justify-center text-white text-sm font-medium`}>
                          {member.avatar}
                        </div>
                        <div>
                          <div className="font-medium text-sm text-gray-900">{member.name}</div>
                          <div className="text-gray-500 text-xs">{member.role}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-sm text-gray-900">{member.score}</div>
                        <div className="text-gray-500 text-xs">Score</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
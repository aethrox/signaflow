import { useState, useEffect } from 'react';
import { Users, Mail, TrendingUp } from 'lucide-react';

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const metrics = [
    {
      title: 'Total Employees',
      value: '248',
      icon: Users,
      color: '#2563EB',
      bgColor: '#EFF6FF',
    },
    {
      title: 'Active Signatures',
      value: '248',
      icon: Mail,
      color: '#10B981',
      bgColor: '#ECFDF5',
    },
    {
      title: 'Email Sent',
      value: '12,457',
      icon: TrendingUp,
      color: '#F59E0B',
      bgColor: '#FEF3C7',
    },
  ];

  const recentActivity = [
    { user: 'Ahmet Yılmaz', action: 'Updated email signature', time: '2 hours ago' },
    { user: 'Ayşe Demir', action: 'Changed template to Professional', time: '4 hours ago' },
    { user: 'Mehmet Kaya', action: 'Added new banner campaign', time: '5 hours ago' },
    { user: 'Zeynep Aydın', action: 'Updated contact information', time: '1 day ago' },
    { user: 'Can Öztürk', action: 'Joined the platform', time: '2 days ago' },
  ];

  return (
    <div>
      <div className="mb-6 md:mb-8">
        <h1 className="text-[#1F2937] text-2xl md:text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-[#6B7280] text-sm md:text-base">Welcome back! Here's what's happening with your email signatures.</p>
      </div>

      {isLoading ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
                <div className="animate-pulse">
                  <div className="h-10 w-10 md:h-12 md:w-12 bg-gray-200 rounded-lg mb-3 md:mb-4"></div>
                  <div className="h-8 md:h-12 bg-gray-200 rounded w-24 md:w-32 mb-1 md:mb-2"></div>
                  <div className="h-3 md:h-4 bg-gray-200 rounded w-28 md:w-36"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-100">
              <div className="h-5 md:h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-3 md:px-6 h-10 md:h-12 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-3 md:px-6 h-10 md:h-12 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider hidden sm:table-cell">
                      Action
                    </th>
                    <th className="px-3 md:px-6 h-10 md:h-12 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map(i => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="px-3 md:px-6 h-14 md:h-16">
                        <div className="flex items-center gap-2 md:gap-3 animate-pulse">
                          <div className="h-8 w-8 md:h-10 md:w-10 bg-gray-200 rounded-full flex-shrink-0"></div>
                          <div className="space-y-2 flex-1">
                            <div className="h-3 md:h-4 bg-gray-200 rounded w-28 md:w-32"></div>
                            <div className="h-3 bg-gray-200 rounded w-24 sm:hidden"></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 md:px-6 h-14 md:h-16 hidden sm:table-cell">
                        <div className="animate-pulse">
                          <div className="h-3 md:h-4 bg-gray-200 rounded w-36 md:w-48"></div>
                        </div>
                      </td>
                      <td className="px-3 md:px-6 h-14 md:h-16">
                        <div className="animate-pulse">
                          <div className="h-3 md:h-4 bg-gray-200 rounded w-20 md:w-24"></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: metric.bgColor }}
                >
                  <Icon size={20} className="md:w-6 md:h-6" style={{ color: metric.color }} />
                </div>
              </div>
              <div className="text-3xl md:text-5xl font-bold text-[#1F2937] mb-1 md:mb-2">{metric.value}</div>
              <div className="text-xs md:text-sm text-[#6B7280]">{metric.title}</div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-100">
          <h2 className="text-base md:text-lg font-bold text-[#1F2937]">Recent Activity</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-3 md:px-6 h-10 md:h-12 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                  User
                </th>
                <th className="px-3 md:px-6 h-10 md:h-12 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider hidden sm:table-cell">
                  Action
                </th>
                <th className="px-3 md:px-6 h-10 md:h-12 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((activity, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-3 md:px-6 h-14 md:h-16">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#E0E7FF] flex items-center justify-center text-[#2563EB] font-semibold text-xs md:text-sm flex-shrink-0">
                        {activity.user.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs md:text-sm font-medium text-[#1F2937] truncate">{activity.user}</div>
                        <div className="text-xs text-[#6B7280] sm:hidden truncate">{activity.action}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 md:px-6 h-14 md:h-16 text-xs md:text-sm text-[#6B7280] hidden sm:table-cell">{activity.action}</td>
                  <td className="px-3 md:px-6 h-14 md:h-16 text-xs md:text-sm text-[#6B7280]">{activity.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        </>
      )}
    </div>
  );
}

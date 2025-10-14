import { Users, Mail, TrendingUp } from 'lucide-react';

export function Dashboard() {
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
      <div className="mb-8">
        <h1 className="text-[#1F2937] text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-[#6B7280]">Welcome back! Here's what's happening with your email signatures.</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-10">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: metric.bgColor }}
                >
                  <Icon size={24} style={{ color: metric.color }} />
                </div>
              </div>
              <div className="text-5xl font-bold text-[#1F2937] mb-2">{metric.value}</div>
              <div className="text-sm text-[#6B7280]">{metric.title}</div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-[#1F2937]">Recent Activity</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 h-12 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 h-12 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 h-12 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
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
                  <td className="px-6 h-16">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#E0E7FF] flex items-center justify-center text-[#2563EB] font-semibold text-sm">
                        {activity.user.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-medium text-[#1F2937]">{activity.user}</span>
                    </div>
                  </td>
                  <td className="px-6 h-16 text-sm text-[#6B7280]">{activity.action}</td>
                  <td className="px-6 h-16 text-sm text-[#6B7280]">{activity.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

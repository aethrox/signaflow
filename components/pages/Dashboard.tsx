import { Users, FileText, Megaphone, Plus, Edit } from 'lucide-react';
import { MetricCard } from '../MetricCard';
import { Button } from '../ui/button';

export function Dashboard() {
  const recentActivity = [
    { name: 'Sarah Johnson', email: 'sarah.j@company.com', department: 'Marketing', date: '2025-10-14' },
    { name: 'Michael Chen', email: 'michael.c@company.com', department: 'Engineering', date: '2025-10-13' },
    { name: 'Emma Williams', email: 'emma.w@company.com', department: 'Sales', date: '2025-10-13' },
    { name: 'James Brown', email: 'james.b@company.com', department: 'HR', date: '2025-10-12' },
    { name: 'Lisa Anderson', email: 'lisa.a@company.com', department: 'Finance', date: '2025-10-11' },
  ];

  return (
    <div className="p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Welcome back, John!</h1>
        <p className="text-gray-600">Here's what's happening with your email signatures today.</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Total Employees"
          value="247"
          icon={Users}
        />
        <MetricCard
          title="Active Template"
          value="Professional"
          icon={FileText}
          subtitle="Updated 3 days ago"
          badge={{ text: 'Active', variant: 'success' }}
        />
        <MetricCard
          title="Active Campaigns"
          value="2"
          icon={Megaphone}
          badge={{ text: 'Running', variant: 'info' }}
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-gray-900 mb-4">Recent Activity</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-600 text-sm">Employee Name</th>
                  <th className="text-left py-3 px-4 text-gray-600 text-sm">Email</th>
                  <th className="text-left py-3 px-4 text-gray-600 text-sm">Department</th>
                  <th className="text-left py-3 px-4 text-gray-600 text-sm">Date Added</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((activity, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 text-gray-900">{activity.name}</td>
                    <td className="py-3 px-4 text-gray-600">{activity.email}</td>
                    <td className="py-3 px-4 text-gray-600">{activity.department}</td>
                    <td className="py-3 px-4 text-gray-500 text-sm">{activity.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button className="w-full justify-start bg-[#2563EB] hover:bg-[#1d4ed8]">
              <Plus className="w-4 h-4 mr-2" />
              Add Employee
            </Button>
            <Button variant="outline" className="w-full justify-start border-gray-300">
              <Edit className="w-4 h-4 mr-2" />
              Edit Template
            </Button>
            <Button variant="outline" className="w-full justify-start border-gray-300">
              <Megaphone className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="text-gray-700 text-sm mb-3">Template Preview</h4>
            <div className="bg-gray-50 rounded-lg p-4 text-xs border border-gray-200">
              <div className="mb-2">
                <div className="text-gray-900">John Doe</div>
                <div className="text-gray-600">Marketing Manager</div>
              </div>
              <div className="text-gray-600">
                <div>company@example.com</div>
                <div>+1 (555) 123-4567</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export function Employees() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const employees = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@company.com', position: 'Marketing Manager', department: 'Marketing', status: 'active' },
    { id: 2, name: 'Michael Chen', email: 'michael.c@company.com', position: 'Senior Developer', department: 'Engineering', status: 'active' },
    { id: 3, name: 'Emma Williams', email: 'emma.w@company.com', position: 'Sales Director', department: 'Sales', status: 'active' },
    { id: 4, name: 'James Brown', email: 'james.b@company.com', position: 'HR Specialist', department: 'HR', status: 'active' },
    { id: 5, name: 'Lisa Anderson', email: 'lisa.a@company.com', position: 'Financial Analyst', department: 'Finance', status: 'active' },
    { id: 6, name: 'David Martinez', email: 'david.m@company.com', position: 'Product Designer', department: 'Design', status: 'inactive' },
    { id: 7, name: 'Sophie Taylor', email: 'sophie.t@company.com', position: 'Content Writer', department: 'Marketing', status: 'active' },
    { id: 8, name: 'Ryan Wilson', email: 'ryan.w@company.com', position: 'DevOps Engineer', department: 'Engineering', status: 'active' },
    { id: 9, name: 'Olivia Davis', email: 'olivia.d@company.com', position: 'Account Manager', department: 'Sales', status: 'active' },
    { id: 10, name: 'Alex Thompson', email: 'alex.t@company.com', position: 'QA Engineer', department: 'Engineering', status: 'active' },
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-gray-900 mb-2">Employees</h1>
          <p className="text-gray-600">Manage your team's email signatures</p>
        </div>
        <Button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#2563EB] hover:bg-[#1d4ed8]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Employee
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-gray-300"
            />
          </div>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-[200px] border-gray-300">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="hr">HR</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="design">Design</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 text-gray-600 text-sm">Employee</th>
                <th className="text-left py-3 px-6 text-gray-600 text-sm">Email</th>
                <th className="text-left py-3 px-6 text-gray-600 text-sm">Position</th>
                <th className="text-left py-3 px-6 text-gray-600 text-sm">Department</th>
                <th className="text-left py-3 px-6 text-gray-600 text-sm">Status</th>
                <th className="text-left py-3 px-6 text-gray-600 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-b border-gray-100 hover:bg-blue-50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <Avatar className="w-8 h-8 mr-3">
                        <AvatarFallback className="bg-[#2563EB] text-white text-xs">
                          {getInitials(employee.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-gray-900">{employee.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{employee.email}</td>
                  <td className="py-4 px-6 text-gray-600">{employee.position}</td>
                  <td className="py-4 px-6 text-gray-600">{employee.department}</td>
                  <td className="py-4 px-6">
                    <Badge
                      variant={employee.status === 'active' ? 'default' : 'secondary'}
                      className={employee.status === 'active' 
                        ? 'bg-[#10B981] hover:bg-[#10B981]' 
                        : 'bg-gray-400 hover:bg-gray-400'}
                    >
                      {employee.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1.5 hover:bg-red-50 rounded transition-colors">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">Showing 1 to 10 of 247 employees</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled className="border-gray-300">Previous</Button>
            <Button variant="outline" size="sm" className="border-gray-300 bg-[#2563EB] text-white">1</Button>
            <Button variant="outline" size="sm" className="border-gray-300">2</Button>
            <Button variant="outline" size="sm" className="border-gray-300">3</Button>
            <Button variant="outline" size="sm" className="border-gray-300">Next</Button>
          </div>
        </div>
      </div>

      {/* Add Employee Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" className="border-gray-300" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" className="border-gray-300" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input id="email" type="email" placeholder="john.doe@company.com" className="border-gray-300" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input id="position" placeholder="Marketing Manager" className="border-gray-300" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select>
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" placeholder="+90 555 123 4567" className="border-gray-300" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)} className="border-gray-300">
              Cancel
            </Button>
            <Button onClick={() => setIsAddModalOpen(false)} className="bg-[#2563EB] hover:bg-[#1d4ed8]">
              Save Employee
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

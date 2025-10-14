import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, X } from 'lucide-react';

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  department: string;
  phone: string;
  status: 'active' | 'inactive';
}

export function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      firstName: 'Ahmet',
      lastName: 'Yılmaz',
      email: 'ahmet.yilmaz@company.com',
      position: 'CEO',
      department: 'Executive',
      phone: '+90 555 123 4567',
      status: 'active',
    },
    {
      id: 2,
      firstName: 'Ayşe',
      lastName: 'Demir',
      email: 'ayse.demir@company.com',
      position: 'CTO',
      department: 'Technology',
      phone: '+90 555 234 5678',
      status: 'active',
    },
    {
      id: 3,
      firstName: 'Mehmet',
      lastName: 'Kaya',
      email: 'mehmet.kaya@company.com',
      position: 'Sales Manager',
      department: 'Sales',
      phone: '+90 555 345 6789',
      status: 'active',
    },
    {
      id: 4,
      firstName: 'Zeynep',
      lastName: 'Aydın',
      email: 'zeynep.aydin@company.com',
      position: 'Marketing Lead',
      department: 'Marketing',
      phone: '+90 555 456 7890',
      status: 'active',
    },
    {
      id: 5,
      firstName: 'Can',
      lastName: 'Öztürk',
      email: 'can.ozturk@company.com',
      position: 'Designer',
      department: 'Design',
      phone: '+90 555 567 8901',
      status: 'active',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    department: '',
    phone: '',
  });

  const filteredEmployees = employees.filter((emp) =>
    `${emp.firstName} ${emp.lastName} ${emp.email} ${emp.position}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setEditingEmployee(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      position: '',
      department: '',
      phone: '',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormData({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      position: employee.position,
      department: employee.department,
      phone: employee.phone,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingEmployee) {
      setEmployees(
        employees.map((emp) =>
          emp.id === editingEmployee.id
            ? { ...emp, ...formData }
            : emp
        )
      );
    } else {
      const newEmployee: Employee = {
        id: Math.max(...employees.map((e) => e.id)) + 1,
        ...formData,
        status: 'active',
      };
      setEmployees([...employees, newEmployee]);
    }

    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[#1F2937] text-3xl font-bold mb-2">Employees</h1>
          <p className="text-[#6B7280]">Manage your team members and their email signatures</p>
        </div>
        <button
          onClick={handleAdd}
          className="px-6 py-2.5 bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-[#1d4ed8] transition-all shadow-sm flex items-center gap-2"
        >
          <Plus size={20} />
          Add Employee
        </button>
      </div>

      <div className="mb-6">
        <div className="relative w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" size={20} />
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-10 pr-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 h-12 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 h-12 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 h-12 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 h-12 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 h-12 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 h-12 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-6 h-16">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#E0E7FF] flex items-center justify-center text-[#2563EB] font-semibold">
                      {employee.firstName[0]}{employee.lastName[0]}
                    </div>
                    <span className="text-sm font-medium text-[#1F2937]">
                      {employee.firstName} {employee.lastName}
                    </span>
                  </div>
                </td>
                <td className="px-6 h-16 text-sm text-[#6B7280]">{employee.email}</td>
                <td className="px-6 h-16 text-sm text-[#6B7280]">{employee.position}</td>
                <td className="px-6 h-16 text-sm text-[#6B7280]">{employee.department}</td>
                <td className="px-6 h-16">
                  <span className="bg-[#ECFDF5] text-[#10B981] px-3 py-1 rounded-full text-xs font-semibold">
                    Active
                  </span>
                </td>
                <td className="px-6 h-16">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(employee)}
                      className="p-2 text-[#2563EB] hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="p-2 text-[#EF4444] hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-2xl shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-[#6B7280] hover:text-[#1F2937]"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-[#1F2937] mb-6">
              {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="h-10 px-3 border border-[#E5E7EB] rounded-lg w-full focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="h-10 px-3 border border-[#E5E7EB] rounded-lg w-full focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-[#1F2937] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-10 px-3 border border-[#E5E7EB] rounded-lg w-full focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">
                    Position
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="h-10 px-3 border border-[#E5E7EB] rounded-lg w-full focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">
                    Department
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="h-10 px-3 border border-[#E5E7EB] rounded-lg w-full focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[#1F2937] mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="h-10 px-3 border border-[#E5E7EB] rounded-lg w-full focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all"
                />
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 bg-white border border-[#E5E7EB] text-[#1F2937] rounded-lg font-semibold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-[#1d4ed8] transition-all shadow-sm"
                >
                  {editingEmployee ? 'Save Changes' : 'Add Employee'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

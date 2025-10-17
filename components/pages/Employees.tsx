import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, X, Filter, Palette, FileDown, Check } from 'lucide-react';
import { EmployeeDetailModal } from '../EmployeeDetailModal';
import { AssignTemplateModal, GenerateSignaturesModal } from '../BulkActionModals';
import { toast } from 'sonner';

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
    {
      id: 6,
      firstName: 'Elif',
      lastName: 'Yıldız',
      email: 'elif.yildiz@company.com',
      position: 'Product Manager',
      department: 'Technology',
      phone: '+90 555 678 9012',
      status: 'active',
    },
    {
      id: 7,
      firstName: 'Burak',
      lastName: 'Çelik',
      email: 'burak.celik@company.com',
      position: 'Sales Representative',
      department: 'Sales',
      phone: '+90 555 789 0123',
      status: 'active',
    },
    {
      id: 8,
      firstName: 'Selin',
      lastName: 'Arslan',
      email: 'selin.arslan@company.com',
      position: 'Content Specialist',
      department: 'Marketing',
      phone: '+90 555 890 1234',
      status: 'active',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [detailEmployee, setDetailEmployee] = useState<Employee | null>(null);
  const [currentTemplateId, setCurrentTemplateId] = useState(2);
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [templateFilter, setTemplateFilter] = useState('All');
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<number[]>([]);
  const [showAssignTemplateModal, setShowAssignTemplateModal] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    department: '',
    phone: '',
  });

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = `${emp.firstName} ${emp.lastName} ${emp.email} ${emp.position}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'All' || emp.department === departmentFilter;
    const matchesStatus = statusFilter === 'All' || emp.status === statusFilter.toLowerCase();
    const matchesTemplate = templateFilter === 'All';

    return matchesSearch && matchesDepartment && matchesStatus && matchesTemplate;
  });

  const handleClearFilters = () => {
    setDepartmentFilter('All');
    setStatusFilter('All');
    setTemplateFilter('All');
    setSearchTerm('');
  };

  const hasActiveFilters = departmentFilter !== 'All' || statusFilter !== 'All' || templateFilter !== 'All' || searchTerm !== '';

  const selectedEmployees = employees.filter((emp) => selectedEmployeeIds.includes(emp.id));
  const allFilteredSelected = filteredEmployees.length > 0 && filteredEmployees.every((emp) => selectedEmployeeIds.includes(emp.id));

  const handleSelectAll = () => {
    if (allFilteredSelected) {
      setSelectedEmployeeIds([]);
    } else {
      setSelectedEmployeeIds(filteredEmployees.map((emp) => emp.id));
    }
  };

  const handleSelectEmployee = (id: number) => {
    if (selectedEmployeeIds.includes(id)) {
      setSelectedEmployeeIds(selectedEmployeeIds.filter((empId) => empId !== id));
    } else {
      setSelectedEmployeeIds([...selectedEmployeeIds, id]);
    }
  };

  const handleAssignTemplate = (_templateId: string, generateImmediately: boolean) => {
    toast.success(`Template assigned to ${selectedEmployeeIds.length} employees`);
    if (generateImmediately) {
      setShowGenerateModal(true);
    } else {
      setSelectedEmployeeIds([]);
    }
  };

  const handleBulkDelete = () => {
    if (confirm(`Are you sure you want to delete ${selectedEmployeeIds.length} employees?`)) {
      setEmployees(employees.filter((emp) => !selectedEmployeeIds.includes(emp.id)));
      toast.success(`${selectedEmployeeIds.length} employees deleted`);
      setSelectedEmployeeIds([]);
    }
  };

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
    setDetailEmployee(null);
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

  const handleRowClick = (employee: Employee) => {
    setDetailEmployee(employee);
  };

  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter((emp) => emp.id !== id));
      toast.success('Employee deleted successfully');
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
      toast.success('Employee updated successfully');
    } else {
      const newEmployee: Employee = {
        id: Math.max(...employees.map((e) => e.id)) + 1,
        ...formData,
        status: 'active',
      };
      setEmployees([...employees, newEmployee]);
      toast.success('Employee added successfully');
    }

    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-[#1F2937] text-2xl md:text-3xl font-bold mb-2">Employees</h1>
            <p className="text-[#6B7280] text-sm md:text-base">Manage your team members and their email signatures</p>
          </div>
          <button
            onClick={handleAdd}
            className="px-4 md:px-6 py-2.5 md:py-3 bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-[#1d4ed8] transition-all shadow-sm flex items-center justify-center gap-2 min-h-[44px]"
          >
            <Plus size={20} />
            <span>Add Employee</span>
          </button>
        </div>

        {selectedEmployeeIds.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-2">
                <Check size={16} className="text-[#2563EB]" />
                <span className="text-sm font-semibold text-[#1F2937]">
                  {selectedEmployeeIds.length} selected
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setShowAssignTemplateModal(true)}
                  className="px-3 py-1.5 bg-white border border-[#E5E7EB] text-[#1F2937] rounded-lg font-medium hover:bg-gray-50 transition-all text-sm flex items-center gap-1.5"
                >
                  <Palette size={14} />
                  Assign Template
                </button>
                <button
                  onClick={() => setShowGenerateModal(true)}
                  className="px-3 py-1.5 bg-white border border-[#E5E7EB] text-[#1F2937] rounded-lg font-medium hover:bg-gray-50 transition-all text-sm flex items-center gap-1.5"
                >
                  <FileDown size={14} />
                  Generate Signatures
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="px-3 py-1.5 bg-white border border-[#E5E7EB] text-[#EF4444] rounded-lg font-medium hover:bg-red-50 transition-all text-sm flex items-center gap-1.5"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mb-4 md:mb-6 space-y-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Filter size={16} className="text-[#6B7280]" />
            <span className="text-sm font-semibold text-[#1F2937]">Filters</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="h-10 px-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all text-sm"
            >
              <option value="All">All Departments</option>
              <option value="Executive">Executive</option>
              <option value="Technology">Technology</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="Design">Design</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 px-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all text-sm"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <select
              value={templateFilter}
              onChange={(e) => setTemplateFilter(e.target.value)}
              className="h-10 px-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all text-sm"
            >
              <option value="All">All Templates</option>
              <option value="Minimal">Minimal</option>
              <option value="Professional">Professional</option>
              <option value="Modern">Modern</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="h-10 px-4 bg-white border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-gray-50 transition-all text-sm font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-[400px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" size={20} />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all"
            />
          </div>
          <div className="text-sm text-[#6B7280]">
            Showing {filteredEmployees.length} of {employees.length} employees
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-3 md:px-6 h-10 md:h-12 text-left">
                  <input
                    type="checkbox"
                    checked={allFilteredSelected}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-[#2563EB] border-gray-300 rounded focus:ring-[#2563EB] cursor-pointer"
                  />
                </th>
                <th className="px-3 md:px-6 h-10 md:h-12 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-3 md:px-6 h-10 md:h-12 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider hidden md:table-cell">
                  Email
                </th>
                <th className="px-3 md:px-6 h-10 md:h-12 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider hidden sm:table-cell">
                  Position
                </th>
                <th className="px-3 md:px-6 h-10 md:h-12 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider hidden lg:table-cell">
                  Department
                </th>
                <th className="px-3 md:px-6 h-10 md:h-12 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider hidden sm:table-cell">
                  Status
                </th>
                <th className="px-3 md:px-6 h-10 md:h-12 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Search size={48} className="text-gray-300 mb-3" />
                      <h3 className="text-lg font-semibold text-[#1F2937] mb-1">
                        No employees match filters
                      </h3>
                      <p className="text-sm text-[#6B7280] mb-4">
                        Try adjusting your filters or search term
                      </p>
                      {hasActiveFilters && (
                        <button
                          onClick={handleClearFilters}
                          className="px-4 py-2 bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-[#1d4ed8] transition-all text-sm"
                        >
                          Clear All Filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-3 md:px-6 h-14 md:h-16">
                    <input
                      type="checkbox"
                      checked={selectedEmployeeIds.includes(employee.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleSelectEmployee(employee.id);
                      }}
                      className="w-4 h-4 text-[#2563EB] border-gray-300 rounded focus:ring-[#2563EB] cursor-pointer"
                    />
                  </td>
                  <td
                    className="px-3 md:px-6 h-14 md:h-16 cursor-pointer"
                    onClick={() => handleRowClick(employee)}
                  >
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#E0E7FF] flex items-center justify-center text-[#2563EB] font-semibold text-xs md:text-sm flex-shrink-0">
                        {employee.firstName[0]}{employee.lastName[0]}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs md:text-sm font-medium text-[#1F2937] truncate">
                          {employee.firstName} {employee.lastName}
                        </div>
                        <div className="text-xs text-[#6B7280] md:hidden truncate">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 md:px-6 h-14 md:h-16 text-xs md:text-sm text-[#6B7280] hidden md:table-cell">{employee.email}</td>
                  <td className="px-3 md:px-6 h-14 md:h-16 text-xs md:text-sm text-[#6B7280] hidden sm:table-cell">{employee.position}</td>
                  <td className="px-3 md:px-6 h-14 md:h-16 text-xs md:text-sm text-[#6B7280] hidden lg:table-cell">{employee.department}</td>
                  <td className="px-3 md:px-6 h-14 md:h-16 hidden sm:table-cell">
                    <span className="bg-[#ECFDF5] text-[#10B981] px-3 py-1 rounded-full text-xs font-semibold">
                      Active
                    </span>
                  </td>
                  <td className="px-3 md:px-6 h-14 md:h-16">
                    <div className="flex items-center gap-1 md:gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleEdit(employee); }}
                        className="p-2 text-[#2563EB] hover:bg-blue-50 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={(e) => handleDelete(employee.id, e)}
                        className="p-2 text-[#EF4444] hover:bg-red-50 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
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

      <AssignTemplateModal
        isOpen={showAssignTemplateModal}
        onClose={() => {
          setShowAssignTemplateModal(false);
          setSelectedEmployeeIds([]);
        }}
        selectedEmployees={selectedEmployees}
        onAssign={handleAssignTemplate}
      />

      <GenerateSignaturesModal
        isOpen={showGenerateModal}
        onClose={() => {
          setShowGenerateModal(false);
          setSelectedEmployeeIds([]);
        }}
        selectedEmployees={selectedEmployees}
        templateName="Professional"
      />

      {detailEmployee && (
        <EmployeeDetailModal
          employee={detailEmployee}
          onClose={() => setDetailEmployee(null)}
          onEdit={(emp) => {
            setDetailEmployee(null);
            handleEdit(emp);
          }}
          currentTemplateId={currentTemplateId}
          onTemplateChange={setCurrentTemplateId}
        />
      )}
    </div>
  );
}

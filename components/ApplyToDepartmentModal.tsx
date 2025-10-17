import { X, Users } from 'lucide-react';
import { useState } from 'react';

interface ApplyToDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (department: string) => void;
  templateName: string;
  departmentCounts: { [key: string]: number };
}

export function ApplyToDepartmentModal({
  isOpen,
  onClose,
  onApply,
  templateName,
  departmentCounts,
}: ApplyToDepartmentModalProps) {
  const [selectedDepartment, setSelectedDepartment] = useState('Executive');

  if (!isOpen) return null;

  const handleApply = () => {
    onApply(selectedDepartment);
    onClose();
  };

  const departments = ['Executive', 'Technology', 'Sales', 'Marketing', 'Design'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 sm:p-6 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold text-[#1F2937]">Apply to Department</h2>
          <button
            onClick={onClose}
            className="text-[#6B7280] hover:text-[#1F2937] transition-colors p-2 hover:bg-gray-100 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <p className="text-sm text-[#6B7280] mb-4">
            Apply the <span className="font-semibold text-[#1F2937]">{templateName}</span> template to all employees in a department
          </p>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-[#1F2937] mb-2">
              Select Department
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full h-10 px-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-sm text-[#1F2937]">
              <Users size={16} className="text-[#2563EB]" />
              <span>
                <span className="font-semibold">
                  {departmentCounts[selectedDepartment] || 0}
                </span>{' '}
                {departmentCounts[selectedDepartment] === 1 ? 'employee' : 'employees'} in{' '}
                {selectedDepartment}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-white border border-[#E5E7EB] text-[#1F2937] rounded-lg font-semibold hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={departmentCounts[selectedDepartment] === 0}
              className="flex-1 px-4 py-2.5 bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-[#1d4ed8] transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Apply Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

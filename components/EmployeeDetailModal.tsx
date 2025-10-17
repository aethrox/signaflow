import { X, Copy, FileText, Edit2 } from 'lucide-react';
import { signatureTemplates, getSignaturePlainText, getTemplateNameById, SignatureData } from '../utils/signatureTemplates';
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
  currentTemplate: 'minimal' | 'professional' | 'modern';
}

interface EmployeeDetailModalProps {
  employee: Employee;
  onClose: () => void;
  onEdit: (employee: Employee) => void;
  currentTemplateId?: number;
  onTemplateChange?: (templateId: number) => void;
}

export function EmployeeDetailModal({
  employee,
  onClose,
  onEdit,
  currentTemplateId = 2,
  onTemplateChange
}: EmployeeDetailModalProps) {
  const signatureData: SignatureData = {
    firstName: employee.firstName,
    lastName: employee.lastName,
    email: employee.email,
    position: employee.position,
    department: employee.department,
    phone: employee.phone,
  };

  const templateName = getTemplateNameById(currentTemplateId);
  const signatureHTML = signatureTemplates[templateName](signatureData);
  const signaturePlainText = getSignaturePlainText(signatureData);

  const handleCopyHTML = async () => {
    try {
      await navigator.clipboard.writeText(signatureHTML);
      toast.success('Signature HTML copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy HTML');
    }
  };

  const handleCopyPlainText = async () => {
    try {
      await navigator.clipboard.writeText(signaturePlainText);
      toast.success('Signature text copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy text');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="text-2xl font-bold text-[#1F2937]">Employee Details</h2>
          <button
            onClick={onClose}
            className="text-[#6B7280] hover:text-[#1F2937] transition-colors p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-100">
            <div className="w-16 h-16 rounded-full bg-[#E0E7FF] flex items-center justify-center text-[#2563EB] font-semibold text-xl flex-shrink-0">
              {employee.firstName[0]}{employee.lastName[0]}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-[#1F2937] mb-1">
                {employee.firstName} {employee.lastName}
              </h3>
              <p className="text-[#6B7280] mb-1">{employee.position}</p>
              <p className="text-[#6B7280] text-sm mb-1">{employee.email}</p>
              <p className="text-[#6B7280] text-sm">{employee.phone}</p>
              <div className="mt-2">
                <span className="inline-flex items-center bg-[#ECFDF5] text-[#10B981] px-3 py-1 rounded-full text-xs font-semibold">
                  {employee.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-[#1F2937]">Current Template</label>
              {onTemplateChange && (
                <select
                  value={currentTemplateId}
                  onChange={(e) => onTemplateChange(Number(e.target.value))}
                  className="px-3 py-1.5 border border-[#E5E7EB] rounded-lg text-sm focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none"
                >
                  <option value={1}>Minimal</option>
                  <option value={2}>Professional</option>
                  <option value={3}>Modern</option>
                </select>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold text-[#1F2937] mb-3">Signature Preview</h4>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div dangerouslySetInnerHTML={{ __html: signatureHTML }} />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleCopyHTML}
              className="flex-1 px-4 py-2.5 bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-[#1d4ed8] transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <Copy size={16} />
              Copy HTML
            </button>
            <button
              onClick={handleCopyPlainText}
              className="flex-1 px-4 py-2.5 bg-white border border-[#E5E7EB] text-[#1F2937] rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >
              <FileText size={16} />
              Copy Text
            </button>
            <button
              onClick={() => onEdit(employee)}
              className="flex-1 px-4 py-2.5 bg-white border border-[#E5E7EB] text-[#1F2937] rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >
              <Edit2 size={16} />
              Edit Employee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

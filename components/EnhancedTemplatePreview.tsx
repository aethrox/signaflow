import { X, Check, Users, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { signatureTemplates, getTemplateNameById, SignatureData } from '../utils/signatureTemplates';
import { toast } from 'sonner';
import { generateSignature } from '../src/services/signatureApi';

interface EnhancedTemplatePreviewProps {
  templateId: number;
  onClose: () => void;
  onSetActive: (templateId: number) => void;
  onApplyToDepartment?: (templateId: number, templateName: string) => void;
}

const mockEmployees: SignatureData[] = [
  {
    firstName: 'Ahmet',
    lastName: 'Yılmaz',
    email: 'ahmet.yilmaz@company.com',
    position: 'CEO',
    department: 'Executive',
    phone: '+90 555 123 4567',
  },
  {
    firstName: 'Ayşe',
    lastName: 'Demir',
    email: 'ayse.demir@company.com',
    position: 'CTO',
    department: 'Technology',
    phone: '+90 555 234 5678',
  },
  {
    firstName: 'Can',
    lastName: 'Öztürk',
    email: 'can.ozturk@company.com',
    position: 'Designer',
    department: 'Design',
    phone: '+90 555 567 8901',
  },
];

export function EnhancedTemplatePreview({
  templateId,
  onClose,
  onSetActive,
  onApplyToDepartment,
}: EnhancedTemplatePreviewProps) {
  const [selectedEmployeeIndex, setSelectedEmployeeIndex] = useState(0);
  const [previewHtml, setPreviewHtml] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  
  const selectedEmployee = mockEmployees[selectedEmployeeIndex];
  const templateName = getTemplateNameById(templateId);
  const signatureHTML = signatureTemplates[templateName](selectedEmployee);

  useEffect(() => {
    const generatePreview = async () => {
      setIsLoading(true);
      try {
        const result = await generateSignature({
          employee: {
            firstName: selectedEmployee.firstName,
            lastName: selectedEmployee.lastName,
            email: selectedEmployee.email,
            position: selectedEmployee.position,
            department: selectedEmployee.department,
            phone: selectedEmployee.phone
          },
          template: {
            id: templateName,
            name: templateName.charAt(0).toUpperCase() + templateName.slice(1)
          },
          company: {
            name: 'Company Ltd.',
            domain: 'company.com',
            brandColor: '#2B4C8C'
          }
        });
        
        setPreviewHtml(result.signatureHtml);
      } catch (error) {
        console.error('Preview generation failed:', error);
        setPreviewHtml(signatureHTML); // Fallback to local template
      } finally {
        setIsLoading(false);
      }
    };
    
    generatePreview();
  }, [selectedEmployeeIndex, templateId, templateName, selectedEmployee, signatureHTML]);

  const handleSetActive = () => {
    onSetActive(templateId);
    toast.success('Template activated successfully!');
    onClose();
  };

  const handleApplyToDepartment = () => {
    if (onApplyToDepartment) {
      onApplyToDepartment(templateId, templateName);
      onClose();
    } else {
      toast.info('Apply to Department feature coming soon!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="text-2xl font-bold text-[#1F2937]">Template Preview</h2>
          <button
            onClick={onClose}
            className="text-[#6B7280] hover:text-[#1F2937] transition-colors p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#1F2937] mb-3">
              Preview with employee:
            </label>
            <select
              value={selectedEmployeeIndex}
              onChange={(e) => setSelectedEmployeeIndex(Number(e.target.value))}
              className="w-full sm:w-auto px-4 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none"
            >
              {mockEmployees.map((emp, index) => (
                <option key={index} value={index}>
                  {emp.firstName} {emp.lastName} - {emp.position}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 border border-gray-200 mb-6 flex items-center justify-center min-h-[300px]">
            {isLoading ? (
              <div className="flex items-center gap-2 text-[#6B7280]">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span>Generating preview...</span>
              </div>
            ) : (
              <div className="transform scale-110">
                <div dangerouslySetInnerHTML={{ __html: previewHtml || signatureHTML }} />
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSetActive}
              className="flex-1 px-4 py-2.5 bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-[#1d4ed8] transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <Check size={16} />
              Set as Active
            </button>
            <button
              onClick={handleApplyToDepartment}
              className="flex-1 px-4 py-2.5 bg-white border border-[#E5E7EB] text-[#1F2937] rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >
              <Users size={16} />
              Apply to Department
            </button>
            <button
              onClick={() => toast.info('Customize feature coming soon!')}
              className="flex-1 px-4 py-2.5 bg-white border border-[#E5E7EB] text-[#6B7280] rounded-lg font-semibold cursor-not-allowed transition-all flex items-center justify-center gap-2"
              disabled
            >
              Customize (Coming Soon)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

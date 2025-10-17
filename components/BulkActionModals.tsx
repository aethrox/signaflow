import { X, CheckCircle, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
}

interface AssignTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedEmployees: Employee[];
  onAssign: (templateId: string, generateImmediately: boolean) => void;
}

export function AssignTemplateModal({
  isOpen,
  onClose,
  selectedEmployees,
  onAssign,
}: AssignTemplateModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState('professional');
  const [generateImmediately, setGenerateImmediately] = useState(true);

  if (!isOpen) return null;

  const handleAssign = () => {
    onAssign(selectedTemplate, generateImmediately);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold text-[#1F2937]">Assign Template</h2>
          <button
            onClick={onClose}
            className="text-[#6B7280] hover:text-[#1F2937] transition-colors p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-[#6B7280] mb-4">
            Assign template to {selectedEmployees.length} employee{selectedEmployees.length > 1 ? 's' : ''}
          </p>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-[#1F2937] mb-2">Template</label>
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="w-full h-10 px-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all"
            >
              <option value="minimal">Minimal</option>
              <option value="professional">Professional</option>
              <option value="modern">Modern</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-[#1F2937] mb-2">
              Selected employees
            </label>
            <div className="bg-gray-50 rounded-lg p-3 max-h-40 overflow-y-auto">
              <ul className="text-sm space-y-1">
                {selectedEmployees.map((emp) => (
                  <li key={emp.id} className="text-[#1F2937]">
                    • {emp.firstName} {emp.lastName}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={generateImmediately}
                onChange={(e) => setGenerateImmediately(e.target.checked)}
                className="w-4 h-4 text-[#2563EB] border-gray-300 rounded focus:ring-[#2563EB]"
              />
              <span className="text-sm text-[#1F2937]">Generate signatures immediately</span>
            </label>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-white border border-[#E5E7EB] text-[#1F2937] rounded-lg font-semibold hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleAssign}
              className="flex-1 px-4 py-2.5 bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-[#1d4ed8] transition-all shadow-sm"
            >
              Assign Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface GenerateSignaturesModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedEmployees: Employee[];
  templateName: string;
}

export function GenerateSignaturesModal({
  isOpen,
  onClose,
  selectedEmployees,
  templateName,
}: GenerateSignaturesModalProps) {
  const [progress, setProgress] = useState(0);
  const [completedEmployees, setCompletedEmployees] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (isOpen && !isGenerating) {
      setProgress(0);
      setCompletedEmployees([]);
      setIsGenerating(true);

      const totalEmployees = selectedEmployees.length;
      let currentIndex = 0;

      const interval = setInterval(() => {
        if (currentIndex < totalEmployees) {
          setCompletedEmployees((prev) => [...prev, selectedEmployees[currentIndex].id]);
          currentIndex++;
          setProgress((currentIndex / totalEmployees) * 100);
        } else {
          setIsGenerating(false);
          clearInterval(interval);
        }
      }, 800);

      return () => clearInterval(interval);
    }
  }, [isOpen, selectedEmployees, isGenerating]);

  if (!isOpen) return null;

  const isComplete = progress === 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold text-[#1F2937]">Generate Signatures</h2>
          <button
            onClick={onClose}
            className="text-[#6B7280] hover:text-[#1F2937] transition-colors p-2 hover:bg-gray-100 rounded-lg"
            disabled={isGenerating}
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-[#6B7280] mb-4">
            {isComplete
              ? `Generated signatures for ${selectedEmployees.length} employees`
              : `Generating signatures for ${selectedEmployees.length} employees`}
          </p>

          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-[#1F2937] font-medium">Using template: {templateName}</span>
              <span className="text-[#6B7280]">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#2563EB] h-2 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="mb-6 bg-gray-50 rounded-lg p-3 max-h-60 overflow-y-auto">
            <div className="space-y-2">
              {selectedEmployees.map((emp) => {
                const isCompleted = completedEmployees.includes(emp.id);
                const isCurrent =
                  completedEmployees.length > 0 &&
                  completedEmployees[completedEmployees.length - 1] === emp.id;

                return (
                  <div
                    key={emp.id}
                    className={`flex items-center gap-2 text-sm p-2 rounded ${
                      isCurrent ? 'bg-blue-50' : ''
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle size={16} className="text-[#10B981] flex-shrink-0" />
                    ) : (
                      <Loader2
                        size={16}
                        className={`text-[#6B7280] flex-shrink-0 ${
                          isCurrent ? 'animate-spin' : ''
                        }`}
                      />
                    )}
                    <span className={isCompleted ? 'text-[#1F2937]' : 'text-[#6B7280]'}>
                      {emp.firstName} {emp.lastName}
                      {isCurrent && !isComplete && (
                        <span className="ml-2 text-[#2563EB] text-xs">(generating...)</span>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3">
            {isComplete ? (
              <>
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 bg-white border border-[#E5E7EB] text-[#1F2937] rounded-lg font-semibold hover:bg-gray-50 transition-all"
                >
                  Close
                </button>
                <button
                  onClick={() => {}}
                  className="flex-1 px-4 py-2.5 bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-[#1d4ed8] transition-all shadow-sm"
                >
                  Download All
                </button>
              </>
            ) : (
              <button
                onClick={onClose}
                disabled={isGenerating}
                className="flex-1 px-4 py-2.5 bg-white border border-[#E5E7EB] text-[#1F2937] rounded-lg font-semibold hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Eye, Check, Filter } from 'lucide-react';
import { EnhancedTemplatePreview } from '../EnhancedTemplatePreview';
import { toast } from 'sonner';

export function Templates() {
  const [activeTemplateId, setActiveTemplateId] = useState<number>(2);
  const [previewTemplate, setPreviewTemplate] = useState<number | null>(null);
  const [departmentFilter, setDepartmentFilter] = useState('All');

  const templateUsage = {
    1: { count: 1, departments: ['Design'] },
    2: { count: 5, departments: ['Executive', 'Sales'] },
    3: { count: 2, departments: ['Technology', 'Marketing'] },
  };

  const templates = [
    {
      id: 1,
      name: 'Minimal',
      description: 'Clean and simple design with essential information',
      departments: ['Design'],
    },
    {
      id: 2,
      name: 'Professional',
      description: 'Complete signature with logo, details, and social icons',
      departments: ['Executive', 'Sales'],
    },
    {
      id: 3,
      name: 'Modern',
      description: 'Contemporary design with colorful accents',
      departments: ['Technology', 'Marketing'],
    },
  ];

  const filteredTemplates = templates.filter((template) => {
    if (departmentFilter === 'All') return true;
    return template.departments.includes(departmentFilter);
  });

  const handleSetActive = (templateId: number) => {
    setActiveTemplateId(templateId);
    toast.success('Template activated successfully!');
  };

  const renderTemplatePreview = (templateId: number) => {
    const previews: { [key: number]: JSX.Element } = {
      1: (
        <div className="bg-white p-6 border border-gray-200 rounded-lg text-sm w-full">
          <div className="text-gray-900 font-semibold">John Doe</div>
          <div className="text-gray-600">Marketing Manager</div>
          <div className="text-gray-600 mt-2">john.doe@company.com</div>
        </div>
      ),
      2: (
        <div className="bg-white p-6 border border-gray-200 rounded-lg text-sm w-full">
          <div className="flex gap-4">
            <div className="w-16 h-16 bg-[#2563EB] rounded flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
              LOGO
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-gray-900 font-semibold">John Doe</div>
              <div className="text-gray-600">Marketing Manager</div>
              <div className="text-gray-600 mt-2 space-y-1">
                <div>john.doe@company.com</div>
                <div>+1 (555) 123-4567</div>
                <div>www.company.com</div>
              </div>
              <div className="flex gap-2 mt-3">
                <div className="w-6 h-6 bg-[#2563EB] rounded-full"></div>
                <div className="w-6 h-6 bg-[#2563EB] rounded-full"></div>
                <div className="w-6 h-6 bg-[#2563EB] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      ),
      3: (
        <div className="bg-white p-6 border-l-4 border-[#10B981] rounded-lg text-sm shadow-sm w-full">
          <div className="text-gray-900 font-semibold">John Doe</div>
          <div className="text-[#10B981] font-medium">Marketing Manager</div>
          <div className="text-gray-600 mt-2">
            <div>john.doe@company.com | +1 (555) 123-4567</div>
            <div className="text-[#2563EB] mt-1 font-medium">www.company.com</div>
          </div>
        </div>
      ),
    };
    return previews[templateId];
  };

  return (
    <div>
      <div className="mb-6 md:mb-8">
        <h1 className="text-[#1F2937] text-2xl md:text-3xl font-bold mb-2">Email Signature Templates</h1>
        <p className="text-[#6B7280] text-sm md:text-base">Choose a template for your team's email signatures</p>
      </div>

      <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter size={16} className="text-[#6B7280]" />
          <span className="text-sm font-semibold text-[#1F2937]">Filter by Department</span>
        </div>
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="w-full sm:w-auto h-10 px-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all text-sm"
        >
          <option value="All">All Departments</option>
          <option value="Executive">Executive</option>
          <option value="Technology">Technology</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Design">Design</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 duration-300 ${
              activeTemplateId === template.id ? 'ring-2 ring-[#10B981]' : 'border border-gray-100'
            }`}
          >
            <div className="relative bg-gray-50 p-6 min-h-[280px] flex items-center justify-center">
              {activeTemplateId === template.id && (
                <div className="absolute top-4 right-4 bg-[#10B981] text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Check size={12} />
                  Active
                </div>
              )}
              <div className="w-full max-w-[280px]">
                {renderTemplatePreview(template.id)}
              </div>
            </div>

            <div className="p-6 border-t border-gray-100">
              <h3 className="text-lg font-bold text-[#1F2937] mb-2">{template.name}</h3>
              <p className="text-sm text-[#6B7280] mb-3">{template.description}</p>

              <div className="mb-3">
                <p className="text-xs text-[#6B7280] mb-1">Used by: {templateUsage[template.id as keyof typeof templateUsage].count} employees</p>
                <div className="flex flex-wrap gap-1">
                  {template.departments.map((dept) => (
                    <span
                      key={dept}
                      className="inline-block px-2 py-1 bg-[#E0E7FF] text-[#2563EB] text-xs font-medium rounded"
                    >
                      {dept}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setPreviewTemplate(template.id)}
                  className="flex-1 px-4 py-2 bg-white border border-[#E5E7EB] text-[#1F2937] rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                >
                  <Eye size={16} />
                  Preview
                </button>
                {activeTemplateId !== template.id && (
                  <button
                    onClick={() => handleSetActive(template.id)}
                    className="flex-1 px-4 py-2 bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-[#1d4ed8] transition-all shadow-sm"
                  >
                    Set Active
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {previewTemplate !== null && (
        <EnhancedTemplatePreview
          templateId={previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          onSetActive={handleSetActive}
        />
      )}
    </div>
  );
}

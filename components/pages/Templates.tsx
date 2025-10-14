import { useState } from 'react';
import { Eye, Check, X } from 'lucide-react';

export function Templates() {
  const [, setSelectedTemplate] = useState<number | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<number | null>(null);

  const templates = [
    {
      id: 1,
      name: 'Minimal',
      description: 'Clean and simple design with essential information',
      active: false,
    },
    {
      id: 2,
      name: 'Professional',
      description: 'Complete signature with logo, details, and social icons',
      active: true,
    },
    {
      id: 3,
      name: 'Modern',
      description: 'Contemporary design with colorful accents',
      active: false,
    },
  ];

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 duration-300 ${
              template.active ? 'ring-2 ring-[#10B981]' : 'border border-gray-100'
            }`}
          >
            <div className="relative bg-gray-50 p-6 min-h-[280px] flex items-center justify-center">
              {template.active && (
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
              <p className="text-sm text-[#6B7280] mb-4">{template.description}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => setPreviewTemplate(template.id)}
                  className="flex-1 px-4 py-2 bg-white border border-[#E5E7EB] text-[#1F2937] rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                >
                  <Eye size={16} />
                  Preview
                </button>
                {!template.active && (
                  <button
                    onClick={() => setSelectedTemplate(template.id)}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-3xl shadow-2xl relative">
            <button
              onClick={() => setPreviewTemplate(null)}
              className="absolute top-4 right-4 text-[#6B7280] hover:text-[#1F2937]"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-[#1F2937] mb-6">Template Preview</h2>

            <div className="py-12 px-8 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="transform scale-125">
                {renderTemplatePreview(previewTemplate)}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setPreviewTemplate(null)}
                className="px-6 py-2.5 bg-white border border-[#E5E7EB] text-[#1F2937] rounded-lg font-semibold hover:bg-gray-50 transition-all"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedTemplate(previewTemplate);
                  setPreviewTemplate(null);
                }}
                className="px-6 py-2.5 bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-[#1d4ed8] transition-all shadow-sm"
              >
                Set as Active
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

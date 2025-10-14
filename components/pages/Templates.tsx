import { useState } from 'react';
import { Eye, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

export function Templates() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
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
        <div className="bg-white p-6 border border-gray-200 rounded-lg text-sm">
          <div className="text-gray-900">John Doe</div>
          <div className="text-gray-600">Marketing Manager</div>
          <div className="text-gray-600 mt-2">john.doe@company.com</div>
        </div>
      ),
      2: (
        <div className="bg-white p-6 border border-gray-200 rounded-lg text-sm">
          <div className="flex gap-4">
            <div className="w-16 h-16 bg-[#2563EB] rounded flex items-center justify-center text-white">
              LOGO
            </div>
            <div className="flex-1">
              <div className="text-gray-900">John Doe</div>
              <div className="text-gray-600">Marketing Manager</div>
              <div className="text-gray-600 mt-2">
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
        <div className="bg-white p-6 border-l-4 border-[#10B981] rounded-lg text-sm shadow-sm">
          <div className="text-gray-900">John Doe</div>
          <div className="text-[#10B981]">Marketing Manager</div>
          <div className="text-gray-600 mt-2">
            <div>john.doe@company.com | +1 (555) 123-4567</div>
            <div className="text-[#2563EB] mt-1">www.company.com</div>
          </div>
        </div>
      ),
    };
    return previews[templateId];
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Email Signature Templates</h1>
        <p className="text-gray-600">Choose a template for your team's email signatures</p>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 ${
              template.active ? 'ring-2 ring-[#10B981]' : ''
            }`}
          >
            {/* Preview Area */}
            <div className="relative bg-gray-50 p-6 aspect-video flex items-center justify-center">
              {template.active && (
                <Badge className="absolute top-4 right-4 bg-[#10B981] hover:bg-[#10B981]">
                  <Check className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              )}
              {renderTemplatePreview(template.id)}
            </div>

            {/* Template Info */}
            <div className="p-6">
              <h3 className="text-gray-900 mb-2">{template.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{template.description}</p>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 border-gray-300"
                  onClick={() => setPreviewTemplate(template.id)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                {!template.active && (
                  <Button
                    className="flex-1 bg-[#2563EB] hover:bg-[#1d4ed8]"
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    Set as Active
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      <Dialog open={previewTemplate !== null} onOpenChange={() => setPreviewTemplate(null)}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Template Preview</DialogTitle>
          </DialogHeader>
          <div className="py-8 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="scale-125">
              {previewTemplate && renderTemplatePreview(previewTemplate)}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setPreviewTemplate(null)}
              className="border-gray-300"
            >
              Close
            </Button>
            <Button
              onClick={() => {
                setSelectedTemplate(previewTemplate);
                setPreviewTemplate(null);
              }}
              className="bg-[#2563EB] hover:bg-[#1d4ed8]"
            >
              Set as Active
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { useState } from 'react';
import { Plus, Edit, Trash2, Link as LinkIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';

export function Campaigns() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [bannerTitle, setBannerTitle] = useState('Holiday Sale');
  const [bannerMessage, setBannerMessage] = useState('Get 20% off on all products this season!');
  const [bannerLink, setBannerLink] = useState('https://company.com/sale');
  const [bannerColor, setBannerColor] = useState('#2563EB');

  const activeBanner = {
    title: 'Holiday Sale',
    message: 'Get 20% off on all products this season!',
    link: 'https://company.com/sale',
    color: '#2563EB',
    createdDate: '2025-10-01',
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-gray-900 mb-2">Campaign Banners</h1>
          <p className="text-gray-600">Manage promotional banners in email signatures</p>
        </div>
        <Button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-[#2563EB] hover:bg-[#1d4ed8]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Banner
        </Button>
      </div>

      {/* Active Banner Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Active Banner</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Active</span>
            <Switch checked={isActive} onCheckedChange={setIsActive} />
          </div>
        </div>

        {/* Banner Preview */}
        <div className="bg-gray-50 rounded-lg p-6 mb-4 border border-gray-200">
          <div className="mb-4">
            <h4 className="text-gray-700 text-sm mb-2">Banner Preview</h4>
            <div 
              className="rounded-lg p-4 text-white"
              style={{ backgroundColor: activeBanner.color }}
            >
              <div className="text-sm">{activeBanner.title}</div>
              <div className="text-xs mt-1 opacity-90">{activeBanner.message}</div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-gray-700 text-sm mb-3">Full Signature Preview</h4>
            <div className="bg-white p-4 border border-gray-200 rounded text-sm">
              <div className="text-gray-900">John Doe</div>
              <div className="text-gray-600">Marketing Manager</div>
              <div className="text-gray-600 mt-2">
                <div>john.doe@company.com</div>
                <div>+1 (555) 123-4567</div>
              </div>
              
              {/* Banner in signature */}
              <div 
                className="mt-4 rounded p-3 text-white cursor-pointer hover:opacity-90 transition-opacity"
                style={{ backgroundColor: activeBanner.color }}
              >
                <div className="text-xs">{activeBanner.title}</div>
                <div className="text-xs mt-0.5 opacity-90">{activeBanner.message}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Banner Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">Title</p>
            <p className="text-gray-900">{activeBanner.title}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Created Date</p>
            <p className="text-gray-900">{activeBanner.createdDate}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-600">Message</p>
            <p className="text-gray-900">{activeBanner.message}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-600">Link</p>
            <a href={activeBanner.link} className="text-[#2563EB] hover:underline">
              {activeBanner.link}
            </a>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="border-gray-300">
            <Edit className="w-4 h-4 mr-2" />
            Edit Banner
          </Button>
          <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Banner
          </Button>
        </div>
      </div>

      {/* Create/Edit Banner Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Create Campaign Banner</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-6 py-4">
            {/* Form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bannerTitle">Banner Title</Label>
                <Input
                  id="bannerTitle"
                  value={bannerTitle}
                  onChange={(e) => setBannerTitle(e.target.value)}
                  placeholder="Enter banner title"
                  className="border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bannerMessage">Message</Label>
                <Textarea
                  id="bannerMessage"
                  value={bannerMessage}
                  onChange={(e) => setBannerMessage(e.target.value)}
                  placeholder="Enter banner message (max 150 characters)"
                  maxLength={150}
                  rows={3}
                  className="border-gray-300 resize-none"
                />
                <p className="text-xs text-gray-500">{bannerMessage.length}/150 characters</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bannerLink">Link URL</Label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="bannerLink"
                    value={bannerLink}
                    onChange={(e) => setBannerLink(e.target.value)}
                    placeholder="https://example.com"
                    className="pl-10 border-gray-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bannerColor">Banner Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="bannerColor"
                    type="color"
                    value={bannerColor}
                    onChange={(e) => setBannerColor(e.target.value)}
                    className="w-20 h-10 border-gray-300 cursor-pointer"
                  />
                  <Input
                    value={bannerColor}
                    onChange={(e) => setBannerColor(e.target.value)}
                    placeholder="#2563EB"
                    className="flex-1 border-gray-300"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Label htmlFor="activeBanner">Active</Label>
                <Switch id="activeBanner" />
              </div>
            </div>

            {/* Live Preview */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm text-gray-700 mb-3">Live Preview</h4>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-xs text-gray-600 mb-2">Banner appearance:</p>
                  <div 
                    className="rounded-lg p-4 text-white mb-4"
                    style={{ backgroundColor: bannerColor }}
                  >
                    <div className="text-sm">{bannerTitle || 'Banner Title'}</div>
                    <div className="text-xs mt-1 opacity-90">{bannerMessage || 'Banner message will appear here'}</div>
                  </div>

                  <p className="text-xs text-gray-600 mb-2">In email signature:</p>
                  <div className="bg-white p-4 border border-gray-200 rounded text-sm">
                    <div className="text-gray-900">John Doe</div>
                    <div className="text-gray-600">Marketing Manager</div>
                    <div className="text-gray-600 mt-2 text-xs">
                      <div>john.doe@company.com</div>
                      <div>+1 (555) 123-4567</div>
                    </div>
                    
                    <div 
                      className="mt-3 rounded p-3 text-white cursor-pointer hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: bannerColor }}
                    >
                      <div className="text-xs">{bannerTitle || 'Banner Title'}</div>
                      <div className="text-xs mt-0.5 opacity-90">{bannerMessage || 'Message'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)} className="border-gray-300">
              Cancel
            </Button>
            <Button onClick={() => setIsCreateModalOpen(false)} className="bg-[#2563EB] hover:bg-[#1d4ed8]">
              Create Banner
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

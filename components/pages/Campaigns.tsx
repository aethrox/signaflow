import { useState } from 'react';
import { Calendar, Clock, Edit2, Trash2, Copy, Plus, Square } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { ConfirmDialog } from '../ConfirmDialog';

interface Campaign {
  id: number;
  title: string;
  message: string;
  linkUrl: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  status: 'active' | 'scheduled' | 'expired';
}

export function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: 1,
      title: 'Summer Sale',
      message: 'Get 25% off all products this summer! Limited time offer.',
      linkUrl: 'https://company.com/summer-sale',
      startDate: '2025-10-20',
      endDate: '2025-11-15',
      isActive: true,
      status: 'active',
    },
    {
      id: 2,
      title: 'Winter Campaign',
      message: 'Holiday special - up to 50% off selected items!',
      linkUrl: 'https://company.com/winter',
      startDate: '2025-12-01',
      endDate: '2025-12-31',
      isActive: false,
      status: 'scheduled',
    },
    {
      id: 3,
      title: 'Spring Promo',
      message: 'Fresh deals for the new season!',
      linkUrl: 'https://company.com/spring',
      startDate: '2025-03-01',
      endDate: '2025-03-31',
      isActive: false,
      status: 'expired',
    },
  ]);

  const [editingCampaignId, setEditingCampaignId] = useState<number | null>(1);
  const [formData, setFormData] = useState({
    title: campaigns[0].title,
    message: campaigns[0].message,
    linkUrl: campaigns[0].linkUrl,
    startDate: campaigns[0].startDate,
    endDate: campaigns[0].endDate,
  });
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; campaignId: number | null }>({ show: false, campaignId: null });

  const editingCampaign = campaigns.find((c) => c.id === editingCampaignId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCampaignId) {
      const newStatus = getCampaignStatus(formData.startDate, formData.endDate);

      setCampaigns(
        campaigns.map((c) =>
          c.id === editingCampaignId
            ? { ...c, ...formData, status: newStatus }
            : c
        )
      );

      if (newStatus === 'expired') {
        toast.warning('Campaign dates are in the past', {
          description: 'This campaign will be marked as expired',
        });
      } else {
        toast.success('Campaign updated successfully!');
      }
    }
  };

  const getCampaignStatus = (startDate: string, endDate: string): 'active' | 'scheduled' | 'expired' => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now >= start && now <= end) return 'active';
    if (now < start) return 'scheduled';
    return 'expired';
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      active: {
        icon: <div className="w-2 h-2 rounded-full bg-[#10B981]" />,
        text: 'Active',
        className: 'bg-[#ECFDF5] text-[#10B981]',
      },
      scheduled: {
        icon: <Clock size={12} />,
        text: 'Scheduled',
        className: 'bg-[#FEF3C7] text-[#F59E0B]',
      },
      expired: {
        icon: <Square size={12} />,
        text: 'Expired',
        className: 'bg-gray-100 text-gray-600',
      },
    };

    const badge = badges[status as keyof typeof badges];
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${badge.className}`}>
        {badge.icon}
        {badge.text}
      </span>
    );
  };

  const handleToggleActive = () => {
    if (editingCampaignId) {
      setCampaigns(
        campaigns.map((c) =>
          c.id === editingCampaignId ? { ...c, isActive: !c.isActive } : c
        )
      );
      toast.success(editingCampaign?.isActive ? 'Campaign deactivated' : 'Campaign activated');
    }
  };

  const handleEditCampaign = (campaign: Campaign) => {
    setEditingCampaignId(campaign.id);
    setFormData({
      title: campaign.title,
      message: campaign.message,
      linkUrl: campaign.linkUrl,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
    });
  };

  const handleDeleteCampaign = (id: number) => {
    setDeleteConfirm({ show: true, campaignId: id });
  };

  const handleConfirmDelete = () => {
    if (deleteConfirm.campaignId) {
      setCampaigns(campaigns.filter((c) => c.id !== deleteConfirm.campaignId));
      toast.success('Campaign deleted successfully');
      if (editingCampaignId === deleteConfirm.campaignId) {
        const remaining = campaigns.filter((c) => c.id !== deleteConfirm.campaignId);
        if (remaining.length > 0) {
          handleEditCampaign(remaining[0]);
        }
      }
    }
    setDeleteConfirm({ show: false, campaignId: null });
  };

  const handleDuplicateCampaign = (campaign: Campaign) => {
    const newCampaign: Campaign = {
      ...campaign,
      id: Math.max(...campaigns.map((c) => c.id)) + 1,
      title: `${campaign.title} (Copy)`,
      isActive: false,
    };
    setCampaigns([...campaigns, newCampaign]);
    toast.success('Campaign duplicated successfully');
  };

  const handleCreateNew = () => {
    const newCampaign: Campaign = {
      id: Math.max(...campaigns.map((c) => c.id)) + 1,
      title: 'New Campaign',
      message: 'Enter your campaign message here',
      linkUrl: 'https://company.com',
      startDate: format(new Date(), 'yyyy-MM-dd'),
      endDate: format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
      isActive: false,
      status: 'scheduled',
    };
    setCampaigns([...campaigns, newCampaign]);
    handleEditCampaign(newCampaign);
    toast.success('New campaign created');
  };

  return (
    <div>
      <div className="mb-6 md:mb-8">
        <h1 className="text-[#1F2937] text-2xl md:text-3xl font-bold mb-2">Banner Campaigns</h1>
        <p className="text-[#6B7280] text-sm md:text-base">Create promotional banners for your email signatures</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-[#1F2937]">
                  {editingCampaign ? 'Edit Campaign' : 'Current Campaign'}
                </h2>
                {editingCampaign && getStatusBadge(editingCampaign.status)}
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-medium ${editingCampaign?.isActive ? 'text-[#10B981]' : 'text-[#6B7280]'}`}>
                  {editingCampaign?.isActive ? 'Active' : 'Inactive'}
                </span>
                <button
                  onClick={handleToggleActive}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    editingCampaign?.isActive ? 'bg-[#10B981]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      editingCampaign?.isActive ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-2">
                  Campaign Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="h-10 px-3 border border-[#E5E7EB] rounded-lg w-full focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all"
                  placeholder="e.g., Summer Sale"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-2">
                  Message (max 150 characters)
                </label>
                <textarea
                  required
                  maxLength={150}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="px-3 py-2 border border-[#E5E7EB] rounded-lg w-full focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all resize-none"
                  rows={3}
                  placeholder="Enter your campaign message..."
                />
                <div className="text-xs text-[#6B7280] mt-1 text-right">
                  {formData.message.length}/150
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-2">
                  Link URL
                </label>
                <input
                  type="url"
                  required
                  value={formData.linkUrl}
                  onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                  className="h-10 px-3 border border-[#E5E7EB] rounded-lg w-full focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1F2937] mb-3">
                  Campaign Schedule
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[#6B7280] mb-1.5">Start Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" size={16} />
                      <input
                        type="date"
                        required
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="h-10 pl-10 pr-3 border border-[#E5E7EB] rounded-lg w-full focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-[#6B7280] mb-1.5">End Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" size={16} />
                      <input
                        type="date"
                        required
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        min={formData.startDate}
                        className="h-10 pl-10 pr-3 border border-[#E5E7EB] rounded-lg w-full focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-2.5 bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-[#1d4ed8] transition-all shadow-sm"
              >
                Update Campaign
              </button>
            </form>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#1F2937]">All Campaigns</h2>
              <button
                onClick={handleCreateNew}
                className="px-3 py-1.5 bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-[#1d4ed8] transition-all text-sm flex items-center gap-1.5"
              >
                <Plus size={14} />
                Create New
              </button>
            </div>

            <div className="space-y-3">
              {campaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className={`border rounded-lg p-4 transition-all cursor-pointer ${
                    editingCampaignId === campaign.id
                      ? 'border-[#2563EB] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => handleEditCampaign(campaign)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-[#1F2937] text-sm truncate">
                          {campaign.title}
                        </h3>
                        {getStatusBadge(campaign.status)}
                      </div>
                      <p className="text-xs text-[#6B7280] line-clamp-1">{campaign.message}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-3">
                    <Calendar size={12} />
                    <span>
                      {format(new Date(campaign.startDate), 'MMM dd, yyyy')} -{' '}
                      {format(new Date(campaign.endDate), 'MMM dd, yyyy')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditCampaign(campaign);
                      }}
                      className="flex-1 px-2 py-1.5 bg-white border border-[#E5E7EB] text-[#1F2937] rounded text-xs font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-1"
                    >
                      <Edit2 size={12} />
                      Edit
                    </button>

                    {campaign.status === 'expired' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDuplicateCampaign(campaign);
                        }}
                        className="flex-1 px-2 py-1.5 bg-white border border-[#E5E7EB] text-[#1F2937] rounded text-xs font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-1"
                      >
                        <Copy size={12} />
                        Duplicate
                      </button>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCampaign(campaign.id);
                      }}
                      className="px-2 py-1.5 bg-white border border-[#E5E7EB] text-[#EF4444] rounded text-xs font-medium hover:bg-red-50 transition-all flex items-center justify-center gap-1"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-[#1F2937] mb-2">Tips for Effective Campaigns</h3>
            <ul className="text-sm text-[#6B7280] space-y-1">
              <li>• Keep messages short and compelling</li>
              <li>• Use clear call-to-action phrases</li>
              <li>• Test links before activating</li>
              <li>• Update campaigns regularly for freshness</li>
            </ul>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8">
            <h2 className="text-lg font-bold text-[#1F2937] mb-4">Live Preview</h2>
            <p className="text-sm text-[#6B7280] mb-6">
              This is how the banner will appear in email signatures
            </p>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <div className="text-gray-900 font-semibold">John Doe</div>
                  <div className="text-gray-600 text-sm">Marketing Manager</div>
                  <div className="text-gray-600 text-sm mt-2">
                    <div>john.doe@company.com</div>
                    <div>+1 (555) 123-4567</div>
                  </div>
                </div>

                {editingCampaign?.isActive && (
                  <a
                    href={formData.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white rounded-lg p-4 hover:from-[#1d4ed8] hover:to-[#1e40af] transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-bold text-lg mb-1">{formData.title}</div>
                        <div className="text-sm opacity-90">{formData.message}</div>
                      </div>
                      <div className="ml-4">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </a>
                )}
              </div>
            </div>

            {!editingCampaign?.isActive && (
              <div className="mt-4 text-center">
                <p className="text-sm text-[#6B7280]">
                  Campaign is currently inactive. Toggle the switch above to activate it.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={deleteConfirm.show}
        onClose={() => setDeleteConfirm({ show: false, campaignId: null })}
        onConfirm={handleConfirmDelete}
        title="Delete Campaign"
        message="Are you sure you want to delete this campaign? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        danger
      />
    </div>
  );
}

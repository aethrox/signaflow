import { useState } from 'react';

export function Campaigns() {
  const [isActive, setIsActive] = useState(true);
  const [formData, setFormData] = useState({
    title: 'Summer Sale',
    message: 'Get 25% off all products this summer! Limited time offer.',
    linkUrl: 'https://company.com/summer-sale',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[#1F2937] text-3xl font-bold mb-2">Banner Campaigns</h1>
        <p className="text-[#6B7280]">Create promotional banners for your email signatures</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#1F2937]">Current Campaign</h2>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-medium ${isActive ? 'text-[#10B981]' : 'text-[#6B7280]'}`}>
                  {isActive ? 'Active' : 'Inactive'}
                </span>
                <button
                  onClick={() => setIsActive(!isActive)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isActive ? 'bg-[#10B981]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isActive ? 'translate-x-6' : 'translate-x-1'
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

              <button
                type="submit"
                className="w-full px-6 py-2.5 bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-[#1d4ed8] transition-all shadow-sm"
              >
                Update Campaign
              </button>
            </form>
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
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

                {isActive && (
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

            {!isActive && (
              <div className="mt-4 text-center">
                <p className="text-sm text-[#6B7280]">
                  Campaign is currently inactive. Toggle the switch above to activate it.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

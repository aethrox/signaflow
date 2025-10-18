import { useState } from 'react';
import { Upload, Save, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

interface CompanySettings {
  name: string;
  domain: string;
  logoUrl: string | null;
  logoFileName: string | null;
  brandColor: string;
  n8nWebhookUrl: string;
  socialMedia: {
    linkedin: string;
    twitter: string;
    facebook: string;
  };
}

interface DefaultSettings {
  defaultTemplate: string;
  departmentAssignments: {
    [key: string]: string;
  };
  footerText: string;
  includeUnsubscribe: boolean;
  includeConfidentiality: boolean;
}

interface LegalSettings {
  kvkkText: string;
  disclaimer: string;
  confidentiality: string;
  classifications: string[];
}

const DEFAULT_LEGAL_TEXTS = {
  kvkkText: 'Bu e-posta kişisel veri içerebilir. KVKK kapsamında işlenmektedir. Yetkisiz kullanımı yasaktır.',
  disclaimer: 'This message is intended only for the use of the individual or entity to which it is addressed and may contain information that is privileged, confidential, and exempt from disclosure under applicable law.',
  confidentiality: 'CONFIDENTIAL: This communication and any attachments contain confidential information intended solely for the recipient. Any unauthorized review, use, disclosure, or distribution is prohibited.',
};

export function Settings() {
  const [activeTab, setActiveTab] = useState<'company' | 'defaults' | 'legal'>('company');

  const [companySettings, setCompanySettings] = useState<CompanySettings>({
    name: 'Company Ltd.',
    domain: 'company.com',
    logoUrl: null,
    logoFileName: null,
    brandColor: '#2B4C8C',
    n8nWebhookUrl: 'https://sldzx1zf.rcld.app/webhook/generate-signature',
    socialMedia: {
      linkedin: 'linkedin.com/company/example',
      twitter: 'twitter.com/company',
      facebook: 'facebook.com/company',
    },
  });

  const [defaultSettings, setDefaultSettings] = useState<DefaultSettings>({
    defaultTemplate: 'professional',
    departmentAssignments: {
      Executive: 'professional',
      Technology: 'modern',
      Sales: 'professional',
      Marketing: 'modern',
      Design: 'minimal',
    },
    footerText: 'This email and any attachments are confidential and may be legally privileged.',
    includeUnsubscribe: true,
    includeConfidentiality: true,
  });

  const [legalSettings, setLegalSettings] = useState<LegalSettings>({
    kvkkText: DEFAULT_LEGAL_TEXTS.kvkkText,
    disclaimer: DEFAULT_LEGAL_TEXTS.disclaimer,
    confidentiality: DEFAULT_LEGAL_TEXTS.confidentiality,
    classifications: ['Public', 'Internal', 'Confidential', 'Restricted'],
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCompanySettings({
        ...companySettings,
        logoFileName: file.name,
        logoUrl: URL.createObjectURL(file),
      });
      toast.success('Logo uploaded successfully!');
    }
  };

  const handleSaveCompany = () => {
    toast.success('Company settings saved successfully!');
  };

  const handleSaveDefaults = () => {
    toast.success('Default settings saved successfully!');
  };

  const handleSaveLegal = () => {
    toast.success('Legal settings saved successfully!');
  };

  const handleResetLegalText = (field: 'kvkkText' | 'disclaimer' | 'confidentiality') => {
    setLegalSettings({
      ...legalSettings,
      [field]: DEFAULT_LEGAL_TEXTS[field],
    });
    toast.info('Text reset to default');
  };

  const toggleClassification = (classification: string) => {
    const isSelected = legalSettings.classifications.includes(classification);
    if (isSelected) {
      setLegalSettings({
        ...legalSettings,
        classifications: legalSettings.classifications.filter((c) => c !== classification),
      });
    } else {
      setLegalSettings({
        ...legalSettings,
        classifications: [...legalSettings.classifications, classification],
      });
    }
  };

  return (
    <div>
      <div className="mb-6 md:mb-8">
        <h1 className="text-[#1F2937] text-2xl md:text-3xl font-bold mb-2">Settings</h1>
        <p className="text-[#6B7280] text-sm md:text-base">
          Manage your company settings and signature defaults
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px overflow-x-auto">
            <button
              onClick={() => setActiveTab('company')}
              className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'company'
                  ? 'border-[#2563EB] text-[#2563EB]'
                  : 'border-transparent text-[#6B7280] hover:text-[#1F2937] hover:border-gray-300'
              }`}
            >
              Company
            </button>
            <button
              onClick={() => setActiveTab('defaults')}
              className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'defaults'
                  ? 'border-[#2563EB] text-[#2563EB]'
                  : 'border-transparent text-[#6B7280] hover:text-[#1F2937] hover:border-gray-300'
              }`}
            >
              Signature Defaults
            </button>
            <button
              onClick={() => setActiveTab('legal')}
              className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'legal'
                  ? 'border-[#2563EB] text-[#2563EB]'
                  : 'border-transparent text-[#6B7280] hover:text-[#1F2937] hover:border-gray-300'
              }`}
            >
              Legal & Compliance
            </button>
          </nav>
        </div>

        <div className="p-6 md:p-8">
          {activeTab === 'company' && (
            <div className="max-w-2xl">
              <h3 className="text-lg font-bold text-[#1F2937] mb-6">Company Information</h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={companySettings.name}
                    onChange={(e) =>
                      setCompanySettings({ ...companySettings, name: e.target.value })
                    }
                    className="w-full h-10 px-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1F2937] mb-2">Domain</label>
                  <input
                    type="text"
                    value={companySettings.domain}
                    onChange={(e) =>
                      setCompanySettings({ ...companySettings, domain: e.target.value })
                    }
                    className="w-full h-10 px-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                    Company Logo
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#2563EB] transition-colors">
                    <input
                      type="file"
                      id="logo-upload"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <label htmlFor="logo-upload" className="cursor-pointer">
                      <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                      <p className="text-sm font-medium text-[#1F2937] mb-1">
                        {companySettings.logoFileName || 'Upload Logo'}
                      </p>
                      <p className="text-xs text-[#6B7280]">
                        Drag & drop or click to upload
                      </p>
                      <p className="text-xs text-[#6B7280] mt-1">Recommended: 200x60px PNG</p>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                    Primary Brand Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={companySettings.brandColor}
                      onChange={(e) =>
                        setCompanySettings({ ...companySettings, brandColor: e.target.value })
                      }
                      className="h-10 w-20 rounded border border-[#E5E7EB] cursor-pointer"
                    />
                    <input
                      type="text"
                      value={companySettings.brandColor}
                      onChange={(e) =>
                        setCompanySettings({ ...companySettings, brandColor: e.target.value })
                      }
                      className="flex-1 h-10 px-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1F2937] mb-3">
                    Social Media Links
                  </label>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-[#6B7280] mb-1">LinkedIn</label>
                      <input
                        type="text"
                        value={companySettings.socialMedia.linkedin}
                        onChange={(e) =>
                          setCompanySettings({
                            ...companySettings,
                            socialMedia: { ...companySettings.socialMedia, linkedin: e.target.value },
                          })
                        }
                        className="w-full h-10 px-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#6B7280] mb-1">Twitter</label>
                      <input
                        type="text"
                        value={companySettings.socialMedia.twitter}
                        onChange={(e) =>
                          setCompanySettings({
                            ...companySettings,
                            socialMedia: { ...companySettings.socialMedia, twitter: e.target.value },
                          })
                        }
                        className="w-full h-10 px-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#6B7280] mb-1">Facebook</label>
                      <input
                        type="text"
                        value={companySettings.socialMedia.facebook}
                        onChange={(e) =>
                          setCompanySettings({
                            ...companySettings,
                            socialMedia: { ...companySettings.socialMedia, facebook: e.target.value },
                          })
                        }
                        className="w-full h-10 px-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                    N8N Webhook URL
                  </label>
                  <input
                    type="url"
                    value={companySettings.n8nWebhookUrl}
                    onChange={(e) =>
                      setCompanySettings({ ...companySettings, n8nWebhookUrl: e.target.value })
                    }
                    className="w-full h-10 px-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all"
                    placeholder="https://your-n8n.com/webhook/generate-signature"
                  />
                  <p className="text-sm text-[#6B7280] mt-1">
                    Your N8N workflow webhook URL for signature generation
                  </p>
                </div>

                <button
                  onClick={handleSaveCompany}
                  className="px-6 py-2.5 bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-[#1d4ed8] transition-all shadow-sm flex items-center gap-2"
                >
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'defaults' && (
            <div className="max-w-2xl">
              <h3 className="text-lg font-bold text-[#1F2937] mb-6">Default Template Settings</h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                    Default Template
                  </label>
                  <select
                    value={defaultSettings.defaultTemplate}
                    onChange={(e) =>
                      setDefaultSettings({ ...defaultSettings, defaultTemplate: e.target.value })
                    }
                    className="w-full h-10 px-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all"
                  >
                    <option value="minimal">Minimal</option>
                    <option value="professional">Professional</option>
                    <option value="modern">Modern</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1F2937] mb-3">
                    Department Template Assignments
                  </label>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    {Object.keys(defaultSettings.departmentAssignments).map((dept) => (
                      <div key={dept} className="flex items-center justify-between gap-4">
                        <span className="text-sm font-medium text-[#1F2937] min-w-[100px]">
                          {dept}
                        </span>
                        <select
                          value={defaultSettings.departmentAssignments[dept]}
                          onChange={(e) =>
                            setDefaultSettings({
                              ...defaultSettings,
                              departmentAssignments: {
                                ...defaultSettings.departmentAssignments,
                                [dept]: e.target.value,
                              },
                            })
                          }
                          className="flex-1 h-9 px-3 border border-[#E5E7EB] rounded-lg bg-white focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all text-sm"
                        >
                          <option value="minimal">Minimal</option>
                          <option value="professional">Professional</option>
                          <option value="modern">Modern</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                    Email Footer Settings
                  </label>
                  <label className="block text-xs text-[#6B7280] mb-2">Footer Text</label>
                  <textarea
                    value={defaultSettings.footerText}
                    onChange={(e) =>
                      setDefaultSettings({ ...defaultSettings, footerText: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all resize-none"
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={defaultSettings.includeUnsubscribe}
                      onChange={(e) =>
                        setDefaultSettings({
                          ...defaultSettings,
                          includeUnsubscribe: e.target.checked,
                        })
                      }
                      className="w-4 h-4 text-[#2563EB] border-gray-300 rounded focus:ring-[#2563EB]"
                    />
                    <span className="text-sm text-[#1F2937]">Include unsubscribe link</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={defaultSettings.includeConfidentiality}
                      onChange={(e) =>
                        setDefaultSettings({
                          ...defaultSettings,
                          includeConfidentiality: e.target.checked,
                        })
                      }
                      className="w-4 h-4 text-[#2563EB] border-gray-300 rounded focus:ring-[#2563EB]"
                    />
                    <span className="text-sm text-[#1F2937]">Add confidentiality notice</span>
                  </label>
                </div>

                <button
                  onClick={handleSaveDefaults}
                  className="px-6 py-2.5 bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-[#1d4ed8] transition-all shadow-sm flex items-center gap-2"
                >
                  <Save size={16} />
                  Save Defaults
                </button>
              </div>
            </div>
          )}

          {activeTab === 'legal' && (
            <div className="max-w-3xl">
              <h3 className="text-lg font-bold text-[#1F2937] mb-6">Legal & Compliance Texts</h3>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-semibold text-[#1F2937]">
                      KVKK Compliance Text (Turkish GDPR)
                    </label>
                    <button
                      onClick={() => handleResetLegalText('kvkkText')}
                      className="text-xs text-[#2563EB] hover:text-[#1d4ed8] flex items-center gap-1"
                    >
                      <RotateCcw size={12} />
                      Reset to Default
                    </button>
                  </div>
                  <textarea
                    value={legalSettings.kvkkText}
                    onChange={(e) =>
                      setLegalSettings({ ...legalSettings, kvkkText: e.target.value })
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all resize-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-semibold text-[#1F2937]">
                      Legal Disclaimer
                    </label>
                    <button
                      onClick={() => handleResetLegalText('disclaimer')}
                      className="text-xs text-[#2563EB] hover:text-[#1d4ed8] flex items-center gap-1"
                    >
                      <RotateCcw size={12} />
                      Reset to Default
                    </button>
                  </div>
                  <textarea
                    value={legalSettings.disclaimer}
                    onChange={(e) =>
                      setLegalSettings({ ...legalSettings, disclaimer: e.target.value })
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all resize-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-semibold text-[#1F2937]">
                      Confidentiality Notice
                    </label>
                    <button
                      onClick={() => handleResetLegalText('confidentiality')}
                      className="text-xs text-[#2563EB] hover:text-[#1d4ed8] flex items-center gap-1"
                    >
                      <RotateCcw size={12} />
                      Reset to Default
                    </button>
                  </div>
                  <textarea
                    value={legalSettings.confidentiality}
                    onChange={(e) =>
                      setLegalSettings({ ...legalSettings, confidentiality: e.target.value })
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1F2937] mb-3">
                    Email Classification Labels
                  </label>
                  <div className="space-y-2">
                    {['Public', 'Internal', 'Confidential', 'Restricted'].map((label) => (
                      <label key={label} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={legalSettings.classifications.includes(label)}
                          onChange={() => toggleClassification(label)}
                          className="w-4 h-4 text-[#2563EB] border-gray-300 rounded focus:ring-[#2563EB]"
                        />
                        <span className="text-sm text-[#1F2937]">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleSaveLegal}
                  className="px-6 py-2.5 bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-[#1d4ed8] transition-all shadow-sm flex items-center gap-2"
                >
                  <Save size={16} />
                  Save Legal Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

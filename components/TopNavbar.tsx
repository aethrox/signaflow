import { Bell, ChevronDown, Menu } from 'lucide-react';

interface TopNavbarProps {
  breadcrumbs: string[];
  onMenuClick: () => void;
}

export function TopNavbar({ breadcrumbs, onMenuClick }: TopNavbarProps) {
  return (
    <div className="fixed top-0 left-0 lg:left-[240px] right-0 h-16 bg-white border-b border-[#E5E7EB] flex items-center px-4 md:px-8 z-20">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 mr-4 text-[#6B7280] hover:text-[#1F2937] hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Menu size={24} />
      </button>

      <div className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && <span className="text-[#6B7280] hidden sm:inline">/</span>}
            <span
              className={`${
                index === breadcrumbs.length - 1
                  ? 'text-[#1F2937] font-medium'
                  : 'text-[#6B7280] hidden sm:inline'
              }`}
            >
              {crumb}
            </span>
          </div>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-2 md:gap-4">
        <button className="relative p-2 text-[#6B7280] hover:text-[#1F2937] hover:bg-gray-100 rounded-lg transition-colors">
          <Bell size={20} className="md:w-6 md:h-6" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full"></span>
        </button>

        <div className="hidden md:flex items-center gap-3 pl-4 border-l border-[#E5E7EB]">
          <div className="w-10 h-10 rounded-full bg-[#E0E7FF] flex items-center justify-center text-[#2563EB] font-semibold text-sm">
            JD
          </div>
          <div className="text-sm hidden lg:block">
            <div className="font-semibold text-[#1F2937]">John Doe</div>
            <div className="text-xs text-[#6B7280]">Admin</div>
          </div>
          <ChevronDown size={16} className="text-[#6B7280] hidden lg:block" />
        </div>
      </div>
    </div>
  );
}

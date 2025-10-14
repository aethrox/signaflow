import { Bell, ChevronDown } from 'lucide-react';

interface TopNavbarProps {
  breadcrumbs: string[];
}

export function TopNavbar({ breadcrumbs }: TopNavbarProps) {
  return (
    <div className="fixed top-0 left-[240px] right-0 h-16 bg-white border-b border-[#E5E7EB] flex items-center px-8 z-20">
      <div className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && <span className="text-[#6B7280]">/</span>}
            <span
              className={
                index === breadcrumbs.length - 1
                  ? 'text-[#1F2937] font-medium'
                  : 'text-[#6B7280]'
              }
            >
              {crumb}
            </span>
          </div>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-4">
        <button className="relative p-2 text-[#6B7280] hover:text-[#1F2937] transition-colors">
          <Bell size={24} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-[#E5E7EB]">
          <div className="w-10 h-10 rounded-full bg-[#E0E7FF] flex items-center justify-center text-[#2563EB] font-semibold text-sm">
            JD
          </div>
          <div className="text-sm">
            <div className="font-semibold text-[#1F2937]">John Doe</div>
            <div className="text-xs text-[#6B7280]">Admin</div>
          </div>
          <ChevronDown size={16} className="text-[#6B7280]" />
        </div>
      </div>
    </div>
  );
}

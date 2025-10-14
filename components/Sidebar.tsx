import { Home, Users, Layout, Megaphone, Settings, X } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ currentPage, onNavigate, isOpen, onClose }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'templates', label: 'Templates', icon: Layout },
    { id: 'campaigns', label: 'Campaigns', icon: Megaphone },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed left-0 top-0 h-screen w-[240px] bg-[#1E3A8A] flex flex-col z-40 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img
              src="/signaflow_logo.svg"
              alt="SignaFlow"
              className="h-10 w-10 object-contain"
            />
            <h1 className="text-white text-xl font-bold tracking-tight">SignaFlow</h1>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 py-6 px-3 overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full h-12 px-4 flex items-center gap-3 rounded-r-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-[#2563EB] text-white'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-auto pt-6 border-t border-white/10">
            <button
              onClick={() => onNavigate('settings')}
              className={`w-full h-12 px-4 flex items-center gap-3 rounded-r-lg transition-all duration-200 ${
                currentPage === 'settings'
                  ? 'bg-[#2563EB] text-white'
                  : 'text-white/80 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Settings size={20} />
              <span className="text-sm font-medium">Settings</span>
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-semibold">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm font-medium truncate">John Doe</div>
              <div className="text-white/60 text-xs">Admin</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

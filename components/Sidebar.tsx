import { Home, Users, Layout, Megaphone, Settings } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'templates', label: 'Templates', icon: Layout },
    { id: 'campaigns', label: 'Campaigns', icon: Megaphone },
  ];

  return (
    <div className="w-60 h-full bg-[#1E3A8A] flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-white/10">
        <h2 className="text-white">SignatureHub</h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full h-12 flex items-center px-4 mb-1 rounded-r-lg transition-all ${
                isActive
                  ? 'bg-[#2563EB] text-white'
                  : 'text-white/80 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="px-3 pb-4">
        <button
          onClick={() => onNavigate('settings')}
          className="w-full h-12 flex items-center px-4 mb-4 rounded-r-lg text-white/80 hover:text-white hover:bg-white/5 transition-all"
        >
          <Settings className="w-5 h-5 mr-3" />
          <span>Settings</span>
        </button>

        {/* User Profile */}
        <div className="flex items-center px-4 py-3 bg-white/10 rounded-lg">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-[#2563EB] text-white">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="ml-3 flex-1 min-w-0">
            <p className="text-white text-sm truncate">John Doe</p>
          </div>
        </div>
      </div>
    </div>
  );
}

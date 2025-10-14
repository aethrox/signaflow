import { Bell, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface TopNavbarProps {
  breadcrumbs: string[];
}

export function TopNavbar({ breadcrumbs }: TopNavbarProps) {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm">
        {breadcrumbs.map((crumb, index) => (
          <span key={index} className="flex items-center">
            <span className={index === breadcrumbs.length - 1 ? 'text-gray-900' : 'text-gray-500'}>
              {crumb}
            </span>
            {index < breadcrumbs.length - 1 && (
              <span className="mx-2 text-gray-400">{'>'}</span>
            )}
          </span>
        ))}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 hover:bg-gray-100 rounded-lg px-2 py-1.5 transition-colors">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-[#2563EB] text-white">
                  JD
                </AvatarFallback>
              </Avatar>
              <span className="text-sm">John Doe</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

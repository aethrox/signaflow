import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
  badge?: {
    text: string;
    variant: 'success' | 'warning' | 'info';
  };
}

export function MetricCard({ title, value, icon: Icon, subtitle, badge }: MetricCardProps) {
  const badgeColors = {
    success: 'bg-[#10B981] text-white',
    warning: 'bg-[#EF4444] text-white',
    info: 'bg-[#2563EB] text-white',
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-500 text-sm mb-2">{title}</p>
          <div className="flex items-end gap-2">
            <h3 className="text-gray-900">{value}</h3>
            {badge && (
              <span className={`px-2 py-0.5 rounded-full text-xs ${badgeColors[badge.variant]}`}>
                {badge.text}
              </span>
            )}
          </div>
          {subtitle && <p className="text-gray-600 text-sm mt-1">{subtitle}</p>}
        </div>
        <div className="w-12 h-12 bg-[#2563EB]/10 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-[#2563EB]" />
        </div>
      </div>
    </div>
  );
}

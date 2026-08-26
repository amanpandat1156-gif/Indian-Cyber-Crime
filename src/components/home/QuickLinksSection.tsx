import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Search, LifeBuoy, Bell } from 'lucide-react';

export const QuickLinksSection: React.FC = () => {
  const items = [
    {
      icon: FileText,
      title: 'Report',
      description: 'Share what happened',
      href: '/report/financial',
    },
    {
      icon: Search,
      title: 'Track',
      description: 'Check your complaint status',
      href: '/track',
    },
    {
      icon: LifeBuoy,
      title: 'Get Help',
      description: 'Find the right support',
      href: '/help',
    },
    {
      icon: Bell,
      title: 'Stay Informed',
      description: 'Know what to do next',
      href: '/safety-guide',
    },
  ];

  return (
    <section className="mt-8 sm:mt-12 mb-8 sm:mb-12" aria-label="Quick Access Links">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              to={item.href}
              className="flex items-center gap-3.5 p-3 sm:p-4 rounded-[8px] bg-white/40 sm:bg-transparent hover:bg-white/60 transition-colors group min-h-[48px]"
            >
              <div className="w-10 h-10 rounded-full bg-white border border-[#DDE2E4] text-[#12304A] flex items-center justify-center shrink-0 shadow-xs group-hover:border-[#12304A]/30">
                <Icon className="w-4 h-4 stroke-[1.8]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13.5px] sm:text-[14px] font-bold text-[#12304A] group-hover:text-[#0B2235]">
                  {item.title}
                </span>
                <span className="text-[11px] sm:text-[11.5px] text-[#5E6B73]">
                  {item.description}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

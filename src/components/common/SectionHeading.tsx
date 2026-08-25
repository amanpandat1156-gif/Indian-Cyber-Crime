import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  action?: React.ReactNode;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
  action,
}) => {
  const alignmentClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col ${alignmentClass} ${className}`}>
      {eyebrow && (
        <div className="flex items-center gap-2 mb-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-ncrp-saffron inline-block"></span>
          <span className="text-xs font-bold tracking-widest uppercase text-ncrp-muted">
            {eyebrow}
          </span>
        </div>
      )}
      <div className={`w-full flex flex-col ${action ? 'sm:flex-row sm:items-end sm:justify-between' : ''} gap-4`}>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ncrp-navy leading-tight">
            {title}
          </h2>
          {description && (
            <p className="mt-2.5 text-base text-ncrp-muted leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
        </div>
        {action && <div className="shrink-0 mt-2 sm:mt-0">{action}</div>}
      </div>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { Container } from '../components/common/Container';

interface PlaceholderPageProps {
  title: string;
  description?: string;
  stageNote?: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  description = 'This section will be fully implemented in an upcoming development stage.',
  stageNote = 'Stage 1 — Pass 1 Foundation Active',
}) => {
  return (
    <div className="py-8 sm:py-24">
      <Container size="sm" className="px-3.5 sm:px-6">
        <div className="bg-white rounded-card border border-ncrp-border p-5 sm:p-12 shadow-card text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-subtle bg-[#EDF3F7] text-ncrp-navy flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 stroke-[1.75]" />
          </div>

          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-badge bg-ncrp-warmBg border border-ncrp-border text-xs font-semibold text-ncrp-muted mb-3">
            {stageNote}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-ncrp-navy tracking-tight">
            {title}
          </h1>

          <p className="mt-3 text-base text-ncrp-muted max-w-md">
            {description}
          </p>

          <div className="mt-8 pt-6 border-t border-ncrp-border w-full flex justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ncrp-navy hover:text-ncrp-darkNavy"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

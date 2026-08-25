import React from 'react';
import { Container } from '../common/Container';
import { IntentCard } from '../cards/IntentCard';
import { primaryIntentCards } from '../../data/intentCards';

export const IntentGridSection: React.FC = () => {
  return (
    <section className="pb-12 sm:pb-16" aria-label="Citizen Reporting and Assistance Services">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {primaryIntentCards.map((card) => (
            <IntentCard key={card.id} item={card} />
          ))}
        </div>
      </Container>
    </section>
  );
};

import React from 'react';
import { PageLayout } from '@/components/layout';
import { TournamentsPageContent } from './TournamentsPageContent';

export const TournamentsPage: React.FC = () => {
  return (
    <PageLayout>
      <TournamentsPageContent />
    </PageLayout>
  );
};

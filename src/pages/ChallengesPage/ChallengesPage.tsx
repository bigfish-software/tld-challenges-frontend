import React from 'react';
import { PageLayout } from '@/components/layout';
import { ChallengesPageContent } from './ChallengesPageContent';

export const ChallengesPage: React.FC = () => {
  return (
    <PageLayout>
      <ChallengesPageContent />
    </PageLayout>
  );
};

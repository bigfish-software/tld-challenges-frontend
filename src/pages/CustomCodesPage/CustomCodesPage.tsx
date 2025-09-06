import React from 'react';
import { PageLayout } from '@/components/layout';
import { CustomCodesPageContent } from './CustomCodesPageContent';

export const CustomCodesPage: React.FC = () => {
  return (
    <PageLayout>
      <CustomCodesPageContent />
    </PageLayout>
  );
};

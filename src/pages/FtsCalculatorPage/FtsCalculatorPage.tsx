import React from 'react';
import { PageLayout } from '../../components/layout';
import { FtsCalculatorForm } from '../../components/ui';

export const FtsCalculatorPage: React.FC = () => {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-primary mb-8 text-center font-headline uppercase">
          Furry, then silence - Calculator
        </h1>
        
        <FtsCalculatorForm />
      </div>
    </PageLayout>
  );
};

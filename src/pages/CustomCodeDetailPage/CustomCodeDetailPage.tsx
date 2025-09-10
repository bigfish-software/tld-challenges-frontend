import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useCustomCode } from '@/hooks/api';
import { PageLayout } from '@/components/layout/PageLayout';
import { LoadingSpinner } from '@/components/ui';
import { ErrorDisplay } from '@/components/ui/ErrorDisplay';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { CustomCodeDetail } from './CustomCodeDetail';

export const CustomCodeDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // If no slug provided, redirect to custom codes page
  if (!slug) {
    return <Navigate to="/custom-codes" replace />;
  }

  const { 
    data: customCode, 
    isLoading, 
    error 
  } = useCustomCode(slug);
  
  if (isLoading) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </PageLayout>
    );
  }

  if (error || !customCode) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8">
          <ErrorDisplay
            title="Custom Code Not Found"
            message="The custom code you're looking for doesn't exist or has been removed."
            onRetry={() => window.location.href = '/custom-codes'}
            retryText="Browse Custom Codes"
          />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Breadcrumb Navigation */}
      <Breadcrumb 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Custom Codes', href: '/custom-codes' },
          { label: customCode.name, current: true }
        ]}
      />

      {/* Main content with top spacing to account for sticky breadcrumb */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CustomCodeDetail customCode={customCode} />
      </div>
    </PageLayout>
  );
};

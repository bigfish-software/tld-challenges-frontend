import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useCustomCode } from '@/hooks/api';
import { PageLayout } from '@/components/layout/PageLayout';
import { LoadingSpinner } from '@/components/ui';
import { ErrorDisplay } from '@/components/ui/ErrorDisplay';
import { CustomCodeDetail } from './CustomCodeDetail';

export const CustomCodeDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // If no slug provided, redirect to custom codes page
  if (!slug) {
    return <Navigate to="/custom-codes" replace />;
  }

  const { 
    data: response, 
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

  if (error) {
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

  // Handle different possible response structures from the API
  let customCode: any;
  if (response && typeof response === 'object' && 'data' in response) {
    customCode = (response as any).data;
  } else if (response && typeof response === 'object' && 'id' in response) {
    customCode = response; // Direct CustomCode object
  } else {
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
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex mb-8 text-sm text-tertiary">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/custom-codes" className="hover:text-primary transition-colors">
            Custom Codes
          </Link>
          <span className="mx-2">/</span>
          <span className="text-primary">{customCode.name}</span>
        </nav>

        <CustomCodeDetail customCode={customCode} />
      </div>
    </PageLayout>
  );
};

import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useChallenge } from '@/hooks/api';
import { PageLayout } from '@/components/layout/PageLayout';
import { LoadingSpinner } from '@/components/ui';
import { ErrorDisplay } from '@/components/ui/ErrorDisplay';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ChallengeDetailPageContent } from './ChallengeDetailPageContent';

export const ChallengeDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // If no slug provided, redirect to challenges page
  if (!slug) {
    return <Navigate to="/challenges" replace />;
  }

  const { 
    data: response, 
    isLoading, 
    error 
  } = useChallenge(slug);
  
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
            title="Challenge Not Found"
            message="The challenge you're looking for doesn't exist or has been removed."
            onRetry={() => window.location.href = '/challenges'}
            retryText="Browse Challenges"
          />
        </div>
      </PageLayout>
    );
  }

  // Handle different possible response structures from the API
  let challenge: any;
  if (response && typeof response === 'object' && 'data' in response) {
    challenge = (response as any).data;
  } else if (response && typeof response === 'object' && 'id' in response) {
    challenge = response; // Direct Challenge object
  } else {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8">
          <ErrorDisplay
            title="Challenge Not Found"
            message="The challenge you're looking for doesn't exist or has been removed."
            onRetry={() => window.location.href = '/challenges'}
            retryText="Browse Challenges"
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
          { label: 'Challenges', href: '/challenges' },
          { label: challenge.name, current: true }
        ]}
      />

      {/* Page Content */}
      <ChallengeDetailPageContent challenge={challenge} />
    </PageLayout>
  );
};

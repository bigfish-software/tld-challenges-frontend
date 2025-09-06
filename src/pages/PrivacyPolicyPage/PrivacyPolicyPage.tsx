import { PageLayout } from '@/components/layout';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { PrivacyPolicyContent } from './PrivacyPolicyContent';

export const PrivacyPolicyPage = () => {
  return (
    <PageLayout>
      {/* Breadcrumb Navigation */}
      <Breadcrumb 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Privacy Policy', current: true }
        ]}
      />
      
      <PrivacyPolicyContent />
    </PageLayout>
  );
};

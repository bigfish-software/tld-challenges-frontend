import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PrivacyPolicyContent } from './PrivacyPolicyContent';

export const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <Header />
      <PrivacyPolicyContent />
      <Footer />
    </div>
  );
};

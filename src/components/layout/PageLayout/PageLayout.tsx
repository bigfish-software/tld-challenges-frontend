import { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  /**
   * Whether to include header and footer.
   * Set to false for content-only rendering (e.g., in Storybook theme comparisons)
   */
  includeHeaderFooter?: boolean;
}

export const PageLayout = ({ 
  children, 
  className = '',
  includeHeaderFooter = true 
}: PageLayoutProps) => {
  if (!includeHeaderFooter) {
    // Content-only mode for stories and flexible usage
    return (
      <div className={`bg-white dark:bg-slate-900 transition-colors ${className}`}>
        {children}
      </div>
    );
  }

  // Full page layout with header and footer
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors">
      <Header />
      <main className={`flex-1 ${className}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { NotFoundPage } from './NotFoundPage';

export const NotFoundPageLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors">
      <Header />
      <main className="flex-1">
        <NotFoundPage />
      </main>
      <Footer />
    </div>
  );
};

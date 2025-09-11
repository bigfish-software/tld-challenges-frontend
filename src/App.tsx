import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ScrollToTop } from '@/components/layout';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPageLayout } from '@/pages/NotFoundPage';
import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage';
import { CustomCodesPage } from '@/pages/CustomCodesPage';
import { CustomCodeDetailPage } from '@/pages/CustomCodeDetailPage';
import { ChallengesPage } from '@/pages/ChallengesPage';
import { ChallengeDetailPage } from '@/pages/ChallengeDetailPage';
import { TournamentsPage } from '@/pages/TournamentsPage';
import { TournamentDetailPage } from '@/pages/TournamentDetailPage';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error && 'status' in error && typeof error.status === 'number') {
          if (error.status >= 400 && error.status < 500) {
            return false;
          }
        }
        return failureCount < 3;
      },
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/custom-codes" element={<CustomCodesPage />} />
            <Route path="/custom-codes/:slug" element={<CustomCodeDetailPage />} />
            <Route path="/challenges" element={<ChallengesPage />} />
            <Route path="/challenges/:slug" element={<ChallengeDetailPage />} />
            <Route path="/tournaments" element={<TournamentsPage />} />
            <Route path="/tournaments/:slug" element={<TournamentDetailPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="*" element={<NotFoundPageLayout />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

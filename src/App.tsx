import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPageLayout } from '@/pages/NotFoundPage';
import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage';
import { CustomCodesPage } from '@/pages/CustomCodesPage';
import { ChallengesPage } from '@/pages/ChallengesPage';
import { TournamentsPage } from '@/pages/TournamentsPage';

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
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/custom-codes" element={<CustomCodesPage />} />
            <Route path="/challenges" element={<ChallengesPage />} />
            <Route path="/tournaments" element={<TournamentsPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="*" element={<NotFoundPageLayout />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

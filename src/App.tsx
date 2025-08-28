import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPageLayout } from '@/pages/NotFoundPage';
import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage';
import { CustomCodesPage } from '@/pages/CustomCodesPage';
import { ChallengesPage } from '@/pages/ChallengesPage';
import { TournamentsPage } from '@/pages/TournamentsPage';

function App() {
  return (
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
  );
}

export default App;

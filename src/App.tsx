import { ThemeProvider } from '@/contexts/ThemeContext';
import { NotFoundPageLayout } from '@/pages/NotFoundPage';

function App() {
  return (
    <ThemeProvider>
      <NotFoundPageLayout />
    </ThemeProvider>
  );
}

export default App;

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component that scrolls the window to the top when the route changes
 * Place this component inside the Router component in App.tsx
 */
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when the route changes
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Use smooth scrolling for better UX
    });
  }, [pathname]);

  return null; // This component doesn't render anything
};

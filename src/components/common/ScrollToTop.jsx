import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop:
 * Automatically resets scroll position to the very top (0, 0)
 * whenever the route changes anywhere across the entire website.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instant reset to very top of page
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });

    // Safety fallback for documentElement & body
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }
  }, [pathname]);

  return null;
}

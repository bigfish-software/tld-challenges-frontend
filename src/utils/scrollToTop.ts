/**
 * Utility function to scroll to the top of the page
 * @param behavior - scroll behavior: 'auto' | 'smooth'
 * @param delay - optional delay in milliseconds before scrolling
 * @param forceImmediate - force an immediate scroll to top first to prevent intermediate positions
 */
export const scrollToTop = (behavior: ScrollBehavior = 'smooth', delay = 0, forceImmediate = false) => {
  const performScroll = () => {
    // If forceImmediate is true, do an instant scroll first to eliminate any intermediate positions
    if (forceImmediate) {
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      });
    }
    
    // Then do the main scroll (which might be smooth)
    window.scrollTo({
      top: 0,
      behavior,
    });
  };

  if (delay > 0) {
    setTimeout(performScroll, delay);
  } else {
    performScroll();
  }
};

/**
 * Utility function to scroll to a specific element
 * @param elementId - the ID of the element to scroll to
 * @param behavior - scroll behavior: 'auto' | 'smooth'
 * @param offset - offset from the top of the element in pixels
 * @param delay - optional delay in milliseconds before scrolling
 */
export const scrollToElement = (
  elementId: string, 
  behavior: ScrollBehavior = 'smooth',
  offset = 0,
  delay = 0
) => {
  const performScroll = () => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior,
      });
    }
  };

  if (delay > 0) {
    setTimeout(performScroll, delay);
  } else {
    performScroll();
  }
};
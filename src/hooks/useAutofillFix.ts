import { useEffect, useRef } from 'react';

/**
 * Hook to fix Chrome autofill styling issues for input elements
 * This programmatically overrides browser autofill styles that CSS can't handle
 */
export function useInputAutofillFix() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const element = inputRef.current;
    if (!element) return;

    // Function to apply correct styling
    const applyCorrectStyling = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      
      // Force correct text color
      element.style.setProperty('color', isDark ? '#FFFFFF' : '#1F1F1F', 'important');
      element.style.setProperty('caret-color', isDark ? '#FFFFFF' : '#1F1F1F', 'important');
      element.style.setProperty('background-color', isDark ? '#1F1F1F' : '#FFFFFF', 'important');
    };

    // Apply styling immediately
    applyCorrectStyling();

    // Listen for autofill events
    const handleAutoFill = () => {
      // Delay to ensure autofill has applied
      setTimeout(applyCorrectStyling, 0);
      setTimeout(applyCorrectStyling, 100);
      setTimeout(applyCorrectStyling, 500);
    };

    // Listen for various autofill-related events
    element.addEventListener('input', handleAutoFill);
    element.addEventListener('change', handleAutoFill);
    element.addEventListener('focus', handleAutoFill);
    element.addEventListener('blur', applyCorrectStyling);

    // Use MutationObserver to catch Chrome's style changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          // Chrome changed the style, reapply ours
          setTimeout(applyCorrectStyling, 0);
        }
      });
    });

    observer.observe(element, {
      attributes: true,
      attributeFilter: ['style']
    });

    // Listen for theme changes
    const handleThemeChange = () => {
      setTimeout(applyCorrectStyling, 0);
    };

    const themeObserver = new MutationObserver(handleThemeChange);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => {
      element.removeEventListener('input', handleAutoFill);
      element.removeEventListener('change', handleAutoFill);
      element.removeEventListener('focus', handleAutoFill);
      element.removeEventListener('blur', applyCorrectStyling);
      observer.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  return inputRef;
}

/**
 * Hook to fix Chrome autofill styling issues for textarea elements
 * This programmatically overrides browser autofill styles that CSS can't handle
 */
export function useTextareaAutofillFix() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const element = textareaRef.current;
    if (!element) return;

    // Function to apply correct styling
    const applyCorrectStyling = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      
      // Force correct text color
      element.style.setProperty('color', isDark ? '#FFFFFF' : '#1F1F1F', 'important');
      element.style.setProperty('caret-color', isDark ? '#FFFFFF' : '#1F1F1F', 'important');
      element.style.setProperty('background-color', isDark ? '#1F1F1F' : '#FFFFFF', 'important');
    };

    // Apply styling immediately
    applyCorrectStyling();

    // Listen for autofill events
    const handleAutoFill = () => {
      // Delay to ensure autofill has applied
      setTimeout(applyCorrectStyling, 0);
      setTimeout(applyCorrectStyling, 100);
      setTimeout(applyCorrectStyling, 500);
    };

    // Listen for various autofill-related events
    element.addEventListener('input', handleAutoFill);
    element.addEventListener('change', handleAutoFill);
    element.addEventListener('focus', handleAutoFill);
    element.addEventListener('blur', applyCorrectStyling);

    // Use MutationObserver to catch Chrome's style changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          // Chrome changed the style, reapply ours
          setTimeout(applyCorrectStyling, 0);
        }
      });
    });

    observer.observe(element, {
      attributes: true,
      attributeFilter: ['style']
    });

    // Listen for theme changes
    const handleThemeChange = () => {
      setTimeout(applyCorrectStyling, 0);
    };

    const themeObserver = new MutationObserver(handleThemeChange);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => {
      element.removeEventListener('input', handleAutoFill);
      element.removeEventListener('change', handleAutoFill);
      element.removeEventListener('focus', handleAutoFill);
      element.removeEventListener('blur', applyCorrectStyling);
      observer.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  return textareaRef;
}

// Legacy export for backward compatibility
export const useAutofillFix = useInputAutofillFix;
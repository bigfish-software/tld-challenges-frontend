import { useRef, useEffect, useState, useCallback } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTheme } from '../../../contexts/ThemeContext';
import { FieldError } from '../ErrorDisplay/FieldError';

export interface SimpleCaptchaProps {
  onChange: (isValid: boolean) => void;
  error?: string | null;
  size?: 'normal' | 'compact';
}

// You'll need to replace this with your own site key in production
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

export const SimpleCaptcha = ({ 
  onChange, 
  error, 
  size = 'normal'
}: SimpleCaptchaProps) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { isDark } = useTheme();
  const [captchaKey, setCaptchaKey] = useState(Date.now());
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  
  // Only mount the captcha component when the form section is visible
  useEffect(() => {
    setMounted(true);
    
    // Clear any error handling timeout when component unmounts
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  // Handle reCAPTCHA expiration
  const handleExpired = useCallback(() => {
    if (mounted) {
      onChange(false);
      setCaptchaError('reCAPTCHA verification expired. Please verify again.');
    }
  }, [onChange, mounted]);
  
  // Handle reCAPTCHA error with graceful recovery
  const handleError = useCallback(() => {
    // Handle network errors gracefully - don't mark as invalid right away
    console.log("Captcha encountered an error, will retry");
    
    if (mounted) {
      onChange(false);
      setCaptchaError('reCAPTCHA encountered an error. Please try again.');
    }
    
    // Only retry a limited number of times or after user interaction
    if (recaptchaRef.current) {
      timeoutRef.current = setTimeout(() => {
        try {
          recaptchaRef.current?.reset();
          setCaptchaError(null);
        } catch (e) {
          console.log("Captcha reset failed after error");
        }
      }, 10000); // Longer delay for error recovery
    }
  }, [onChange, mounted]);
  
  // Handle successful reCAPTCHA load
  const handleLoad = useCallback(() => {
    setCaptchaError(null);
  }, []);
  
  // Force re-render of captcha when theme changes by updating the key
  useEffect(() => {
    // Generate a new key to force the component to remount
    setCaptchaKey(Date.now());
    
    // Reset if the ref exists (for when toggling quickly)
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
    
    // Clear errors when theme changes
    setCaptchaError(null);
  }, [isDark]);
  
  // Handle cleanup when component unmounts
  useEffect(() => {
    // Capture current refs for cleanup
    const currentTimeoutRef = timeoutRef.current;
    const currentRecaptchaRef = recaptchaRef.current;
    
    return () => {
      // Clear timeout
      if (currentTimeoutRef) {
        clearTimeout(currentTimeoutRef);
      }
      
      // Attempt to clean up any potential reCAPTCHA resources
      if (currentRecaptchaRef) {
        currentRecaptchaRef.reset();
      }
    };
  }, []);

  const handleCaptchaChange = (token: string | null) => {
    // Only call onChange if the captcha is actually mounted
    if (!mounted) return;
    
    // Clear any previous errors when verification succeeds
    if (token) {
      setCaptchaError(null);
    } else {
      // If token is null due to expiration, handle gracefully
      if (recaptchaRef.current) {
        // Add a delay before attempting to reset to avoid thrashing
        timeoutRef.current = setTimeout(() => {
          try {
            recaptchaRef.current?.reset();
          } catch (e) {
            console.log("Captcha reset failed, will try again later");
          }
        }, 5000); // 5 second delay before attempting reset
      }
    }
    
    onChange(!!token);
  };

  return (
    <div className="space-y-2 mb-4">
      <div className="flex flex-col">
        <label className="block text-sm font-medium text-primary mb-2 flex items-center">
          Human Verification
          <span className="ml-1 text-error">*</span>
        </label>
        <div className="flex justify-center">
          <div className={`captcha-container p-0.5 rounded-md ${isDark ? '' : 'bg-white'}`}>
            <ReCAPTCHA
              key={captchaKey}
              ref={recaptchaRef}
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={handleCaptchaChange}
              onExpired={handleExpired}
              onErrored={handleError}
              onLoad={handleLoad}
              theme={isDark ? 'dark' : 'light'}
              size={size === 'compact' ? 'compact' : 'normal'}
            />
          </div>
        </div>
      </div>
      {(error || captchaError) && <FieldError error={error || captchaError} />}
      {import.meta.env.DEV && !import.meta.env.VITE_RECAPTCHA_SITE_KEY && (
        <p className="text-xs text-tertiary italic">
          Using test reCAPTCHA key. Set VITE_RECAPTCHA_SITE_KEY in .env to remove the test banner.
        </p>
      )}
    </div>
  );
};
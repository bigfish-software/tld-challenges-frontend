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
  const { isDark } = useTheme();
  const [captchaKey, setCaptchaKey] = useState(Date.now());
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  
  // Handle reCAPTCHA expiration
  const handleExpired = useCallback(() => {
    onChange(false);
    setCaptchaError('reCAPTCHA verification expired. Please verify again.');
  }, [onChange]);
  
  // Handle reCAPTCHA error
  const handleError = useCallback(() => {
    onChange(false);
    setCaptchaError('reCAPTCHA encountered an error. Please try again.');
  }, [onChange]);
  
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
    return () => {
      // Attempt to clean up any potential reCAPTCHA resources
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    };
  }, []);

  const handleCaptchaChange = (token: string | null) => {
    // Clear any previous errors when verification succeeds
    if (token) {
      setCaptchaError(null);
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
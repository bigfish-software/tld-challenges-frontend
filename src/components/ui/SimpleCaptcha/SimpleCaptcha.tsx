import { useRef, useEffect, useState } from 'react';
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
  // Using a key to force remount when theme changes
  const [captchaKey, setCaptchaKey] = useState(Date.now());
  
  // Force re-render of captcha when theme changes by updating the key
  useEffect(() => {
    // Generate a new key to force the component to remount
    setCaptchaKey(Date.now());
    
    // Also reset if the ref exists (for when toggling quickly)
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  }, [isDark]);

  const handleCaptchaChange = (token: string | null) => {
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
              theme={isDark ? 'dark' : 'light'}
              size={size === 'compact' ? 'compact' : 'normal'}
            />
          </div>
        </div>
      </div>
      {error && <FieldError error={error} />}
      {import.meta.env.DEV && !import.meta.env.VITE_RECAPTCHA_SITE_KEY && (
        <p className="text-xs text-tertiary italic">
          Using test reCAPTCHA key. Set VITE_RECAPTCHA_SITE_KEY in .env to remove the test banner.
        </p>
      )}
    </div>
  );
};
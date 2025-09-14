import { useRef, useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTheme } from '../../../contexts/ThemeContext';
import { FieldError } from '../ErrorDisplay/FieldError';

export interface SimpleCaptchaProps {
  onChange: (isValid: boolean) => void;
  error?: string | null;
  size?: 'normal' | 'compact';
  theme?: 'light' | 'dark' | 'auto'; // auto will use the site's theme
}

// You'll need to replace this with your own site key in production
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

export const SimpleCaptcha = ({ 
  onChange, 
  error, 
  size = 'normal', 
  theme = 'auto' 
}: SimpleCaptchaProps) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { isDark } = useTheme();
  const [captchaTheme, setCaptchaTheme] = useState<'light' | 'dark'>(isDark ? 'dark' : 'light');
  
  // Update captcha theme when site theme changes if set to auto
  useEffect(() => {
    if (theme === 'auto') {
      setCaptchaTheme(isDark ? 'dark' : 'light');
    } else {
      setCaptchaTheme(theme === 'dark' ? 'dark' : 'light');
    }
  }, [isDark, theme]);

  // Reset the captcha when theme changes to ensure proper rendering
  useEffect(() => {
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  }, [captchaTheme]);

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
        <div className={`overflow-hidden rounded-md ${error ? 'ring-2 ring-error' : ''}`}>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={handleCaptchaChange}
            theme={captchaTheme}
            size={size === 'compact' ? 'compact' : 'normal'}
          />
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
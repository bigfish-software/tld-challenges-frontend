# SimpleCaptcha Component

This component implements Google's reCAPTCHA v2 for human verification in forms.

## Setup

1. Visit the [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Register a new site with the following settings:
   - Label: TLD Challenges (or your preferred name)
   - reCAPTCHA type: reCAPTCHA v2 (recommended)
   - Domains: Your domains (localhost for development)
   - Accept the Terms of Service

3. After registration, you'll receive:
   - Site Key: To be used in your frontend code
   - Secret Key: To be used in your backend for verification

## Environment Variables

Add the following to your `.env` files:

```
# Development (.env.development)
VITE_RECAPTCHA_SITE_KEY=your_site_key_here

# Production (.env.production)
VITE_RECAPTCHA_SITE_KEY=your_production_site_key_here
```

> **Note:** The component currently uses a test key provided by Google if no environment variable is set. This key is for development only and will show a warning banner in the reCAPTCHA widget.

## Removing the "Test" Banner

The warning banner "This reCAPTCHA is for testing purposes only" appears because you're using Google's test site key. To remove it:

1. Register your own site key as described in the Setup section
2. Create or update your `.env.local` file with:
   ```
   VITE_RECAPTCHA_SITE_KEY=your_actual_site_key_here
   ```
3. Restart your development server

For production, make sure the environment variable is properly set in your deployment environment.

## Usage

```tsx
import { SimpleCaptcha } from '../ui/SimpleCaptcha';

// In your form component
const [isCaptchaValid, setIsCaptchaValid] = useState(false);

const handleCaptchaChange = (isValid: boolean) => {
  setIsCaptchaValid(isValid);
};

// In your JSX
<SimpleCaptcha 
  onChange={handleCaptchaChange}
  error={errors.captcha || null}
/>
```

## Backend Verification

For complete security, the backend should verify the reCAPTCHA token. Send the token received by the frontend to your backend API and verify it using the Secret Key.

Example backend verification:

```javascript
// Example server code (Node.js)
const axios = require('axios');

async function verifyRecaptcha(token) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`
    );
    
    return response.data.success;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}
```

## Styling and Theming

The component integrates with your application's theme system and applies proper styling:

### Theme Options

```tsx
<SimpleCaptcha 
  onChange={handleCaptchaChange}
  error={errors.captcha || null}
  theme="auto" // Use 'light', 'dark', or 'auto' (default) to match site theme
  size="normal" // Use 'normal' (default) or 'compact'
/>
```

### Dark Mode Support

The component automatically adapts to your site's theme system when using `theme="auto"`. It will:
- Use dark theme captcha when your site is in dark mode
- Use light theme captcha when your site is in light mode
- Automatically switch when theme changes
- Apply proper border styles that match your design system

### Size Options

- **normal**: Standard size captcha (default)
- **compact**: Smaller, more compact version that takes less space

### Custom Styling

While Google's reCAPTCHA widget has limitations on styling, the component adds:
- Rounded corners to match your UI
- Error state visualization with error ring
- Proper spacing and margins
- Theme-aware text and label styling
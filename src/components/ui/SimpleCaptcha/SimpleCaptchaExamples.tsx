// This is an example component that demonstrates how to use the SimpleCaptcha component
// with different themes and sizes. This is for documentation purposes and not part of the main app.

import React, { useState } from 'react';
import { SimpleCaptcha } from './SimpleCaptcha';

export const SimpleCaptchaExamples: React.FC = () => {
  const [standardValid, setStandardValid] = useState(false);
  const [compactValid, setCompactValid] = useState(false);
  const [darkValid, setDarkValid] = useState(false);
  const [lightValid, setLightValid] = useState(false);

  return (
    <div className="space-y-8 p-6">
      <h2 className="text-xl font-bold text-primary">SimpleCaptcha Examples</h2>
      
      {/* Standard Theme-Aware Captcha */}
      <div className="p-4 border rounded-md border-default">
        <h3 className="text-lg font-medium mb-4 text-primary">Standard Size (Theme-Aware)</h3>
        <SimpleCaptcha 
          onChange={setStandardValid}
          theme="auto"
          size="normal"
        />
        <p className="mt-2">
          Verification status: <span className={standardValid ? "text-success" : "text-error"}>
            {standardValid ? "Verified ✓" : "Not verified ✗"}
          </span>
        </p>
      </div>
      
      {/* Compact Theme-Aware Captcha */}
      <div className="p-4 border rounded-md border-default">
        <h3 className="text-lg font-medium mb-4 text-primary">Compact Size (Theme-Aware)</h3>
        <SimpleCaptcha 
          onChange={setCompactValid}
          theme="auto"
          size="compact"
        />
        <p className="mt-2">
          Verification status: <span className={compactValid ? "text-success" : "text-error"}>
            {compactValid ? "Verified ✓" : "Not verified ✗"}
          </span>
        </p>
      </div>
      
      {/* Light Theme Captcha */}
      <div className="p-4 border rounded-md border-default">
        <h3 className="text-lg font-medium mb-4 text-primary">Light Theme (Fixed)</h3>
        <SimpleCaptcha 
          onChange={setLightValid}
          theme="light"
          error={!lightValid ? "This is how an error would look" : null}
        />
        <p className="mt-2">
          Verification status: <span className={lightValid ? "text-success" : "text-error"}>
            {lightValid ? "Verified ✓" : "Not verified ✗"}
          </span>
        </p>
      </div>
      
      {/* Dark Theme Captcha */}
      <div className="p-4 border rounded-md border-default bg-gray-800">
        <h3 className="text-lg font-medium mb-4 text-white">Dark Theme (Fixed)</h3>
        <SimpleCaptcha 
          onChange={setDarkValid}
          theme="dark"
        />
        <p className="mt-2 text-white">
          Verification status: <span className={darkValid ? "text-green-400" : "text-red-400"}>
            {darkValid ? "Verified ✓" : "Not verified ✗"}
          </span>
        </p>
      </div>
    </div>
  );
};
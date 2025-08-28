import React, { useEffect, useState } from 'react';
import { apiClient } from '@/services/api';

export const ApiDebugger: React.FC = () => {
  const [debugInfo, setDebugInfo] = useState<any>({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    hasToken: !!import.meta.env.VITE_API_TOKEN,
    tokenLength: import.meta.env.VITE_API_TOKEN?.length || 0,
    environment: import.meta.env.VITE_APP_ENV,
    testResults: {}
  });

  useEffect(() => {
    const runTests = async () => {
      const results: any = {};
      
      try {
        console.log('Starting API tests...');
        
        // Test 1: Basic connectivity
        try {
          const basicResponse = await fetch('http://localhost:1337');
          results.basicConnectivity = {
            status: basicResponse.status,
            ok: basicResponse.ok,
            statusText: basicResponse.statusText
          };
        } catch (err: any) {
          results.basicConnectivity = { error: err.message };
        }

        // Test 2: API root endpoint
        try {
          const apiRootResponse = await fetch('http://localhost:1337/api');
          results.apiRoot = {
            status: apiRootResponse.status,
            ok: apiRootResponse.ok,
            statusText: apiRootResponse.statusText
          };
        } catch (err: any) {
          results.apiRoot = { error: err.message };
        }

        // Test 3: Custom codes with token
        try {
          console.log('Testing custom codes API...');
          const customCodesResponse = await apiClient.get('/custom-codes', {
            params: {
              populate: 'creators',
              'filters[publishedAt][$notNull]': true,
              sort: 'createdAt:desc'
            }
          });
          console.log('Custom codes response:', customCodesResponse);
          results.customCodes = { success: true, data: customCodesResponse };
        } catch (err: any) {
          console.error('Custom codes error:', err);
          results.customCodes = { error: err.message, details: err };
        }

        setDebugInfo((prev: any) => ({ ...prev, testResults: results }));
      } catch (err) {
        console.error('Debug tests failed:', err);
      }
    };

    runTests();
  }, []);

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h3 className="text-lg font-bold mb-4">API Debug Information</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold">Environment Variables:</h4>
          <pre className="bg-gray-50 dark:bg-gray-700 p-2 rounded text-sm overflow-auto">
            {JSON.stringify({
              baseUrl: debugInfo.baseUrl,
              hasToken: debugInfo.hasToken,
              tokenLength: debugInfo.tokenLength,
              environment: debugInfo.environment
            }, null, 2)}
          </pre>
        </div>

        <div>
          <h4 className="font-semibold">API Test Results:</h4>
          <pre className="bg-gray-50 dark:bg-gray-700 p-2 rounded text-sm overflow-auto max-h-96">
            {JSON.stringify(debugInfo.testResults, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

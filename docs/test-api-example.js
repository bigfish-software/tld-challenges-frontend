// Quick API test script
// Copy this file to test-api.js and replace with your actual API token
import axios from 'axios';

const API_BASE_URL = 'http://localhost:1337/api';
const API_TOKEN = 'your-jwt-token-here'; // Replace with actual token from your .env.local

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_TOKEN}`,
  },
});

async function testAPI() {
  try {
    console.log('Testing API connection...');
    console.log('Base URL:', API_BASE_URL);
    
    // Test basic connection
    const healthResponse = await apiClient.get('/');
    console.log('✅ API is responding');
    
    // Test custom codes endpoint
    const customCodesResponse = await apiClient.get('/custom-codes', {
      params: {
        populate: 'creators',
        'filters[publishedAt][$notNull]': true,
        sort: 'createdAt:desc'
      }
    });
    
    console.log('✅ Custom codes endpoint working');
    console.log('Data received:', customCodesResponse.data);
    
  } catch (error) {
    console.error('❌ API Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

testAPI();

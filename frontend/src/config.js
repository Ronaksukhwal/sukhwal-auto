// Sukhwal Auto Services API configuration
// Automatically detects environment (local vs production)
export const API_URL = import.meta.env.VITE_API_URL || 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8000'
    : 'https://sukhwal-auto-backend.onrender.com');

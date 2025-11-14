// Global setup that runs before all tests
import axios from 'axios';
import { TEST_CONFIG } from './test-env';

// Set default timeout
jest.setTimeout(TEST_CONFIG.timeout * 3); // 30 seconds default

// Configure axios defaults for tests
axios.defaults.validateStatus = () => true; // Don't throw on any status
axios.defaults.timeout = TEST_CONFIG.timeout;

// Suppress console logs in tests (uncomment if needed)
// global.console = {
//   ...console,
//   log: jest.fn(),
//   debug: jest.fn(),
//   info: jest.fn(),
// };

// Global error handler for unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});


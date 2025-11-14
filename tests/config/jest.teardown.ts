// Global teardown that runs after all tests
export default async () => {
  // Cleanup: close database connections, clear test data, etc.
  console.log('Tests completed. Cleaning up...');
  
  // Add any cleanup logic here
  // e.g., close database connections, clear test data
};


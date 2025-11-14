# Nepthic API Automation

A comprehensive TypeScript-based API automation testing suite for the Nepthic e-commerce platform. This project provides end-to-end integration tests for authentication, products, cart, and checkout workflows.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Test Coverage](#test-coverage)
- [API Endpoints](#api-endpoints)
- [Best Practices](#best-practices)
- [Contributing](#contributing)

## 🎯 Overview

Nepthic API Automation is an integration testing framework built with TypeScript and Jest. It automates testing of critical user flows including:

- User authentication (sign up, sign in, password reset)
- Product browsing and filtering
- Shopping cart management
- Checkout and order processing
- User profile and address management

## ✨ Features

- **TypeScript Support**: Fully typed for better code quality and IDE support
- **Jest Testing**: Modern testing framework with built-in coverage reporting
- **Axios Integration**: Easy HTTP client for API requests
- **Modular Architecture**: Organized helpers, services, and fixtures
- **Path Aliases**: Clean imports with `@endpoints`, `@tests`, and `@` prefixes
- **Comprehensive Fixtures**: Reusable test data for authentication and products
- **Coverage Reports**: Detailed coverage analysis in HTML format

## 📦 Prerequisites

- Node.js 16+ or higher
- npm or yarn package manager

## 🚀 Installation

1. Clone the repository:

```bash
git clone https://github.com/PrajalVaidya/nepthic-api-automation.git
cd nepthic-api-automation
```

2. Install dependencies:

```bash
npm install
```

## 📁 Project Structure

```
nepthic-api-automation/
├── endpoints/
│   └── endpoints.ts              # API endpoint definitions
├── tests/
│   ├── auth/                     # Authentication test files
│   ├── base/                     # Base test utilities
│   ├── config/
│   │   ├── jest.setup.ts         # Jest configuration
│   │   ├── jest.teardown.ts      # Jest teardown
│   │   └── test-constants.ts     # Test constants
│   ├── fixtures/
│   │   ├── auth.fixtures.ts      # Auth test data
│   │   └── product.fixtures.ts   # Product test data
│   ├── helpers/
│   │   ├── api.helpers.ts        # API client utilities
│   │   ├── assertion.helpers.ts  # Custom assertions
│   │   └── auth.helpers.ts       # Authentication helpers
│   ├── integration/
│   │   ├── auth/
│   │   │   ├── signIn.test.ts
│   │   │   └── signUp.test.ts
│   │   ├── cart/
│   │   └── products/
│   │       └── products.test.ts
│   ├── service/
│   │   ├── auth.service.ts       # Auth API service
│   │   └── product.service.ts    # Product API service
│   └── utils/
│       ├── authUtility.ts        # Auth utilities
│       └── randomNumberUtility.ts # Helper utilities
├── coverage/                     # Test coverage reports
├── babel.config.ts              # Babel configuration
├── jest.config.ts               # Jest configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Project dependencies
└── README.md                    # This file
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# API Configuration
API_BASE_URL=http://dev.nepthic.com/api

# Test Credentials
TEST_USER_EMAIL=test@example.com
TEST_USER_PASSWORD=password123
TEST_INVALID_EMAIL=invalid@example.com
TEST_INVALID_PASSWORD=wrongpassword
```

### TypeScript Configuration

The project uses `tsconfig.json` with path aliases for cleaner imports:

- `@endpoints/*` → `endpoints/*`
- `@tests/*` → `tests/*`
- `@/*` → `src/*`

### Jest Configuration

Jest is configured to:

- Use `ts-jest` for TypeScript compilation
- Collect coverage reports
- Transform TypeScript files during testing
- Run tests from the `tests/` directory

## 🧪 Running Tests

### Run all tests:

```bash
npm test
```

### Run tests in watch mode:

```bash
npm test -- --watch
```

### Run specific test suite:

```bash
npm test -- tests/integration/auth/signIn.test.ts
```

### Run tests with coverage:

```bash
npm test -- --coverage
```

### View coverage report:

Open `coverage/lcov-report/index.html` in your browser

## 📊 Test Coverage

The project maintains coverage reports in the `coverage/` directory. Coverage includes:

- Line coverage
- Branch coverage
- Function coverage
- Statement coverage

Generate coverage reports with:

```bash
npm test -- --coverage
```

## 🔗 API Endpoints

### Authentication

- `GET /auth/csrf` - Get CSRF token
- `POST /auth/callback/credentials` - Sign in with credentials
- `POST /sign-up` - Create new user account
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password
- `GET /auth/validate-reset-token` - Validate reset token

### Products

- `GET /products` - List all products
- `GET /products/:id` - Get product details
- `GET /products/availability` - Check product availability

### Cart

- `GET /cart` - Get cart contents
- `POST /cart` - Add item to cart
- `PUT /cart/:id` - Update cart item
- `DELETE /cart/:id` - Remove cart item

### Checkout

- `POST /checkout` - Process checkout
- `GET /orders` - List user orders

### Profile

- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `GET /addresses` - List user addresses

See `endpoints/endpoints.ts` for complete endpoint definitions.

## 🎓 Best Practices

### Writing Tests

1. **Use Fixtures**: Leverage pre-defined test data in `tests/fixtures/`
2. **Helper Functions**: Utilize helpers from `tests/helpers/` for common operations
3. **Clear Test Names**: Use descriptive test names that explain the scenario
4. **Single Responsibility**: Each test should test one specific behavior
5. **Async/Await**: Use async/await for cleaner asynchronous code

### Code Quality

- Follow TypeScript strict mode
- Use path aliases for imports
- Keep tests isolated and independent
- Clean up resources in afterEach hooks
- Mock external dependencies when appropriate

### API Testing

- Validate response status codes
- Check response data structure
- Verify side effects (cookies, tokens, etc.)
- Test both success and failure scenarios
- Use realistic test data

## 👥 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit your changes: `git commit -am 'Add new feature'`
3. Push to the branch: `git push origin feature/your-feature`
4. Submit a pull request

## 📝 License

ISC

## 📧 Support

For issues or questions, please contact the development team or open an issue in the repository.

// endpoints/auth/endpoints.ts
export const NEXT_PUBLIC_BASE_URL = "http://dev.nepthic.com/api";

// Base URLs
export const AUTH_BASE_URL = `${NEXT_PUBLIC_BASE_URL}/auth`;
export const PRODUCTS_BASE_URL = `${NEXT_PUBLIC_BASE_URL}/products`;
export const ADMIN_BASE_URL = `${NEXT_PUBLIC_BASE_URL}/admin`;
export const ORDERS_BASE_URL = `${NEXT_PUBLIC_BASE_URL}/orders`;
export const CART_BASE_URL = `${NEXT_PUBLIC_BASE_URL}/cart`;
export const PROFILE_BASE_URL = `${NEXT_PUBLIC_BASE_URL}/profile`;
export const ADDRESSES_BASE_URL = `${NEXT_PUBLIC_BASE_URL}/addresses`;
export const PAYPAL_BASE_URL = `${NEXT_PUBLIC_BASE_URL}/paypal`;
export const CHECKOUT_BASE_URL = `${NEXT_PUBLIC_BASE_URL}/checkout`;

// Authentication & NextAuth
export const AUTH_CSRF_URL = `${AUTH_BASE_URL}/csrf`;
export const AUTH_CREDENTIALS_CALLBACK_URL = `${AUTH_BASE_URL}/callback/credentials`;
export const AUTH_SIGN_UP_URL = `${NEXT_PUBLIC_BASE_URL}/sign-up`;
export const AUTH_FORGOT_PASSWORD_URL = `${AUTH_BASE_URL}/forgot-password`;
export const AUTH_RESET_PASSWORD_URL = `${AUTH_BASE_URL}/reset-password`;
export const AUTH_VALIDATE_RESET_TOKEN_URL = `${AUTH_BASE_URL}/validate-reset-token`;
export const AUTH_VALIDATE_VERIFY_CODE_URL = `${AUTH_BASE_URL}/validate-verify-code`;
export const VERIFY_CODE_URL = `${NEXT_PUBLIC_BASE_URL}/verify-code`;
export const CHECK_USERNAME_UNIQUE_URL = `${NEXT_PUBLIC_BASE_URL}/check-username-unique`;

// Products
export const PRODUCTS_URL = `${PRODUCTS_BASE_URL}`;
export const PRODUCT_BY_ID_URL = (id: string | number) =>
  `${PRODUCTS_BASE_URL}/${id}`;
export const PRODUCT_AVAILABILITY_URL = `${PRODUCTS_BASE_URL}/availability`;

// Cart
export const CART_URL = `${CART_BASE_URL}`;
export const CART_SYNC_URL = `${CART_BASE_URL}/sync`;
export const CART_VALIDATE_URL = `${CART_BASE_URL}/validate`;

// Addresses
export const ADDRESSES_URL = `${ADDRESSES_BASE_URL}`;
export const ADDRESS_BY_ID_URL = (id: string | number) =>
  `${ADDRESSES_BASE_URL}/${id}`;

// Profile
export const PROFILE_URL = `${PROFILE_BASE_URL}`;

// Orders
export const ORDERS_URL = `${ORDERS_BASE_URL}`;
export const ORDER_BY_ID_URL = (id: string | number) =>
  `${ORDERS_BASE_URL}/${id}`;
export const ORDER_SESSION_URL = (sessionId: string) =>
  `${ORDERS_BASE_URL}/session/${sessionId}`;
export const ORDER_TRACK_URL = `${ORDERS_BASE_URL}/track`;
export const ORDER_CONFIRM_PAYMENT_URL = (id: string | number) =>
  `${ORDERS_BASE_URL}/${id}/confirm-payment`;
export const ORDER_CANCEL_URL = (id: string | number) =>
  `${ORDERS_BASE_URL}/${id}/cancel`;

// Checkout
export const CHECKOUT_URL = `${CHECKOUT_BASE_URL}`;
export const CHECKOUT_WEBHOOK_URL = `${CHECKOUT_BASE_URL}/webhook`;

// Payments
export const PAYMENT_VERIFY_SESSION_URL = (sessionId: string) =>
  `${NEXT_PUBLIC_BASE_URL}/payments/verify-session/${sessionId}`;

// PayPal
export const PAYPAL_CREATE_ORDER_URL = `${PAYPAL_BASE_URL}/create-order`;
export const PAYPAL_CAPTURE_ORDER_URL = `${PAYPAL_BASE_URL}/capture-order`;
export const PAYPAL_VERIFY_PAYMENT_URL = `${PAYPAL_BASE_URL}/verify-payment`;
export const PAYPAL_WEBHOOK_URL = `${PAYPAL_BASE_URL}/webhook`;

// Promo Codes
export const PROMO_CODES_VALIDATE_URL = `${NEXT_PUBLIC_BASE_URL}/promo-codes/validate`;

// Settings & Files
export const SETTINGS_URL = `${NEXT_PUBLIC_BASE_URL}/settings`;
export const FILES_URL = (path: string[]) =>
  `${NEXT_PUBLIC_BASE_URL}/files/${path.join("/")}`;
export const UPLOAD_URL = `${NEXT_PUBLIC_BASE_URL}/upload`;

// Newsletter
export const NEWSLETTER_URL = `${NEXT_PUBLIC_BASE_URL}/newsletter`;

// Admin - Orders
export const ADMIN_ORDERS_URL = `${ADMIN_BASE_URL}/orders`;
export const ADMIN_ORDER_BY_ID_URL = (id: string | number) =>
  `${ADMIN_BASE_URL}/orders/${id}`;
export const ADMIN_ORDERS_STATS_URL = `${ADMIN_BASE_URL}/orders/stats`;

// Admin - Products
export const ADMIN_PRODUCT_VARIANTS_URL = (productId: string | number) =>
  `${ADMIN_BASE_URL}/products/${productId}/variants`;
export const ADMIN_PRODUCT_VARIANT_BY_ID_URL = (
  productId: string | number,
  variantId: string | number
) => `${ADMIN_BASE_URL}/products/${productId}/variants/${variantId}`;

// Admin - Users
export const ADMIN_USERS_URL = `${ADMIN_BASE_URL}/users`;
export const ADMIN_USER_BY_ID_URL = (id: string | number) =>
  `${ADMIN_BASE_URL}/users/${id}`;

// Admin - Promo Codes
export const ADMIN_PROMO_CODES_URL = `${ADMIN_BASE_URL}/promo-codes`;
export const ADMIN_PROMO_CODE_BY_ID_URL = (id: string | number) =>
  `${ADMIN_BASE_URL}/promo-codes/${id}`;

// Admin - Settings
export const ADMIN_SETTINGS_URL = `${ADMIN_BASE_URL}/settings`;

// Admin - Analytics
export const ADMIN_PAYMENT_STATS_URL = `${ADMIN_BASE_URL}/payment-stats`;
export const ADMIN_CARTS_URL = `${ADMIN_BASE_URL}/carts`;

// Legacy exports (for backward compatibility)
export const SIGN_UP_URL = AUTH_SIGN_UP_URL;

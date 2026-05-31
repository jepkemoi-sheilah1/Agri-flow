export const Endpoints = {

  auth: {
    register:          '/api/auth/register',
    login:             '/api/auth/login',
    logout:            '/api/auth/logout',
    refresh:           '/api/auth/refresh',
    verifyOtp:         '/api/auth/verify-otp',
    resendOtp:         '/api/auth/resend-otp',
    me:                '/api/users/me',
    businessRegister:  '/api/businesses/register',
  },

  product: {
    create:            '/api/products',
    categories:        '/api/categories',
    pendingBusinesses: '/api/businesses/pending',
    uploadImage:       (productId: string) => `/api/products/${productId}/images`,
    feed:              '/api/products/feed',
    myProducts:        '/api/products/my',
    filterByCategory:  '/api/products/filter',
    search:            '/api/products/search',
  }

};
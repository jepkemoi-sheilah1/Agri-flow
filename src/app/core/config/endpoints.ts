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

  business: {
    approveBusinesses: (id: string) => `/api/businesses/${id}/approve`,
    rejectBusiness:    (id: string) => `/api/businesses/${id}/reject`,
    myBusiness:        '/api/businesses/me',
    publicProfile:     (id: string) => `/api/businesses/${id}/public`,
    pending:           '/api/businesses/pending',
  },

  product: {
    create:            '/api/products',
    categories:        '/api/categories',
    uploadImage:       (productId: string) => `/api/products/${productId}/images`,
    feed:              '/api/products/feed',
    myProducts:        '/api/products/my',
    filterByCategory:  '/api/products/filter',
    search:            '/api/products/search',
  },

  cart: {
    add:               '/api/cart/add',
    get:               '/api/cart',
    removeItem:        (itemId: string) => `/api/cart/items/${itemId}`,
    clear:             '/api/cart/clear',
  },

  order: {
    checkout:          '/api/orders/checkout',
    updateStatus:      (id: string) => `/api/orders/${id}/status`,
    getById:           (id: string) => `/api/orders/${id}`,
    myOrders:          '/api/orders/my-orders',
    businessOrders:    (businessId: string) => `/api/orders/business/${businessId}`,
  },

  payment: {
    stkPush:           '/api/payments/stk-push',
    myPayments:        '/api/payments/my-payments',
    getByOrder:        (orderId: string) => `/api/payments/order/${orderId}`,
  },

};

export const Endpoints = {

  auth: {
    register:         '/api/auth/register',
    login:            '/api/auth/login',
    logout:           '/api/auth/logout',
    refresh:          '/api/auth/refresh',
    resetPassword:    '/api/auth/reset-password',
    me:               '/api/users/me',
    businessRegister: '/api/businesses/register',
    
  },

  notification: {
    sendOtp:            '/api/notifications/otp/send',
    verifyOtp:          '/api/notifications/otp/verify',
    validateResetToken: '/api/notifications/otp/validate-reset-token',
    myNotifications:    '/api/notifications/my-notifications',
    registerDevice:     '/api/notifications/device-token',
    removeDevice:       '/api/notifications/device-token',
  },

  user: {
    me:             '/api/users/me',
    getById:        (id: string) => `/api/users/${id}`,
    updateProfile:  (id: string) => `/api/users/${id}/profile`,
    changePassword: '/api/users/change-password',
    uploadImage:    '/api/users/upload-image',
  },

  business: {
    approveBusiness: (id: string) => `/api/businesses/${id}/approve`,
    rejectBusiness:  (id: string) => `/api/businesses/${id}/reject`,
    myBusiness:      '/api/businesses/me',
    publicProfile:   (id: string) => `/api/businesses/${id}/public`,
    pending:         '/api/businesses/pending',
    verified:        '/api/businesses/verified',
    submitRating:          '/api/businesses/ratings',
    ratingsByBusiness:     (id: string) => `/api/businesses/ratings/business/${id}`,
    ratingSummary:         (id: string) => `/api/businesses/ratings/business/${id}/summary`,
    deleteRating:          (id: string) => `/api/businesses/ratings/business/${id}`,
  },

  category: {
    getAll:  '/api/categories',
    getById: (id: string) => `/api/categories/${id}`,
  },

  product: {
    create:         '/api/products',
    getById:        (id: string) => `/api/products/${id}`,
    update:         (id: string) => `/api/products/${id}`,
    delete:         (id: string) => `/api/products/${id}`,
    markOutOfStock: (id: string) => `/api/products/${id}/out-of-stock`,
    active:         '/api/products/active-products',
    feed:           '/api/products/feed',
    myProducts:     '/api/products/my-products',
    byCategory:     (categoryId: string) => `/api/products/category/${categoryId}`,
    byBusiness:     (businessId: string) => `/api/products/business/${businessId}`,
    search:         '/api/products/search',
    uploadImage:    '/api/products/upload-image',
    addImage:       (id: string) => `/api/products/${id}/images`,
    submitRating:       '/api/products/ratings',
    ratingsByProduct:   (id: string) => `/api/products/ratings/product/${id}`,
    ratingSummary:      (id: string) => `/api/products/ratings/product/${id}/summary`,
    deleteRating:       (id: string) => `/api/products/ratings/product/${id}`,
  },

  cart: {
    add:            '/api/cart/add',
    get:            '/api/cart',
    updateQuantity: (cartItemId: string) => `/api/cart/items/deduct/${cartItemId}`,
    removeItem:     (itemId: string) => `/api/cart/items/${itemId}`,
    clear:          '/api/cart/clear',
  },

  order: {
    checkout:                '/api/orders/checkout',
    getById:                 (id: string) => `/api/orders/${id}`,
    myOrders:                '/api/orders/my-orders',
    restore:                 '/api/orders/restore',
    sellerOrders:            '/api/orders/seller/my-orders',
    sellerOrderDetail:       (orderId: string) => `/api/orders/seller/${orderId}`,
    updateFulfillmentStatus: (orderId: string) => `/api/orders/seller/${orderId}/status`,
  },

  payment: {
    stkPush:    '/api/payments/stk-push',
    myPayments: '/api/payments/my-payments',
    getByOrder: (orderId: string) => `/api/payments/order/${orderId}`,
    getStatus:  (checkoutRequestId: string) => `/api/payments/status/${checkoutRequestId}`,
  },

  wallet: {
    get:          '/api/wallet',
    create:       '/api/wallet',
    transactions: '/api/wallet/transactions',
    payouts:      '/api/wallet/payouts',
    withdraw:     '/api/wallet/withdraw',
  },

};
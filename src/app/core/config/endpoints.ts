export const Endpoints = {

  auth: {
    register:         '/api/auth/register',
    login:            '/api/auth/login',
    logout:           '/api/auth/logout',
    refresh:          '/api/auth/refresh',
    verifyOtp:        '/api/auth/verify-otp',
    resendOtp:        '/api/auth/resend-otp',
    me:               '/api/users/me',
    businessRegister: '/api/businesses/register',
  },

  business: {
    approveBusinesses: (id: string) => `/api/businesses/${id}/approve`,
    rejectBusiness:    (id: string) => `/api/businesses/${id}/reject`,
    myBusiness:        '/api/businesses/me',
    publicProfile:     (id: string) => `/api/businesses/${id}/public`,
    pending:           '/api/businesses/pending',
    verified:          '/api/businesses/verified',
  },

  product: {
    create:         '/api/products',
    getById:        (id: string) => `/api/products/${id}`,
    update:         (id: string) => `/api/products/${id}`,
    delete:         (id: string) => `/api/products/${id}`,
    markOutOfStock: (id: string) => `/api/products/${id}/out-of-stock`,
    categories:     '/api/categories',
    uploadImage:    (productId: string) => `/api/products/${productId}/images`,
    feed:           '/api/products/feed',
    myProducts:     '/api/products/my-products',
    byCategory:     (categoryId: string) => `/api/products/category/${categoryId}`,
    byBusiness:     (businessId: string) => `/api/products/business/${businessId}`,
    search:         '/api/products/search',
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
    sellerOrders:            '/api/orders/seller/my-orders',
    sellerOrderDetail:       (orderId: string) => `/api/orders/seller/${orderId}`,
    updateFulfillmentStatus: (orderId: string) => `/api/orders/seller/${orderId}/status`,
    restore:                 '/api/orders/restore',
  },

  payment: {
    stkPush:    '/api/payments/stk-push',
    myPayments: '/api/payments/my-payments',
    getByOrder: (orderId: string) => `/api/payments/order/${orderId}`,
    getStatus:  (checkoutRequestId: string) => `/api/payments/status/${checkoutRequestId}`,
  },

};
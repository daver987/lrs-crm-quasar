import { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '../stores/useAuth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/dashboard',
        name: 'My Office',
        component: () => import('@/pages/DDashboard.vue'),
      },
      {
        path: '/accounts',
        name: 'Accounts',

        component: () => import('@/pages/DAccounts.vue'),
      },
      {
        path: '/quotes',
        name: 'Quotes',
        component: () => import('@/pages/DQuotes.vue'),
      },
      {
        path: '/reservations',
        name: 'Reservations',
        component: () => import('@/pages/DReservations.vue'),
      },
      {
        path: '/dispatch',
        name: 'Dispatch',
        component: () => import('@/pages/DDispatch.vue'),
      },
      {
        path: '/invoicing',
        name: 'Invoicing',
        component: () => import('@/pages/DInvoicing.vue'),
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('@/pages/DProfile.vue'),
      },
      {
        path: '/quick-quote',
        name: 'Quick Quote',
        component: () => import('@/pages/DQuickQuote.vue'),
      },
      {
        path: '/bookings',
        name: 'Bookings',

        component: () => import('@/pages/DBookings.vue'),
      },
    ],
  },
  {
    path: '/signin',
    component: () => import('@/layouts/AuthLayout.vue'),
    meta: {
      requiresNoAuth: true,
    },
    children: [
      {
        path: '/signin',
        name: 'signIn',
        component: () => import('@/pages/auth/SignIn.vue'),
      },
      {
        path: '/signup',
        name: 'signUp',
        component: () => import('@/pages/auth/SignUp.vue'),
      },
      {
        path: '/forgotpassword',
        name: 'forgotPassword',
        component: () => import('@/pages/auth/ForgotPassword.vue'),
      },
    ],
  },
  {
    path: '/resetpassword',
    component: () => import('@/layouts/AuthLayout.vue'),
    children: [
      {
        path: '/resetpassword',
        name: 'resetPassword',
        component: () => import('@/pages/auth/ResetPassword.vue'),
        beforeEnter: (to) => {
          // only allow navigation to reset password
          // if we actually clicked a proper reset password link
          // which provides the type=recovery hash key
          if (!to.hash.includes('type=recovery')) {
            const { supabase } = useAuthStore()
            if (supabase.auth.user()) return '/'
            return '/signin'
          }
        },
      },
      {
        path: '/callback',
        name: 'callback',
        component: () => import('@/pages/auth/AuthCallback.vue'),
        beforeEnter: (to) => {
          /* Parse the route hash into a dictionary */
          const hashDictionary = {}
          // first remove the actual '#' character
          const hash = to.hash.replace('#', '')
          // split hash into key-value pairs
          hash.split('&').forEach((item) => {
            // split 'key=value' into [key, value]
            const [key, value] = item.split('=')
            // add to results
            hashDictionary[key] = value
          })

          if (
            [
              'access_token',
              'expires_in',
              'provider_token',
              'refresh_token',
              'token_type',
            ].some((key) => !(key in hashDictionary))
          )
            return '/'
        },
      },
      {
        path: '/:catchAll(.*)*',
        component: () => import('pages/Error404.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
]

export default routes

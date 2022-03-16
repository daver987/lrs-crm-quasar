import { route } from 'quasar/wrappers'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import { useAuthStore } from '../stores/useAuth'
import { pinia } from '../stores/usePiniaStore'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  Router.beforeEach((to) => {
    const { supabase } = useAuthStore()

    if (to.meta.requiresAuth && !supabase.auth.user()) {
      return {
        path: '/signin',
      }
    }
    if (to.meta.requiresNoAuth && supabase.auth.user()) {
      return {
        path: '/',
      }
    }
  })

  const { supabase } = useAuthStore(pinia)
  supabase.auth.onAuthStateChange((event) => {
    console.log(event)
    if (event === 'SIGNED_OUT') return Router.push('/signin')
    if (event === 'SIGNED_IN') {
      const routeName = Router.currentRoute.value.name
      console.log('routeName', routeName)

      if (routeName === 'callback') {
        setTimeout(() => {
          return Router.push({ name: 'Dashboard' })
        }, 0)
      }
    }
  })

  return Router
})

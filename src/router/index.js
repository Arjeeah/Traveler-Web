/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import { useUserStore } from '../stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  // If user state is not loaded, try to fetch it
  if (!userStore.currentUser && !userStore.isLoggedIn) {
    await userStore.fetchCurrentUser()
  }

  const initialRedirectDone = sessionStorage.getItem('initialRedirectDone')

  if (userStore.isLoggedIn && to.path === '/' && !initialRedirectDone) {
    sessionStorage.setItem('initialRedirectDone', 'true')
    next('') // Redirect only on the first load of the session
  } else {
    next() // Proceed as normal
  }
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router

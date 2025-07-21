import { useUserStore } from '@/stores/userStore'

export default async function auth({ next, router }) {
  const userStore = useUserStore()
  // Only check if not already logged in
  await userStore.fetchCurrentUser()
  console.log("Auth middleware check: isLoggedIn:", userStore.isLoggedIn)
  if (!userStore.isLoggedIn) {
    // Not logged in, redirect to login and STOP navigation
    console.log('User not logged in, redirecting to login...')
    router.replace({ path: '/login' })
    return // Do not call next()
  }
  // User is logged in, continue
  return next()
}

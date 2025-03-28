export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  if (!authStore?.user?.id) {
    try {
      await authStore.restoreSession()
    }
    catch (error) {
      console.error('Error restoring session:', error)
    }
  }
})
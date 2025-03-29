export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  if (authStore?.user?.id == null) {
    try {
      await authStore.restoreSession()
    }
    catch (error) {
      console.error('Error restoring session:', error)
    }
  }
})
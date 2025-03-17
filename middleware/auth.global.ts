export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  if (!authStore.user) {
    try {
      await authStore.restoreSession()
    }
    catch (error) {}
  }
})
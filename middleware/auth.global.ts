export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  if (!authStore.user) {
    await authStore.restoreSession()
  }
})
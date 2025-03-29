export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  if (authStore?.user?.id == null) return navigateTo('/login')
})
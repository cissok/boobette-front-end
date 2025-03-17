<template>
  <div class="reset-password-page">
    <h1>Reset Password</h1>
    <form @submit.prevent="handleNewPassword">
      <input v-model="newPassword" type="password" placeholder="New Password" required />
      <button type="submit">Set New Password</button>
    </form>
  </div>
</template>

<script setup>
const newPassword = ref('')
const route = useRoute()
const supabase = useNuxtApp().$supabase
const router = useRouter()

const params = route.query
const accessToken = params.access_token
const refreshToken = params.refresh_token

const handleNewPassword = async () => {
  if (!accessToken) {
    alert('Invalid or missing token')
    return
  }
  try {
    const { error: errorSession } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
    const { error: errorUpdate } = await supabase.auth.updateUser({
      password: newPassword.value
    })
    if (errorSession || errorUpdate) throw error
    alert('Password updated successfully')
    router.push('/login')
  } catch (error) {
    console.error('Password update failed:', error)
  }
}
definePageMeta({
  middleware: [
    function (to, from) {
      if (process.client && to.hash) {
        const hash = to.hash.substring(1);
        const params = new URLSearchParams(hash);
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');

        if (accessToken && refreshToken) {
          to.query.access_token = accessToken;
          to.query.refresh_token = refreshToken;
          const newUrl = to.path + '?' + new URLSearchParams(to.query).toString();
          window.history.replaceState(null, '', newUrl);
          return navigateTo({ path: to.path, query: to.query });
        }
      }
    }
  ]
})
</script>
<template>
  <div class="forgot-password-page">
    <h1>Forgot Password</h1>
    <form @submit.prevent="handleResetPassword">
      <input v-model="email" type="email" placeholder="Email" required />
      <button type="submit">Reset Password</button>
    </form>
  </div>
</template>

<script setup>
const email = ref('')
const authStore = useAuthStore()

const handleResetPassword = async () => {
  try {
    await authStore.resetPassword(email.value)
    alert('Password reset email sent')
  } catch (error) {
    console.error('Password reset failed:', error)
  }
}
</script>
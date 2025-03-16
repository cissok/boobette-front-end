<template>
  <div class="login-page">
    <h1>Sign Up</h1>
    <form @submit.prevent="handleSignUp">
      <input v-model="firstName" type="text" placeholder="First Name" required />
      <input v-model="lastName" type="text" placeholder="Last Name" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <input v-model="password2" type="password" placeholder="Repeat password" required />
      <button type="submit">Create account</button>
    </form>
    <div v-if="done">Please confirm your email !</div>
  </div>
</template>

<script setup>
const firstName = ref('Junior')
const lastName = ref('CISSOKHO')
const email = ref('cissok@cissok.dev')
const password = ref('yourpassword1234')
const password2 = ref('yourpassword1234')
const authStore = useAuthStore()
const done = ref(false)

const handleSignUp = async () => {
  try {
    await authStore.signup(firstName.value, lastName.value, email.value, password.value)
    done.value = true
  } catch (error) {
    console.error('SignUp failed:', error)
  }
}
</script>
<template>
  <div class="wrapper">
    <div class="w-full max-w-xl lg:max-w-screen-lg p-8">
      <div class="flex bg-isabelline shadow-lg rounded-lg w-full">
        <!-- LEFT -->
        <div class="hidden lg:block lg:w-1/2 bg-gray-400"></div>
        <!-- FORM -->
        <div class="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 sm:px-12 md:px-16 lg:px-18 py-6">
          <figure class="my-3">
            <img src="/assets/imgs/logo.png" alt="Logo" class="w-20 h-20 mx-auto" />
          </figure>
          <h1 class="text-center text-xl my-4 text-gray-400">Welcome to my plateform</h1>
          <form @submit.prevent="handleSignUp" class="pt-6 w-full">
            <div class="flex flex-row">
              <div class="w-1/2 mr-2">
                <!-- FIRST NAME -->
                <div class="flex flex-col mb-4 ">
                  <label for="firstName" class="text-sm text-gray-400">First name</label>
                  <input id="firstName" v-model="firstName" type="text" placeholder="First Name" required />
                </div>
              </div>
              <div class="w-1/2 ml-2">
                <!-- LAST NAME -->
                <div class="flex flex-col mb-4">
                  <label for="lastName" class="text-sm text-gray-400">Last name</label>
                  <input v-model="lastName" id="lastName" type="text" placeholder="Last Name" required />
                </div>
              </div>
            </div>
            <!-- EMAIL -->
            <div class="flex flex-col mb-4">
              <label for="email" class="text-sm text-gray-400">Email</label>
              <input v-model="email" id="email" type="email" placeholder="Email" required />
            </div>
            <!-- PASSWORD -->
            <div class="flex flex-col mb-4">
              <label for="password1" class="text-sm text-gray-400">Password</label>
              <input v-model="password" id="password1" type="password" placeholder="Password" required />
            </div>
            <!-- REPEAT PASSWORD -->
            <div class="flex flex-col mb-4">
              <label for="password2" class="text-sm text-gray-400">Repeat password</label>
              <input v-model="password2" id="password2" type="password" placeholder="Repeat password" required />
            </div>
            <!-- ERRORS -->
            <div class="mb-2">
              <!-- <span class="text-red-500 text-sm">Incorrect credentials</span> -->
              <!-- <span class="text-red-500 text-sm">Internal error</span> -->
            </div>
            <div class="w-full flex justify-center mt-4">
              <button class="button" type="submit">Create Account</button>
            </div>
          </form>
          <div class="flex justify-center items-center my-6">
            <span class="w-14 border-b border-gray-400"></span>
            <span class="mx-4 text-gray-400">or</span>
            <span class="w-14 border-b border-gray-400"></span>
          </div>
          <div class="flex justify-center mb-4">
            <NuxtLink to="/login" class="text-gray-500 underline text-sm">Sign In</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- <template>
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
</template> -->

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
definePageMeta({
  layout: 'plain'
})
</script>
<style scoped>
.wrapper{
  @apply w-full h-screen flex flex-col justify-center items-center bg-gray-300;
}

input{
  @apply w-full bg-transparent border-b border-gray-400 py-1 text-gray-700;
}

.button{
  @apply bg-gray-500 text-gray-200 px-12 py-1.5 rounded-xl hover:bg-gray-400 transition-colors;
}
</style>
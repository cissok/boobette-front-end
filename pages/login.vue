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
          <form @submit.prevent="handleLogin" class="pt-6 w-full">
            <!-- EMAIL -->
            <div class="flex flex-col mb-4">
              <label for="email" class="text-sm text-gray-400">Email</label>
              <input v-model="email" id="email" type="email" required />
            </div>
            <!-- PASSWORD -->
            <div class="flex flex-col">
              <label for="password" class="text-sm text-gray-400">Password</label>
              <div class="relative flex items-center justify-center">
                <input v-model="password" id="password" :type="passwordVisibliity ? 'text' : 'password'" required />
                <div class="absolute right-0 cursor-pointer mr-1">
                  <EyeSlashIcon v-if="passwordVisibliity" @click="passwordVisibliity = !passwordVisibliity" class="size-5 text-gray-400" />
                  <EyeIcon v-else @click="passwordVisibliity = !passwordVisibliity" class="size-5 text-gray-400" />
                </div>
              </div>
            </div>
            <div class="w-full flex justify-end mt-2">
              <NuxtLink to="/forgot-password" class="text-sm text-gray-500">Forgot password?</NuxtLink>
            </div>
            <!-- ERRORS -->
            <div class="mb-2">
              <!-- <span class="text-red-500 text-sm">Incorrect credentials</span> -->
              <!-- <span class="text-red-500 text-sm">Internal error</span> -->
            </div>
            <div class="w-full flex justify-center mt-4">
              <button class="button" type="submit">Sign in</button>
            </div>
          </form>
          <div class="flex justify-center items-center my-6">
            <span class="w-14 border-b border-gray-400"></span>
            <span class="mx-4 text-gray-400">or</span>
            <span class="w-14 border-b border-gray-400"></span>
          </div>
          <div class="flex justify-center mb-4">
            <NuxtLink to="/register" class="text-gray-500 underline text-sm">Create Account</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid'
const email = ref('jrcissokho+001@gmail.com')
const password = ref('lole1234')
const authStore = useAuthStore()
const router = useRouter()

const passwordVisibliity = ref(false)

const handleLogin = async () => {
  try {
    await authStore.login(email.value, password.value)
    router.push('/dashboard')
  } catch (error) {
    console.error('Login failed:', error)
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
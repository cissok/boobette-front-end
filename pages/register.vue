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
          <form @submit.prevent="submitForm" class="pt-6 w-full">
            <div class="flex flex-row">
              <div class="w-1/2 mr-2">
                <!-- FIRST NAME -->
                <div class="flex flex-col mb-4 ">
                  <label for="firstName" class="text-sm text-gray-400">First name</label>
                  <input v-model="form.firstName" id="firstName" type="text" autocomplete="name" />
                  <span v-if="v$.firstName.$error" class="text-red-500 text-sm mt-1">
                    {{ v$.firstName.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <div class="w-1/2 ml-2">
                <!-- LAST NAME -->
                <div class="flex flex-col mb-4">
                  <label for="lastName" class="text-sm text-gray-400">Last name</label>
                  <input v-model="form.lastName" id="lastName" type="text" autocomplete="family-name" />
                  <span v-if="v$.lastName.$error" class="text-red-500 text-sm mt-1">
                    {{ v$.lastName.$errors[0].$message }}
                  </span>
                </div>
              </div>
            </div>
            <!-- EMAIL -->
            <div class="flex flex-col mb-4">
              <label for="email" class="text-sm text-gray-400">Email</label>
              <input v-model="form.email" id="email" type="email" autocomplete="email" />
              <span v-if="v$.email.$error" class="text-red-500 text-sm mt-1">
                {{ v$.email.$errors[0].$message }}
              </span>
            </div>
            <!-- PASSWORD -->
            <div class="flex flex-col mb-4">
              <label for="password1" class="text-sm text-gray-400">Password</label>
              <input v-model="form.password" id="password1" type="text" autocomplete="new-password" />
              <span v-if="v$.password.$error" class="text-red-500 text-sm mt-1">
                {{ v$.password.$errors[0].$message }}
              </span>
            </div>
            <!-- REPEAT PASSWORD -->
            <div class="flex flex-col mb-4">
              <label for="repeatPassword" class="text-sm text-gray-400">Repeat password</label>
              <input v-model="form.repeatPassword" id="repeatPassword" type="text" autocomplete="new-password" />
              <span v-if="v$.repeatPassword.$error" class="text-red-500 text-sm mt-1">
                {{ v$.repeatPassword.$errors[0].$message }}
              </span>
            </div>
            <!-- ERRORS -->
            <div v-if="errorForm" class="mb-2">
              <span class="text-red-500 text-sm">Internal error !</span>
            </div>
            <div class="w-full flex justify-center items-center mt-4">
              <button class="button" type="submit" :disabled="loadingForm">Create Account</button>
              <Loader v-if="loadingForm" class="ml-4" />
            </div>
            <!-- SUCCESS -->
            <span v-if="registered" class="block text-green-500 text-sm mt-6">Registered! Please confirm your email.</span>
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

<script setup>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, maxLength, sameAs, helpers } from '@vuelidate/validators'

const authStore = useAuthStore()
const registered = ref(false)

const loadingForm = ref(false)
const errorForm = ref(null)

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  repeatPassword: ''
})

const hasSpecialChar = helpers.withMessage(
  'Password must contain at least one special character',
  value => /[!@#$%^&*(),.?":{}|<>]/.test(value)
)

const hasNumber = helpers.withMessage(
  'Password must contain at least one number',
  value => /\d/.test(value)
)

const hasCapitalChar = helpers.withMessage(
  'Password must contain at least one capital letter',
  value => /[A-Z]/.test(value)
)

const rules = computed(() => ({
  firstName: { required, maxLength: maxLength(16) },
  lastName: { required, maxLength: maxLength(16) },
  email: { required, email },
  password: { required, minLength: minLength(6), maxLength: maxLength(22), hasSpecialChar, hasNumber, hasCapitalChar },
  repeatPassword: { sameAs: sameAs(computed(() => form.value.password)) }
}))

const v$ = useVuelidate(rules, form)

const submitForm = async () => {
  loadingForm.value = true
  const isValid = await v$.value.$validate()
  if (!isValid) {
    loadingForm.value = false
    return  
  }
  try {
    await authStore.signup(form.value.firstName, form.value.lastName, form.value.email, form.value.password)
    registered.value = true
  } catch (error) {
    errorForm.value = error
  }
  loadingForm.value = false
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
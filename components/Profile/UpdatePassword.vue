<template>
  <div class="my-6">
    <form @submit.prevent="updatePassword">
      <div>
        <label for="password1" class="mr-2">Password:</label>
        <input type="password" id="password1" v-model="password1" />
      </div>
      <div>
        <label for="password2" class="mr-2">Repeat password:</label>
        <input type="password" id="password2" v-model="password2" />
      </div>
      <button :disabled="!isModified" type="submit">Save changes</button>
    </form>
  </div>
</template>
<script setup>
const authStore = useAuthStore()

const password1 = ref(null)
const password2 = ref(null)

const isModified = computed(() => {
  return password1.value === password2.value && password1.value !== null
})

const updatePassword = async () => {
  await authStore.updatePassword(password1.value)
  alert('Password updated!')
}
</script>
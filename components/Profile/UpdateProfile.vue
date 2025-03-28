<template>
  <div class="my-6">
    <form @submit.prevent="updateProfile">
      <div>
        <label for="firstName" class="mr-2">First Name:</label>
        <input type="text" id="firstName" v-model="firstName" />
      </div>
      <div>
        <label for="lastName" class="mr-2">Last Name:</label>
        <input type="text" id="lastName" v-model="lastName" />
      </div>
      <button :disabled="!isModified" type="submit">Save changes</button>
    </form>
  </div>
</template>
<script setup>
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const firstName = ref(user.value?.firstName)
const lastName = ref(user.value?.lastName)

const isModified = computed(() => {
  return user.value.firstName !== firstName.value || user.value.lastName !== lastName.value
})

const updateProfile = async () => {
  await authStore.updateProfile(firstName.value, lastName.value)
  alert('Profil updated!')
}
</script>
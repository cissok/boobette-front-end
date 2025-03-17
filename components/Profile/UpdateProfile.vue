<template>
  <div class="my-6">
    <form @submit.prevent="updateProfile">
      <div>
        <label for="first_name" class="mr-2">First Name:</label>
        <input type="text" id="first_name" v-model="first_name" />
      </div>
      <div>
        <label for="last_name" class="mr-2">Last Name:</label>
        <input type="text" id="last_name" v-model="last_name" />
      </div>
      <button :disabled="!isModified" type="submit">Save changes</button>
    </form>
  </div>
</template>
<script setup>
const authStore = useAuthStore()
const { profile } = storeToRefs(authStore)

const first_name = ref(profile.value?.first_name)
const last_name = ref(profile.value?.last_name)

const isModified = computed(() => {
  return profile.value.first_name !== first_name.value || profile.value.last_name !== last_name.value
})

const updateProfile = async () => {
  await authStore.updateProfile(first_name.value, last_name.value)
  alert('Profil updated!')
}
</script>
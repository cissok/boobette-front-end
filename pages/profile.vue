<template>
  <div>
    <h1>Profile</h1>
    <div v-if="user && profile">
      <ProfileUpdateProfile />
      <ProfileUpdateEmail />
      <ProfileUpdatePassword />
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  middleware: 'protected'
})
const authStore = useAuthStore()
const { user, profile } = storeToRefs(authStore)
</script>
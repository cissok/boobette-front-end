<template>
  <div>
    <h1 class="text-2xl font-medium">Profile</h1>
    <span v-if="user?.role === 'admin'" class="">Admin</span>
    <div v-if="user?.id">
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
const { user } = storeToRefs(authStore)
</script>
<template>
  <div class="dashboard-page">
    <h1>Dashboard</h1>
    <NuxtLink class="underline" to="/profile">Profile</NuxtLink>
  </div>
</template>
<script setup>
definePageMeta({
  middleware: 'protected'
})
</script>
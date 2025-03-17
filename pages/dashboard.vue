<template>
  <div class="dashboard-page">
    <h1>Dashboard</h1>
    <div class="flex flex-col">
      <NuxtLink class="underline" to="/profile">Profile</NuxtLink>
      <NuxtLink class="underline" to="/courses">Courses list</NuxtLink>
      <NuxtLink class="underline" to="/courses/add">Add course</NuxtLink>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  middleware: 'protected'
})
</script>
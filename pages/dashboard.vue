<template>
  <div class="dashboard-page">
    <h1>Dashboard</h1>
    <div class="flex flex-col">
      <NuxtLink class="underline" to="/profile">Profile</NuxtLink>
      <NuxtLink class="underline" to="/courses">Courses availables</NuxtLink>
      <NuxtLink class="underline" to="/my-courses">My courses</NuxtLink>
    </div>
    <div class="flex flex-col mt-4">
      <h2>Admin</h2>
      <NuxtLink class="underline" to="/courses/add">Add course</NuxtLink>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  middleware: 'protected'
})
</script>
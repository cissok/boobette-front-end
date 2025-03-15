<template>
  <header class="shadow-md flex py-2 px-4 items-center">
    <!-- LOGO -->
     <NuxtLink to="/" class="flex-1">
      <img src="~/assets/imgs/logo.png" alt="Logo" class="h-12" />
    </NuxtLink>
    <!-- SIGNIN -->
    <NuxtLink to="/signin" class="">
      <Button level="secondary">Login</Button>
    </NuxtLink>
    <!-- SIGNUP -->
    <NuxtLink to="/signup" class="ml-2">
      <Button level="primary">Create account</Button>
    </NuxtLink>
  </header>
</template>

<script setup>
</script>

<style scoped>
</style>

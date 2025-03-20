<script setup>
const authStore = useAuthStore()
const { user, profile } = storeToRefs(authStore)
</script>

<template>
  <div>
    <header class="shadow-md">
      <div class="flex py-2 px-4 items-center" >
        <!-- LOGO -->
        <NuxtLink to="/" class="flex-1">
          <img src="~/assets/imgs/logo.png" alt="Logo" class="h-12" />
        </NuxtLink>
        
        <!-- SIGNUP -->
        <NuxtLink to="/register" class="ml-2" v-if="!user">
          <Button level="primary">Create account</Button>
        </NuxtLink>
        
        <!-- USER -->
        <div v-if="profile" class="flex items-center">
          {{ profile.first_name }} {{ profile.last_name }}
        </div>

        <!-- DASHBOARD -->
        <NuxtLink to="/dashboard" class="ml-2" v-if="user">
          <Button level="secondary">Dashboard</Button>
        </NuxtLink>

        <!-- LOGIN/LOGOUT -->
        <NuxtLink v-if="!user" to="/login" class="ml-2">
          <Button level="secondary">Login</Button>
        </NuxtLink>
        <Button v-else level="secondary" @click="authStore.logout" class="ml-2">Logout</Button>
      </div>
    </header>
  </div>
</template>

<style scoped>
</style>
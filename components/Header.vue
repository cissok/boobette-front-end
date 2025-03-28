<template>
  <div>
    <header class="shadow-md">
      <div class="flex py-2 px-4 items-center" >
        <!-- LOGO -->
        <NuxtLink to="/" class="flex-1">
          <img src="~/assets/imgs/logo.png" alt="Logo" class="h-12" />
        </NuxtLink>
        
        <!-- SIGNUP -->
        <NuxtLink to="/register" class="ml-2" v-if="!user?.id">
          <Button level="primary">Create account</Button>
        </NuxtLink>
        
        <!-- USER -->
        <div v-if="user?.id" class="flex items-center">
          {{ user.firstName }} {{ user.lastName }}
        </div>

        <!-- DASHBOARD -->
        <NuxtLink v-if="user?.id" to="/dashboard" class="ml-2">
          <Button level="secondary">Dashboard</Button>
        </NuxtLink>

        <!-- LOGIN/LOGOUT -->
        <NuxtLink v-if="!user?.id" to="/login" class="ml-2">
          <Button level="secondary">Login</Button>
        </NuxtLink>
        <Button v-else level="secondary" @click="authStore.logout" class="ml-2">Logout</Button>
      </div>
    </header>
  </div>
</template>

<script setup>
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
</script>

<style scoped>
</style>
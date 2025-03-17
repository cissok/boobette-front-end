<template>
  <div>
    <Header />
    <main class="container mx-auto my-6 px-2">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>
<script setup>
const authStore = useAuthStore();
await useAsyncData("auth", () => authStore.restoreSession());
</script>
<template>
  <div class="relative">
    <!-- SUBSCRIPTION -->
    <div class="absolute top-0 right-0 flex items-center flex-col">
      <div v-if="!user?.isSubscribed">
        <div class="text-red-500 border px-2 p-1 border-red-500 font-medium">Not subscribed</div>
        <NuxtLink class="underline" to="/subscribe">Subscribe</NuxtLink>
      </div>
      <div v-else class="flex flex-col items-center">
        <div class="text-green-500 border px-2 p-1 border-green-500 font-medium">Subscribed ({{ user?.subscriptionStatus }})</div>
        <button v-if="user?.subscriptionStatus !== 'will_expire'" @click="unsubscribe" class="underline">Unsubscribe</button>
      </div>
    </div>
    <h1 class="text-2xl font-medium">Dashboard</h1>
    <div class="flex flex-col mt-4">
      <NuxtLink class="underline" to="/profile">Profile</NuxtLink>
      <NuxtLink class="underline" to="/courses">Courses availables</NuxtLink>
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

const authStore = useAuthStore()
const subscriptionsStore = useSubscriptionsStore()
const { user } = storeToRefs(authStore)

const unsubscribe = async () => {
  try {
    await subscriptionsStore.unsubscribe()
    alert('Unsubscribed successfully')
  } catch (error) {
    alert('Error unsubscribing', error)
  }
}
</script>
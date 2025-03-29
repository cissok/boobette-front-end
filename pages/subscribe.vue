<template>
  <div>
    <h1 class="text-2xl font-medium mb-4">Subscription</h1>
    <div v-if="!user?.isSubscribed" class="mt-4 flex flex-col">
      <div class="mb-2">
        <Button level="primary" @click="subscribe(1)">Subscribe 1 mois</Button>
      </div>
      <div class="mb-2">
        <Button level="primary" @click="subscribe(3)">Subscribe 3 mois</Button>
      </div>
      <div class="mb-2">
        <Button level="primary" @click="subscribe(6)">Subscribe 6 mois</Button>
      </div>
      <div class="mb-2">
        <Button level="primary" @click="subscribe(12)">Subscribe 1 year</Button>
      </div>
    </div>
    <div v-else class="flex flex-col">
      You're already subscribed!
      <NuxtLink class="underline" to="/purchases">See your purchases</NuxtLink>
      <NuxtLink class="underline" to="/dashboard">Dashboard</NuxtLink>
    </div>
  </div>
</template>
<script setup>
const subscriptionsStore = useSubscriptionsStore()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const subscribe = (amountMonth) => {
  subscriptionsStore.subscribe(amountMonth)
}
</script>
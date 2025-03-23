<template>
  <div>
    <h1 class="text-2xl font-medium">Subscription</h1>
    <div class="mt-4">
      <Button level="primary" @click="subscribe">Subscribe</Button>
    </div>
  </div>
</template>

<script setup>
const subscriptionsStore = useSubscriptionsStore()
const subscribe = () => {
  console.log('Subscribing...')
  subscriptionsStore.subscribe()
}
</script>
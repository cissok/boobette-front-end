<template>
  <div>
    <h1>My courses</h1>
    <p>Here ar listed every courses purchased</p>
    <ul v-if="purchases?.length > 0">
      <li v-for="purchase in purchases" :key="purchase?.id" class="border py-2 my-1 px-2">
        <NuxtLink :to="`/courses/${purchase.course_id}`" class="flex justify-between">
          <div>{{ purchase.courses.title }}</div>
          <div>{{ purchase.created_at}}</div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
<script setup>
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const purchasesStore = usePurchasesStore()
const { purchases } = storeToRefs(purchasesStore)
await purchasesStore.fetchPurchases(user.value?.id)
</script>
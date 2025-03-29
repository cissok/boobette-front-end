<template>
  <div>
    <h1 class="text-2xl font-medium mb-4">Purchases</h1>
    <ul v-if="purchasesList?.length > 0" class="border">
      <li v-for="purchase in purchasesList" :key="purchase.id" classs="border-b">
        <div class="flex flex-col">
          <div>id: {{ purchase?.id }}</div>
          <div>status: {{ purchase?.status }}</div>
          <div>amount: {{ purchase?.amount }}</div>
          <div>currency: {{ purchase?.currency }}</div>
          <div>customer: {{ purchase?.customer }}</div>
          <div>description: {{ purchase?.description }}</div>
          <div>receipt_number: {{ purchase?.receipt_number }}</div>
          <div>receipt_url: <a :href="purchase?.receipt_url" target="_blank">Invoice</a></div>
          <div>created: {{ purchase?.created }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup>
definePageMeta({
  middleware: 'protected'
})
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const purchasesList = ref([]);

onMounted(async () => {
  const { purchases } = await $fetch('/api/stripe/list-purchases', {
    method: 'GET',
    params: {
      userEmail: user.value.email
    }
  });
  purchasesList.value = purchases;
});
</script>
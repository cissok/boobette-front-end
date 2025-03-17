<template>
  <div class="my-6">
    <form @submit.prevent="updateEmail">
      <div>
        <label for="email" class="mr-2">Email:</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <button :disabled="!isModified" type="submit">Save changes</button>
    </form>
  </div>
</template>
<script setup>
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const email = ref(user.value?.email)

const isModified = computed(() => {
  return user.value.email !== email.value
})

const updateEmail = async () => {
  await authStore.updateUser(email.value)
  alert('Email updated!')
}
</script>
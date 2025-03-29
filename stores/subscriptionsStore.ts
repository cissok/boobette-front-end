export const useSubscriptionsStore = defineStore('subscriptions', () => {
  const authStore = useAuthStore()

  const subscribe = async (amountMonth: number) => {
    try {
      const { url } = await $fetch('/api/stripe/checkout', {
        method: 'POST',
        body: {
          amountMonth,
          userEmail: authStore.user?.email,
        }
      });   
      if (url) window.location.href = url;
    }
    catch(error){
      console.error('Subcription account failed:', error)
      throw error
    }
  }

  return {
    subscribe,  
  }
})
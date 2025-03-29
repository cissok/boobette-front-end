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
      console.error('Subcription failed:', error)
      throw error
    }
  }

  const unsubscribe = async () => {
    try {
      await $fetch('/api/stripe/unsubscribe', {
        method: 'POST',
        body: {
          subscriptionId: authStore.user?.subscriptionId,
        }
      });
    }
    catch(error){
      console.error('Unsubscribing failed:', error)
      throw error
    }
  }

  return {
    subscribe,  
    unsubscribe,
  }
})
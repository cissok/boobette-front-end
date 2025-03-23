export const useSubscriptionsStore = defineStore('subscriptions', () => {
  const authStore = useAuthStore()

  const subscribe = async () => {
    try {
      const { data } = await useFetch('/api/stripe/checkout', {
        method: 'POST',
        body: {
          priceId: 'price_1R5ct1CkAwCRcoziWNUTys4c', // ID du plan d'abonnement Stripe
          userId: authStore.user?.email, // Utiliser l'email ou l'ID de Supabase
        }
      });
    
      if (data.value?.url) {
        window.location.href = data.value.url;
      }
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
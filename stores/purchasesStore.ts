export const usePurchasesStore = defineStore('purchases', () => {
  const supabase = useNuxtApp().$supabase
  const purchases = ref(null)

  const createPurchase = async (courseId: string, userId: string, price: string) => {
    try {
      const { data, error } = await supabase
        .from('purchases')
        .insert([
          { 'user_id': userId,  'course_id': courseId, price, status: 'pending' }
        ])
        .select();
      if (error) throw error
      await fetchPurchases(userId)
    }
    catch(error){
      console.error('Creating purchase failed:', error)
      throw error
    }
    
  }

  const fetchPurchases = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('purchases')
        .select('*, courses(title, description)')
        .eq('user_id', userId)
        // .eq('status', 'paid')
        .order('created_at', { ascending: false });
      if (error) {
        console.error('Fetch purchases failed:', error);
        return null;
      }
      if (error) throw error
      purchases.value = data
    }
    catch(error){
      console.error('Creating account failed:', error)
      throw error
    }
  }

  return {
    fetchPurchases,
    createPurchase,
    purchases,
  }
})
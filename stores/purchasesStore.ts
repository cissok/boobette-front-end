export const usePurchasesStore = defineStore('purchases', () => {
  const supabase = useNuxtApp().$supabase

  const createPurchase = async (course_id: string, user_id: string, price: string) => {
    try {
      const { data, error } = await supabase
        .from('purchases')
        .insert([
          { user_id, course_id, price, status: 'pending' }
        ])
        .select();
      if (error) throw error
    }
    catch(error){
      console.error('Creating purchase failed:', error)
      throw error
    }
    
  }

  const fetchPurchases = async (user_id: string) => {
    try {
      const { data, error } = await supabase
        .from('purchases')
        .select('*, courses(title, description)')
        .eq('user_id', user_id)
        // .eq('status', 'paid')
        .order('created_at', { ascending: false });
      if (error) {
        console.error('Fetch purchases failed:', error);
        return null;
      }
      if (error) throw error
      return data
    }
    catch(error){
      console.error('Creating account failed:', error)
      throw error
    }
  }

  return {
    fetchPurchases,
    createPurchase
  }
})
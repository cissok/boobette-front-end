import { usePurchasesStore } from './purchasesStore'

export const useAuthStore = defineStore('auth', () => {
  const supabase = useNuxtApp().$supabase
  const purchasesStore = usePurchasesStore()
  const user = ref(null)
  const profile = ref(null)

  const login = async (email: string, password: string) => {
    try {
      const { data: userData, error: userError } = await supabase.auth.signInWithPassword({ email, password })
      if (userError) throw userError
      user.value = userData.user
      const authCookie = useCookie('auth', { path: '/' })
      authCookie.value = userData.session.access_token
      await fetchProfile(userData.user.id)
    } catch (error) { 
      throw error
    }
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    const authCookie = useCookie('auth', { path: '/' })
    authCookie.value = null
    user.value = null
    profile.value = null
    navigateTo('/')
  }

  const restoreSession = async () => {
    const token = useCookie('auth').value
    if (token) {
      const { data, error } = await supabase.auth.getUser(token)
      if (error) throw error
      user.value = data.user

      await fetchProfile(data.user.id)
    }
  }

  const signup = async (firstName: string, lastName: string, email: string, password: string, role = 'user') => {
    try {
      const { data: userData ,error: userError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: "http://localhost:3000/confirmation"
        }
      })
      if(userError) throw userError
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .insert([{ 'id': userData.user.id, 'first_name': firstName, 'last_name': lastName, role }])
      if(profileError) throw profileError
    } catch (error) {
      throw error
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:3000/reset-password'
      })
      if (error) throw error
    } catch (error) {
      console.error('Password reset failed:', error)
      throw error
    }
  }

  const updateProfile = async (firstName: string, lastName: string) => {
    try {
      const { id } = user.value
      const { data, error } = await supabase
        .from('profiles')
        .update({ 'first_name': firstName, 'last_name':lastName })
        .eq('id', id)
        .single()
      if (error) throw error
      await fetchProfile(id)
    }
    catch(error){
      console.error('Update profile failed:', error)
      throw error
    }
  }

  const updateUser = async (email: string) => {
    try {
      const { data: userData, error: userError } = await supabase.auth.updateUser({ email })
      if (userError) throw userError
      user.value = userData.user
    }
    catch(error){
      console.error('Update user failed:', error)
      throw error
    }
  }

  const updatePassword = async (newPassword: string) => {
    try {
      const { data: userData, error: userError } = await supabase.auth.updateUser({ password: newPassword })
      if (userError) throw userError
      user.value = userData.user
    }
    catch(error){
      console.error('Update password failed:', error)
      throw error
    }
  }

  // FUNCTIONS
  const fetchProfile = async (userId: string ) => {
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    if (profileError) throw profileError
    profile.value = profileData
    await purchasesStore.fetchPurchases(userId)
  }

  return {
    user,
    profile,
    login,
    logout,
    signup,
    resetPassword,
    updateProfile,
    updateUser,
    updatePassword,
    restoreSession,
  }
})
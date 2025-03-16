export const useAuthStore = defineStore('auth', () => {
  const supabase = useNuxtApp().$supabase
  const user = ref(null)
  const profile = ref(null)

  const login = async (email: string, password: string) => {
    try {
      const { data: userData, error: userError } = await supabase.auth.signInWithPassword({ email, password })
      if (userError) throw userError
      user.value = userData.user

      const authCookie = useCookie('auth', { path: '/' })
      authCookie.value = userData.session.access_token

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userData.user.id)
        .single()
      if (profileError) throw profileError
      profile.value = profileData
    } catch (error) {
      console.error('Login failed:', error)
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

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single()
      if (profileError) throw profileError
      profile.value = profileData
    }
  }

  const signup = async (firstName: string, lastName: string, email: string, password: string, role = 'user') => {
    console.log('signup', firstName, lastName, email, password)
    try {
      const { data: userData, error: userError } = await supabase.auth.signUp({ email, password, options: {
        emailRedirectTo: "http://localhost:3000/confirmation"
      } })
      if (userError) throw userError
      user.value = userData.user
    } catch (error) {
      console.error('Signup failed:', error)
      throw error
    }
  }

  onMounted(() => {
    restoreSession()
  })

  return {
    user,
    profile,
    login,
    logout,
    signup,
  }
})
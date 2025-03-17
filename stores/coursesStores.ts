export const useCoursesStore = defineStore('courses', () => {
  const supabase = useNuxtApp().$supabase
  const courses = ref(null)
  // const profile = ref(null)

  const addCourse = async (title: string, description: string, video_url: string, author_id: string) => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .insert(
          title,
          description,
          video_url,
          author_id,
        )
        .select()
      if (error) throw error
    }
    catch(error){
      console.error('Creating account failed:', error)
      throw error
    }
  }

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select()
      if (error) throw error
      return data
    }
    catch(error){
      console.error('Creating account failed:', error)
      throw error
    }
  }

  const fetchCourse = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select()
        .eq('id', id)
      if (error) throw error
      if(data?.length === 0) throw new Error('Course not found')
      return data?.[0]
    }
    catch(error){
      console.error('Creating account failed:', error)
      throw error
    }
  }

  const deleteCourse = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id)
      if (error) throw error
    }
    catch(error){
      console.error('Creating account failed:', error)
      throw error
    }
  }

  return {
    addCourse,
    fetchCourses,
    fetchCourse,
    deleteCourse
  }
})
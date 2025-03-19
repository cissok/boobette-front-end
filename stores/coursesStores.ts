export const useCoursesStore = defineStore('courses', () => {
  const supabase = useNuxtApp().$supabase
  const courses = ref(null)

  const addCourse = async (title: string, description: string, video_url: string, author_id: string, price: number) => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .insert(
          title,
          description,
          video_url,
          author_id,
          price
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
      courses.value = data
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

  const updateCourse = async (courseId: string, title: string, description: string, video_url: string, author_id: string, price: number) => {
    try {
      const { error } = await supabase
        .from('courses')
        .update({
          title,
          description,
          video_url,
          author_id,
          price
        })
        .eq('id', courseId)
      if (error) throw error
      await fetchCourses()
    }
    catch(error){
      console.error('Updating account failed:', error)
      throw error
    }
  }

  const fetchAuthors = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select()
      if (error) throw error
      const authorIds = data.reduce((acc: any[], course: any) => {
        if (course.author_id && !acc.includes(course.author_id)) {
          acc.push(course.author_id)
        }
        return acc
      }, [])
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .in('id', authorIds)
      if (profilesError) throw profilesError
      return profilesData
    }
    catch(error){
      console.error('Fetch authors failed:', error)
      throw error
    }
  }

  return {
    addCourse,
    fetchCourses,
    fetchCourse,
    deleteCourse,
    updateCourse,
    fetchAuthors,
    courses
  }
})
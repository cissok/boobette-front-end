<template>
  <div>
    <h1>Course</h1>
    <div v-if="course">
      <div>Title: {{ course?.title }}</div>
      <div>Description: {{ course?.description }}</div>
      <div>Video: {{ course?.video_url }}</div>
    </div>
    <div class="mt-10">
      <div>Admin panel</div>
      <div>
        <Button level="secondary" @click="deleteCourse">Del</Button>
      </div>
    </div>
  </div>
</template>
<script setup>
const router = useRouter()
const coursesStore = useCoursesStore()
const course = await coursesStore.fetchCourse(useRoute()?.params?.id)

const deleteCourse = async () => {
  try {
    await coursesStore.deleteCourse(course?.id)
    alert('Course deleted successfully')
    router.push('/courses')

  } catch (error) {
    console.error('Deleting course failed:', error)
  }
}
</script>
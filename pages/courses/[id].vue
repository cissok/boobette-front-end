<template>
  <div>
    <h1>Course</h1>
    <div class="flex ">
      <div v-if="course" class="w-3/4">
        <div>Title: {{ course?.title }}</div>
        <div>Description: {{ course?.description }}</div>
        <div>Video: {{ course?.video_url }}</div>
        <div>Author: {{ course?.author_id }}</div>
        <div>Price: {{ course?.price }}</div>
      </div>
    </div>
    <div class="mt-10">
      <div>Admin panel</div>
      <div class="flex">
        <NuxtLink :to="'/courses/edit/' + course?.id" class="mr-2">
          <Button level="secondary">Edit</Button>
        </NuxtLink>
        <Button level="secondary" @click="deleteCourse">Del</Button>
      </div>
    </div>
  </div>
</template>
<script setup>
const router = useRouter()
const coursesStore = useCoursesStore()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

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
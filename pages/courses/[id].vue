<template>
  <div>
    <h1>Course</h1>
    <div class="flex ">
      <div v-if="course" class="w-3/4">
        <div>Title: {{ course?.title }}</div>
        <div>Description: {{ course?.description }}</div>
        <div>Video: {{ course?.video_url }}</div>
      </div>
      <div class="w-1/4">
        <Button level="primary" @click="purchaseCourse">Purchase</Button>
      </div>
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
const purchasesStore = usePurchasesStore()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const course = await coursesStore.fetchCourse(useRoute()?.params?.id)

const purchaseCourse = async () => {
  try {
    await purchasesStore.createPurchase(course?.id, user.value?.id, '0.00')
    alert('Course purchased successfully')
  } catch (error) {
    console.error('Purchasing course failed:', error)
  }
}

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
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
      <div class="w-1/4">
        <Button v-if="isAlreadyPurchased" level="secondary" disabled>Already purchased</Button>
        <Button v-else level="primary" @click="purchaseCourse">Purchase</Button>
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
const purchasesStore = usePurchasesStore()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const { purchases } = storeToRefs(purchasesStore)

const course = await coursesStore.fetchCourse(useRoute()?.params?.id)

const purchaseCourse = async () => {
  try {
    await purchasesStore.createPurchase(user.value?.id, course?.id, course?.price)
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

const isAlreadyPurchased = computed(() => {
  return purchases.value.some(purchase => purchase.course_id === course?.id)
})
</script>
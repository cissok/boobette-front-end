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

        <button @click="seeVideo">See video</button>
        <video v-if="videoUrl" width="320" height="240" controls>
          <source :src="videoUrl" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
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

const videoUrl = ref('')

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

const seeVideo = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/get-video', {
      method: 'GET',
    });
    if (!response.ok) throw new Error(`Error! status: ${response.status}`);
    const { url } = await response.json();
    videoUrl.value = url;
  } catch (error) {
    console.error('Error:', error);
  }
}
</script>
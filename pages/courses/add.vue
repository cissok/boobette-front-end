<template>
  <div>
    <h1>Add courses</h1>
    <div>
      <form @submit.prevent="addCourse" class="flex flex-col">
        <input type="text" v-model="title" placeholder="Title" required />
        <input type="textArea" v-model="description" placeholder="Description" required />
        <input type="text" v-model="video" placeholder="Video url" required />
        <input type="number" v-model="price" step="0.01" min="0" max="9999" oninput="validity.valid||(value='');" placeholder="Price" required />
        <button type="submit">Add course</button>
      </form>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const coursesStore = useCoursesStore()
const title = ref('')
const description = ref('')
const video = ref('')
const price = ref(0)

const addCourse = async () => {
  try {
    await coursesStore.addCourse({
      title: title.value,
      description: description.value,
      video_url: video.value,
      author_id: user.value?.id,
      price: price.value,
    })
    alert('Course added successfully')
    router.push('/courses')
  } catch (error) {
    console.error('Adding course failed:', error)
  }
}
</script>
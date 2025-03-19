<template>
  <div>
    <h1>Edit course</h1>
    <form @submit.prevent="editCourse">
      <div>
        <label for="title">Title</label>
        <input id="title" v-model="title" type="text" />
      </div>
      <div>
        <label for="description">Description</label>
        <input id="description" v-model="description" type="text" />
      </div>
      <div>
        <label for="v">Video URL</label>
        <input id="videoUrl" v-model="videoUrl" type="text" />
      </div>
      <div>
        <label for="authorId">Author ID</label>
        <input id="authorId" v-model="authorId" type="text" />
      </div>
      <div>
        <label for="price">Price</label>
        <input id="price" v-model="price" type="text" />
      </div>
      <div>
        <button level="primary" type="submit">Save</button>
      </div>
    </form>
  </div>
</template>
<script setup>
const coursesStore = useCoursesStore()
const courseId = useRoute()?.params?.id
const course = await coursesStore.fetchCourse(useRoute()?.params?.id)

const title = ref(course.title)
const description = ref(course.description)
const videoUrl = ref(course.video_url)
const authorId = ref(course.author_id)
const price = ref(course.price)

const editCourse = async () => {
  try {
    await coursesStore.updateCourse(
      courseId,
      title.value,
      description.value,
      videoUrl.value,
      course.author_id,
      price.value
    )
    alert('Course updated successfully')
  } catch (error) {
    console.error('Updating course failed:', error)
  }
}
</script>
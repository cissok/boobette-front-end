<template>
  <div>
    <h1>Courses</h1>
    <ul v-if="courses?.length > 0">
      <li v-for="course in courses" :key="course?.id" class="my-1 py-2 px-2 border">
        <NuxtLink :to="`/courses/${course?.id}`" class="flex justify-between items-center">
          <div>{{ course.title }}</div>
          <div>{{ course.price }}€</div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
<script setup>
const coursesStore = useCoursesStore()
const { courses } = storeToRefs(coursesStore)
await coursesStore.fetchCourses()
</script>
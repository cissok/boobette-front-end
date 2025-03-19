<template>
  <div>
    <h1>Courses</h1>
    <ul v-if="courses?.length > 0">
      <li v-for="course in courses" :key="course?.id" class="my-1 py-2 border">
        <NuxtLink :to="`/courses/${course?.id}`">
          <div>{{ course.title }}</div>
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
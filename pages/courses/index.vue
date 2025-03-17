<template>
  <div>
    <h1>Courses</h1>
    <ul v-if="courses?.length > 0">
      <li v-for="course in courses" :key="course?.id" class="my-1 py-2 border">
        <NuxtLink :to="`/courses/${course?.id}`">
          <div>{{ course.title }}</div>
          <div>{{ course.description }}</div>
          <div>{{ course.video_url }}</div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
<script setup>
const coursesStore = useCoursesStore()
const courses = await coursesStore.fetchCourses()
</script>
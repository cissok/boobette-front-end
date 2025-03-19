<template>
  <div>
    <p>{{ formattedDate }}</p>
  </div>
</template>

<script setup>
import { format } from 'date-fns';
const props = defineProps({
  date: {
    type: String,
    required: true,
  },
});
const formattedDate = computed(() => {
  return format(new Date(props.date), "dd MMMM yyyy HH:mm");
});
</script>

<template>
  <div class="button" :class="[$attrs.level]">
    <slot />
  </div>
</template>
<style scoped>
.button{
  @apply font-medium py-2 px-4 rounded transition-colors duration-300 cursor-pointer;
  &.primary {
    @apply bg-yellow-300 text-gray-700 hover:bg-yellow-50 hover:text-gray-500; ;
  }
  &.secondary {
    @apply bg-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-500; ;
  }
}

</style>
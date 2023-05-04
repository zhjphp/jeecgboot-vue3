<template>
  <div class="title-box">
    <!--      <i class="fab fa-telegram-plane"></i>-->
    {{title}}
  </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['title'],
})
</script>

<style scoped>
</style>

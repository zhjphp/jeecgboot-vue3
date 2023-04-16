<template>
  <div>
    <div>
      <h1>vvvvvvvvvvvvvv</h1>
      <h1>{{ aaa }}</h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { responseString } from './test1.api'
import {onMounted, ref} from "vue";

const aaa = ref()
function a() {
  responseString(null).then(
    v => {
      console.log("vvv")
      console.log(v)
      aaa.value = v
    }
  );
}
console.log("aaa")
console.log(aaa)
console.log(aaa.value)

onMounted(() => {
  a();
});
</script>

<style scoped></style>

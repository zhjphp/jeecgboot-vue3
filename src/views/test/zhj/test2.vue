<template>
  <div>
    <div>
      <h1>vvvvvvvvvvvvvv</h1>
      <h1>{{ aaa }}</h1>
      <a-button type="primary" @click="authIt" preIcon="ant-design:plus-outlined"> 鉴权</a-button>
      <h1>{{ bbb }}</h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import { responseString, authPermission } from './test1.api'

const aaa = ref("hahahah");

const bbb = ref("no permission");

responseString(null).then(
  v => {
    aaa.value = v
  }
);
console.log("aaa")
console.log(aaa.value)

console.log("bbb")
console.log(bbb.value)

function authIt() {
  authPermission(null).then(
    v => {
      bbb.value = "has permission"
      console.log("bbb-auth")
      console.log(bbb.value)
    }
  );
}

</script>

<style scoped></style>

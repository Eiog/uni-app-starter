<template>
  <view class="w-full h-full flex flex-col gap-10 items-center justify-center">
    <text class="text-8xl">😎</text>
    <text class="font-normal text-3xl animate-bounce">{{title}}</text>
  </view>
</template>

<script setup lang="ts" name="aaa">
import { ref } from 'vue'
import http from '@/http';
const title = ref('Hello World')
http.get('/demo').then(res=>{
  console.log(res);
})
</script>

<style>

</style>

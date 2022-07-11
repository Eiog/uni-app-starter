<template>
<tm-app ref="app">
  <view class="w-full h-full flex flex-col gap-10 items-center justify-center">
    <text class="text-8xl">😎</text>
    <text class="font-normal text-3xl animate-bounce">{{ title }}</text>
    <view class="flex flex-col items-center">
      <text class="text-2xl">{{ appStore.count }}</text>
      <view class="flex items-center justify-center gap-3">
        <view
          class="bg-green-400 w-16 h-10 rounded-full text-white text-2xl font-normal text-center"
          @click="appStore.count--"
          >-</view
        >
        <view
          class="bg-green-400 w-16 h-10 rounded-full text-white text-2xl font-normal text-center"
          @click="appStore.count++"
          >+</view
        >
      </view>
    </view>
  </view>
  </tm-app>
</template>

<script setup lang="ts" name="aaa">
import { ref } from "vue";
import { useAppStore } from "@/store";
import http from "@/http";
import tmApp from "@/tmui/components/tm-app/tm-app.vue"
const appStore = useAppStore();
const title = ref("Hello World");
http.get("/demo").then((res) => {
  console.log(res);
});
</script>

<style></style>

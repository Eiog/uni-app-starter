<template>
  <view class="w-full h-full flex flex-col items-center justify-center gap-3">
    <text class="text-6xl" :class="animation ? 'animate-jello' : ''">🎉</text>
    <text class="text-3xl">{{ title }}</text>
    <text class="text-3xl">{{ appStore.count }}</text>
    <view class="flex items-center justify-center gap-3">
      <view
        class="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white active:bg-green-700"
        @click="appStore.count--"
      >
        <text class="i-ri-subtract-fill text-3xl"></text>
      </view>
      <view
        class="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white active:bg-red-700"
        @click="appStore.count++"
      >
        <text class="i-ri-add-fill text-3xl"></text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts" name="aaa">
import { ref } from "vue";
import { useAppStore } from "@/store";
import http from "@/http";
const appStore = useAppStore();
const animation = ref(false);
watch(
  () => appStore.count,
  (val) => {
    animation.value = true;
    setTimeout(() => {
      animation.value = false;
    }, 300);
  }
);
const title = ref("Hello World");
http.get("/demo").then((res) => {
  console.log(res);
});
</script>

<style></style>

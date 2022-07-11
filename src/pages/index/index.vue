<template>
<tm-app ref="app">
  <view class="flex flex-col flex-1 flex-col-center-center">
    <tm-text font-size="200" label="😎"></tm-text>
    <tm-text font-size="60" :label="title"></tm-text>
    <view class="flex flex-col flex-col-center-center">
      <tm-text font-size="100" :label="appStore.count"></tm-text>
      <view class="flex flex-row-center-center ">
        <view class="mx-20">
        <tm-button :width="84" :height="84" :round="10" :font-size="40" color="green" icon="tmicon-minus" @click="appStore.count--"></tm-button>
        </view>
        <view class="mx-20">
        <tm-button :width="84" :height="84" :round="10" :font-size="40" color="red" icon="tmicon-plus" @click="appStore.count++"></tm-button>
        </view>
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
import tmButton from "@/tmui/components/tm-button/tm-button.vue";
const appStore = useAppStore();
const title = ref("Hello World");
http.get("/demo").then((res) => {
  console.log(res);
});
</script>

<style></style>

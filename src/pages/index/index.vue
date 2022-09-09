<template>
  <tm-app>
    <view flex="~ col 1" gap="3" items="center" justify="center">
      <text text="6xl" :class="animation ? 'animate-jello' : ''">🎉</text>
      <text text="3xl" font="light">{{ title }}</text>
      <text text="5xl" font="light">{{ appStore.count }}</text>
      <view flex="~" gap="2" items="center" justify="center">
        <tm-button
          color="green"
          icon="tmicon-minus"
          :width="86"
          :round="10"
          :height="86"
          :fontSize="40"
          :margin="[10, 10]"
          :shadow="0"
          size="normal"
          @click="appStore.count--"
        ></tm-button>
        <tm-button
          color="red"
          icon="tmicon-plus"
          :width="86"
          :round="10"
          :height="86"
          :fontSize="40"
          :margin="[10, 10]"
          :shadow="0"
          size="normal"
          @click="appStore.count++"
        ></tm-button>
      </view>
      <div class="">
        <tm-button
          color="white"
          :height="86"
          :fontSize="40"
          :margin="[10, 10]"
          :shadow="0"
          size="normal"
          label="打开通知"
          @click="msgref?.show({})"
        ></tm-button>
      </div>
    </view>
    <tm-message ref="msgref"></tm-message>
  </tm-app>
</template>

<script setup lang="ts" name="aaa">
import { ref } from 'vue';
import { useAppStore } from '~/stores';
import http from '~/http';
import tmApp from '~/tmui/components/tm-app/tm-app.vue';
import tmButton from '~/tmui/components/tm-button/tm-button.vue';
import tmMessage from '~/tmui/components/tm-message/tm-message.vue';
const msgref = ref<InstanceType<typeof tmMessage> | null>(null);
const appStore = useAppStore();
const animation = ref(false);
watch(
  () => appStore.count,
  (val) => {
    animation.value = true;
    setTimeout(() => {
      animation.value = false;
    }, 300);
  },
);
const title = ref('Hello World');
http.get('/demo').then((res) => {
  console.log(res);
});
</script>

<style></style>

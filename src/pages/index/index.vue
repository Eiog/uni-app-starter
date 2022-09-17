<script setup lang="ts">
import tuiButton from 'thorui/tui-button/tui-button.vue';
</script>

<template>
  <view wfull hfull flex="~ col" gap3 items-center justify-center>
    <text text-2xl class="text">Hello</text>
    <tui-button>Button</tui-button>
  </view>
</template>
<style scoped lang="less">
.text {
  --at-apply: text-gray3;
}
</style>

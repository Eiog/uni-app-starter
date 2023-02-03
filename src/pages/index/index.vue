<script setup lang="ts">
import uButton from 'uview-plus/components/u-button/u-button.vue';
</script>

<template>
  <view flex="~ 1 col" items-center justify-center>
    <view>{{ $t('welcome') }}</view>
    <u-button type="primary " text="月落"></u-button>
    <default-menu></default-menu>
  </view>
</template>
<style scoped lang="less"></style>

<script setup lang="ts"></script>

<template>
  <view flex="~ 1 col" items-center justify-center>
    <view>{{ $t('welcome') }}</view>
    <u-button type="primary " text="月落" />
    <nut-button type="primary">
      主要按钮
    </nut-button>
    <default-menu />
  </view>
</template>

<style scoped lang="less"></style>

<script setup lang="ts">
const title = ref('测试')
const content = ref('测试内容')
const uShow = ref(false)
const nutShow = ref(false)
const vinShow = ref(false)
</script>

<template>
  <view flex="~ 1 col" items-center justify-center>
    <view>{{ $t('welcome') }}</view>
    <u-button type="primary " text="月落" @click="uShow = true" />
    <nut-button type="primary" @click="nutShow = true">
      主要按钮
    </nut-button>
    <vin-button @click="vinShow = true">
      button
    </vin-button>
    <default-menu />
    <u-modal :show="uShow" :title="title" :content="content" @confirm="uShow = false" />
    <nut-dialog v-model:visible="nutShow" no-cancel-btn :title="title" :content="content" @ok="nutShow = false" />
    <vin-dialog
      v-model:visible="vinShow"
      no-cancel-btn
      :title="title" :content="content" @ok="nutShow = false"
    />
  </view>
</template>

<style scoped lang="less"></style>

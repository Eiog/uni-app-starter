<script setup lang="ts">
const { t } = useI18n()

const title = ref('测试')
const content = ref('测试内容')
const nutShow = ref(false)
const vinShow = ref(false)
</script>

<template>
  <view flex="~ 1 col" items-center justify-center>
    <view>{{ t('Welcome') }}</view>
    <vin-button @click="vinShow = true">
      button
    </vin-button>
    <vin-dialog
      v-model:visible="vinShow"
      no-cancel-btn
      :title="title" :content="content" @ok="nutShow = false"
    />
  </view>
</template>

<style scoped lang="less"></style>

<route type="home" lang="json">
  {
    "middleware": ["auth"]
  }
</route>

<script setup lang='ts'>
function login() {
  uni.setStorageSync('isLogin', true)
  uni.navigateBack()
}
</script>

<template>
  <div class="flex-center">
    <NutButton @click="login">
      登录
    </NutButton>
  </div>
</template>

<style scoped lang='less'>

</style>

<route lang="json">
  {
    "name":"login"
  }
  </route>

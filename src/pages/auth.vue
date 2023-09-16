<script setup lang='ts'>
function logOut() {
  uni.removeStorageSync('isLogin')
}
</script>

<template>
  <div>
    <h1>Auth</h1>
    <NutButton @click="logOut">
      退出登录
    </NutButton>
  </div>
</template>

<style scoped lang='less'>

</style>

<route lang="json">
  {
    "middleware": ["auth"]
  }
</route>

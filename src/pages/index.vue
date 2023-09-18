<script setup lang="ts">
const { t } = useI18n()
get('/info').then((res) => {
  // eslint-disable-next-line no-console
  console.log(res)
})
function toAuth() {
  uni.navigateTo({ url: '/pages/auth' })
}
</script>

<template>
  <div>
    {{ t('Welcome') }}
    <NutButton @click="toAuth">
      Auth
    </NutButton>
    <div class="box">
      Box
    </div>
  </div>
</template>

<style scoped lang="less">
.box{
  width:375px;
  background:red;
}
</style>

<route type="home" lang="json">
{

}
</route>

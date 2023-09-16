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
  </div>
</template>

<style scoped lang="less"></style>

<route type="home" lang="json">
{

}
</route>

<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()
get('/info').then((res) => {
  // eslint-disable-next-line no-console
  console.log(res)
})
function toAuth() {
  router.push('/pages/auth')
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
    <div class="flex-col-center gap-3">
      <NutButton type="info">
        NutButton
      </NutButton>
      <VinButton type="info">
        VinButton
      </VinButton>
      <WdButton type="info">
        WdButton
      </WdButton>
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
  "name":"index",
  "auth":true,
  "meta":{
    "auth":true
  }
}
</route>

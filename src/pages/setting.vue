<script setup lang="ts">
import { languageOptions, useLanguage } from '~/modules'

const { t } = useI18n()
const { colorModeOptions, colorMode, setColorMode } = useTheme()
const { language, setLanguage } = useLanguage()
function onThemeChange(v: any) {
  setColorMode(v.detail.value)
}
function onLanguageChange(v: any) {
  setLanguage(v.detail.value)
}
</script>

<template>
  <div class="w-full flex-col gap-[10px] p-[10px]">
    <div class="w-full flex-col gap-[10px] rounded-md bg-black/10 p-[10px]">
      <div>{{ t('global.setting.theme.title') }}</div>
      <radio-group class="w-full flex-y-center gap-[10px]" @change="onThemeChange">
        <label v-for="item in colorModeOptions" :key="item.value">
          <radio :value="item.value" :checked="colorMode === item.value" />
          {{ item.label }}
        </label>
      </radio-group>
    </div>
    <div class="w-full flex-col gap-[10px] rounded-md bg-black/10 p-[10px]">
      <div>{{ t('global.setting.language.title') }}</div>
      <radio-group class="w-full flex-y-center gap-[10px]" @change="onLanguageChange">
        <label v-for="item in languageOptions" :key="item.value">
          <radio :value="item.value" :checked="language === item.value" />
          {{ item.label }}
        </label>
      </radio-group>
    </div>
  </div>
</template>

<style scoped lang="less">
</style>

<route lang="yaml">
  style:
    navigationStyle: "default"
    navigationBarTitleText: "设置"
</route>

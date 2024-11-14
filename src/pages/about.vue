<script setup lang="ts">
const { colorModeOptions, colorMode, setColorMode } = useTheme()
const { languageOptions, language, setLanguage } = useLanguage()
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
      <div>主题设置</div>
      <radio-group class="w-full flex-y-center gap-[10px]" @change="onThemeChange">
        <label v-for="item in colorModeOptions" :key="item.value">
          <radio :value="item.value" :checked="colorMode === item.value" />
          {{ item.label }}
        </label>
      </radio-group>
    </div>
    <div class="w-full flex-col gap-[10px] rounded-md bg-black/10 p-[10px]">
      <div>主题设置</div>
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
  layout: false
  style:
    navigationStyle: "default"
    navigationBarTitleText: "About"
</route>

<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { resetPersonalColor } from '@/composables/useSurveyStore'

const route = useRoute()

watch(
  () => route.name,
  (name) => {
    if (name === 'survey') {
      resetPersonalColor()
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="app-shell">
    <div class="app-shell__spacer" aria-hidden="true" />
    <div class="app-shell__main">
      <RouterView />
    </div>
    <div class="app-shell__spacer" aria-hidden="true" />
  </div>
</template>

<style lang="scss" scoped>
.app-shell {
  min-height: 100dvh;
  max-width: 480px;
  margin: 0 auto;
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  &__spacer {
    flex: 1 1 0;
    min-height: 0;
  }

  &__main {
    flex: 0 0 auto;
    width: 100%;
  }
}
</style>

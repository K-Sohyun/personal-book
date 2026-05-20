<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goSurvey() {
  router.push({ name: 'survey' })
}
</script>

<template>
  <main class="not-found card">
    <h1 class="not-found__title">페이지를 찾을 수 없어요</h1>
    <p class="not-found__text">주소를 다시 확인하거나 설문부터 시작해 주세요.</p>
    <button type="button" class="not-found__btn" @click="goSurvey">
      설문 시작하기
    </button>
  </main>
</template>

<style lang="scss" scoped>
@use '@/styles/mixins' as *;

.card {
  @include content-card;
  padding: 2rem 1.5rem;
  text-align: center;
}

.not-found {
  &__title {
    margin: 0 0 0.75rem;
    font-size: 1.25rem;
    font-weight: 700;
  }

  &__text {
    margin: 0 0 1.5rem;
    color: var(--color-text-muted);
    line-height: 1.55;
    font-size: 0.95rem;
  }

  &__btn {
    min-height: 48px;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: var(--radius-md);
    font-weight: 600;
    color: var(--color-on-primary);
    background: var(--color-accent);
    @include touch-lift;
  }
}
</style>

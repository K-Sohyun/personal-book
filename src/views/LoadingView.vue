<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import BookshelfLoader from '@/components/BookshelfLoader.vue'
import { useSurveyStore } from '@/composables/useSurveyStore'

const router = useRouter()
const { getResultType } = useSurveyStore()

const LOADING_MS = 2800
let timer: ReturnType<typeof setTimeout>

onMounted(() => {
  const resultType = getResultType()

  timer = setTimeout(() => {
    router.replace({ name: 'result', params: { type: resultType } })
  }, LOADING_MS)
})

onUnmounted(() => clearTimeout(timer))
</script>

<template>
  <main class="loading card">
    <h1 class="loading__title">분석 중입니다.</h1>
    <p class="loading__sub" aria-live="polite">
      당신에게 딱 맞는 책을 찾고 있어요...
    </p>

    <BookshelfLoader />

    <div class="loading__dots" aria-hidden="true">
      <span class="loading__dot" />
      <span class="loading__dot" />
      <span class="loading__dot" />
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use '@/styles/mixins' as *;

.card {
  @include content-card;
  padding: 2rem 1.5rem;
  margin-bottom: 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loading {
  &__title {
    margin: 0 0 0.5rem;
    font-size: 1.35rem;
    font-weight: 700;
  }

  &__sub {
    margin: 0 0 1.5rem;
    color: var(--color-text-muted);
    font-size: 0.95rem;
    line-height: 1.5;
  }

  &__dots {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
  }

  &__dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: linear-gradient(
      135deg,
      var(--color-accent) 0%,
      color-mix(in srgb, var(--personal-color) 80%, var(--color-accent)) 50%,
      var(--color-accent) 100%
    );
    background-size: 200% 200%;
    box-shadow: 0 0 10px color-mix(in srgb, var(--color-accent) 35%, transparent);
    animation: dot-gradient-pulse 1.25s ease-in-out infinite;

    &:nth-child(2) {
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
}

@keyframes dot-gradient-pulse {
  0%,
  100% {
    transform: scale(0.9);
    background-position: 0% 50%;
    opacity: 0.5;
    box-shadow: 0 0 5px color-mix(in srgb, var(--color-accent) 15%, transparent);
  }

  50% {
    transform: scale(1.05);
    background-position: 100% 50%;
    opacity: 0.95;
    box-shadow: 0 0 10px color-mix(in srgb, var(--color-accent) 35%, transparent);
  }
}

@media (prefers-reduced-motion: reduce) {
  .loading__dot {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>

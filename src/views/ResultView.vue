<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import resultsData from '@/data/results.json'
import type { ResultsData } from '@/types'
import { isResultTypeKey } from '@/types'
import BookCard from '@/components/BookCard.vue'
import { useSurveyStore } from '@/composables/useSurveyStore'
import {
  copyResultShareImageToClipboard,
  fetchResultShareImageFile,
} from '@/utils/resultShareImage'

const route = useRoute()
const router = useRouter()
const { reset } = useSurveyStore()
const data = resultsData as ResultsData

const resultKey = computed(() => {
  const key = route.params.type as string
  return key && isResultTypeKey(key) ? key : 'type_A'
})

const resultType = computed(() => data.results[resultKey.value])

const badgeLabel = computed(
  () => resultType.value.badgeLabel ?? '당신의 독서 성향',
)

const YP_BOOKS_HOME = 'https://www.ypbooks.co.kr/'

const headerThemeStyle = computed(() => {
  const theme = resultType.value.color
  return {
    '--result-theme': theme,
    '--result-theme-soft':
      resultKey.value === 'type_B' ? 'var(--color-red-soft)' : theme,
  }
})

const isSharing = ref(false)

const toastMessage = ref('')
let toastTimer: ReturnType<typeof setTimeout> | undefined

function showToast(message: string) {
  if (toastTimer) clearTimeout(toastTimer)
  toastMessage.value = message
  toastTimer = setTimeout(() => {
    toastMessage.value = ''
    toastTimer = undefined
  }, 2600)
}

onUnmounted(() => {
  if (toastTimer) clearTimeout(toastTimer)
})

function restart() {
  reset()
  router.push({ name: 'survey' })
}

function downloadShareImage(file: File) {
  const url = URL.createObjectURL(file)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = file.name
  anchor.click()
  URL.revokeObjectURL(url)
}

async function shareResult() {
  if (isSharing.value) return
  isSharing.value = true

  try {
    await copyResultShareImageToClipboard(resultKey.value)
    showToast('이미지가 복사되었습니다.\n채팅방에 공유해 보세요.')
  } catch {
    try {
      downloadShareImage(await fetchResultShareImageFile(resultKey.value))
      showToast('이미지 복사에 실패해 기기에 저장되었습니다.')
    } catch {
      showToast('공유에 실패했습니다.\n다시 시도해 주세요.')
    }
  } finally {
    isSharing.value = false
  }
}

function goToYpBooks() {
  window.open(YP_BOOKS_HOME, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <main class="result">
    <header
      class="result__header card"
      :style="headerThemeStyle"
    >
      <span class="result__badge">{{ badgeLabel }}</span>
      <h1 class="result__type">
        <span v-if="resultType.icon" class="result__icon" aria-hidden="true">{{
          resultType.icon
        }}</span>
        {{ resultType.title }}
      </h1>
      <div class="result__summary">
        <p class="result__desc">{{ resultType.description }}</p>
        <blockquote v-if="resultType.quote" class="result__quote-block">
          <p class="result__quote">{{ resultType.quote }}</p>
        </blockquote>
      </div>
    </header>

    <section class="result__books card" aria-labelledby="books-heading">
      <h2 id="books-heading" class="result__section-title">추천 도서</h2>
      <p class="result__section-hint">가장 잘 맞는 순서대로 골랐어요</p>
      <ol class="result__book-list">
        <li
          v-for="(book, index) in resultType.books"
          :key="book.id"
          class="result__book-item"
          :style="{ '--stagger': `${index * 0.09}s` }"
        >
          <BookCard :book="book" :rank="index + 1" />
        </li>
      </ol>
    </section>

    <footer class="result__actions">
      <div class="result__cta-row">
        <button
          type="button"
          class="result__btn result__btn--ghost"
          @click="restart"
        >
          다시하기
        </button>
        <button
          type="button"
          class="result__btn result__btn--primary"
          :disabled="isSharing"
          @click="shareResult"
        >
          {{ isSharing ? '준비 중…' : '결과 공유하기' }}
        </button>
      </div>
      <button
        type="button"
        class="result__btn result__btn--red"
        @click="goToYpBooks"
      >
        영풍문고 바로가기
      </button>
    </footer>

    <Teleport to="body">
      <Transition name="result-toast">
        <p
          v-if="toastMessage"
          class="result-toast"
          role="status"
          aria-live="polite"
        >
          {{ toastMessage }}
        </p>
      </Transition>
    </Teleport>
  </main>
</template>

<style lang="scss" scoped>
@use '@/styles/mixins' as *;

.card {
  @include content-card;
}

@keyframes result-fade-up {
  from {
    opacity: 0;
    transform: translateY(16px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.result {
  &__header,
  &__books,
  &__actions {
    animation: result-fade-up 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  &__header {
    border: 1px solid color-mix(in srgb, var(--result-theme) 35%, transparent);
    animation-delay: 0.05s;
  }

  &__books {
    overflow: visible;
    animation-delay: 0.18s;
  }

  &__book-list {
    list-style: none;
    margin: 0;
    padding: 0.125rem 0.125rem 0.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    overflow: visible;
  }

  &__book-item {
    overflow: visible;
    animation: result-fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
    animation-delay: calc(0.28s + var(--stagger, 0s));
  }

  &__badge {
    display: inline-block;
    margin-bottom: 0.75rem;
    padding: 0.35rem 0.75rem;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 600;
    color: color-mix(in srgb, var(--result-theme) 80%, var(--color-text));
    background: color-mix(in srgb, var(--result-theme-soft) 32%, white);
  }

  &__type {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0 0 1rem;
    font-size: 1.65rem;
    line-height: 1.25;
    color: var(--color-text);
  }

  &__icon {
    font-size: 1.5rem;
  }

  &__summary {
    padding-left: 0.75rem;
    border-left: 3px solid var(--result-theme);
  }

  &__desc {
    margin: 0 0 0.75rem;
    line-height: 1.65;
    color: var(--color-text);

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__quote-block {
    margin: 0;
    padding: 0;
    border: none;
  }

  &__quote {
    margin: 0;
    font-style: italic;
    font-size: 0.9rem;
    line-height: 1.55;
    color: var(--color-text-muted);

    &::before {
      content: '— ';
    }
  }

  &__section-title {
    margin: 0 0 0.25rem;
    font-size: 1.05rem;
    font-weight: 700;
  }

  &__section-hint {
    margin: 0 0 1rem;
    font-size: 0.8rem;
    color: var(--color-text-muted);
  }

  &__actions {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
    margin-top: 0.25rem;
    margin-bottom: 0;
    animation-delay: 0.42s;
  }

  &__cta-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.625rem;
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    width: 100%;
    min-height: 48px;
    padding: 0.75rem 1rem;
    border: none;
    border-radius: var(--radius-md);
    font-weight: 600;
    font-size: 0.95rem;
    @include touch-lift;

    &--ghost {
      background: var(--color-surface-elevated);
      border: 1.5px solid var(--color-border-muted);
      color: var(--color-text);
    }

    &--primary {
      background: var(--color-accent);
      color: var(--color-on-primary);
    }

    &--red {
      background: var(--color-red);
      color: var(--color-on-primary);
    }
  }
}

.result-toast {
  position: fixed;
  z-index: 200;
  left: 50%;
  bottom: calc(1.75rem + var(--safe-bottom));
  max-width: min(320px, calc(100vw - 2rem));
  margin: 0;
  padding: 0.85rem 1.25rem;
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.4;
  white-space: pre-line;
  text-align: center;
  color: var(--color-toast-text);
  background: var(--color-toast-bg);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
  transform: translateX(-50%);
  pointer-events: none;
}

.result-toast-enter-active,
.result-toast-leave-active {
  transition:
    opacity 0.28s ease,
    transform 0.28s ease;
}

.result-toast-enter-from,
.result-toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(12px);
}

@media (prefers-reduced-motion: reduce) {
  .result__header,
  .result__books,
  .result__actions,
  .result__book-item {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .result-toast-enter-active,
  .result-toast-leave-active {
    transition: opacity 0.15s ease;
  }

  .result-toast-enter-from,
  .result-toast-leave-to {
    transform: translateX(-50%);
  }
}
</style>

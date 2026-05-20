<script setup lang="ts">
import type { Book } from '@/types'

defineProps<{
  book: Book
  rank: number
}>()
</script>

<template>
  <article
    class="book-card"
    :class="{
      'book-card--top': rank === 1,
    }"
  >
    <div class="book-card__rank" :aria-label="`추천 ${rank}위`">
      <span class="book-card__rank-num">{{ rank }}</span>
      <span class="book-card__rank-unit">위</span>
    </div>

    <div class="book-card__body">
      <div class="book-card__info">
        <h3 class="book-card__title">{{ book.title }}</h3>
        <p class="book-card__author">{{ book.author }}</p>
        <p class="book-card__desc">{{ book.desc }}</p>
      </div>
      <div class="book-card__link-wrap">
        <span v-if="rank === 1" class="book-card__click-hint" aria-hidden="true"
          >Click!</span
        >
        <a
          class="book-card__link"
          :href="book.url"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`${book.title} 영풍문고에서 보기`"
        >
          <span class="book-card__link-icon" aria-hidden="true">🔗</span>
        </a>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.book-card {
  display: grid;
  grid-template-columns: 3.25rem 1fr;
  gap: 0;
  overflow: hidden;
  border-radius: var(--radius-md);
  border: 1px solid color-mix(in srgb, var(--personal-color) 35%, var(--color-border-soft));
  background: var(--color-card-fill);

  &--top {
    border-color: color-mix(in srgb, var(--color-accent) 45%, transparent);
    box-shadow: 0 4px 20px color-mix(in srgb, var(--color-accent) 12%, transparent);

    .book-card__rank {
      background: color-mix(in srgb, var(--color-accent) 18%, white);
    }

    .book-card__rank-num {
      color: var(--color-accent);
    }

    .book-card__link-wrap {
      padding-top: 1.35rem;
    }

    .book-card__link {
      color: var(--color-accent);
      border-color: color-mix(in srgb, var(--color-accent) 40%, transparent);
    }
  }

  &__rank {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.05rem;
    padding: 0.75rem 0.35rem;
    background: color-mix(in srgb, var(--personal-color) 25%, white);
    border-right: 1px solid color-mix(in srgb, var(--personal-color) 40%, var(--color-border-soft));
    border-radius: calc(var(--radius-md) - 1px) 0 0 calc(var(--radius-md) - 1px);
    text-align: center;
  }

  &__rank-num {
    font-size: 1.5rem;
    font-weight: 800;
    line-height: 1;
    font-variant-numeric: tabular-nums;
    color: var(--color-text-subtle);
  }

  &__rank-unit {
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--color-text-muted);
    letter-spacing: 0.04em;
  }

  &__body {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 0.75rem 0.875rem 0.875rem;
    min-width: 0;
    border-radius: 0 calc(var(--radius-md) - 1px) calc(var(--radius-md) - 1px) 0;
  }

  &__info {
    flex: 1;
    min-width: 0;
  }

  &__title {
    margin: 0 0 0.2rem;
    font-size: 1.05rem;
    font-weight: 700;
    line-height: 1.35;
  }

  &__author {
    margin: 0 0 0.35rem;
    font-size: 0.85rem;
    color: var(--color-text-muted);
  }

  &__desc {
    margin: 0;
    font-size: 0.88rem;
    line-height: 1.45;
    color: var(--color-text);
    word-break: keep-all;
  }

  &__link-wrap {
    position: relative;
    flex-shrink: 0;
  }

  &__click-hint {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.8rem;
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0.02em;
    color: var(--color-accent);
    white-space: nowrap;
    pointer-events: none;
    animation: click-hint-bob 2.2s ease-in-out infinite;
  }

  &__link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    border: 1px solid color-mix(in srgb, var(--personal-color) 50%, var(--color-border-muted));
    background: var(--color-surface-opaque);
    color: var(--color-text-muted);
    text-decoration: none;
    transition:
      border-color 0.2s ease,
      transform 0.2s ease,
      box-shadow 0.2s ease;

    @media (hover: hover) {
      &:hover {
        border-color: color-mix(in srgb, var(--color-accent) 55%, var(--color-border-muted));
        transform: translateY(-2px);
        box-shadow: 0 3px 10px color-mix(in srgb, var(--color-accent) 18%, transparent);
      }
    }

    &:active {
      transform: translateY(0);
    }
  }

  &__link-icon {
    font-size: 1rem;
    line-height: 1;
  }
}

@keyframes click-hint-bob {
  0%,
  100% {
    transform: translateX(-50%) translateY(0);
  }

  50% {
    transform: translateX(-50%) translateY(-4px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .book-card__link {
    transition:
      border-color 0.15s ease,
      box-shadow 0.15s ease;
  }

  .book-card__click-hint {
    animation: none;
  }
}
</style>

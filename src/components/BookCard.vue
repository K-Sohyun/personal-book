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
  </article>
</template>

<style lang="scss" scoped>
@use '@/styles/mixins' as *;

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
    text-align: center;
  }

  &__rank-num {
    font-size: 1.5rem;
    font-weight: 800;
    line-height: 1;
    font-variant-numeric: tabular-nums;
    color: #5a6b62;
  }

  &__rank-unit {
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--color-text-muted);
    letter-spacing: 0.04em;
  }

  &__body {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 0.875rem 0.75rem 0.875rem 0.875rem;
    min-width: 0;
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

  &__link {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    margin-top: 0.1rem;
    border-radius: 50%;
    border: 1px solid color-mix(in srgb, var(--personal-color) 50%, var(--color-border-muted));
    background: var(--color-surface-opaque);
    color: var(--color-text-muted);
    text-decoration: none;
    @include touch-lift;
  }

  &__link-icon {
    font-size: 1rem;
    line-height: 1;
  }
}
</style>

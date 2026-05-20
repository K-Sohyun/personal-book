<template>
  <div class="book-loader" aria-hidden="true">
    <span
      v-for="sparkle in sparkles"
      :key="sparkle.id"
      :class="['book-loader__sparkle', sparkle.size === 'lg' && 'book-loader__sparkle--lg']"
      :style="{
        top: sparkle.top,
        left: sparkle.left,
        '--sparkle-delay': sparkle.delay,
        '--sparkle-duration': sparkle.duration,
      }"
    />

    <div class="book-loader__motion">
      <div class="book-loader__glow" />
      <div class="book-loader__open">
        <div class="book-loader__side book-loader__side--left">
          <div class="book-loader__board">
            <div class="book-loader__leaf">
              <span class="book-loader__leaf-under" aria-hidden="true" />
              <span class="book-loader__leaf-crease" aria-hidden="true" />
              <span class="book-loader__leaf-stack" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div class="book-loader__spine" aria-hidden="true">
          <span class="book-loader__spine-shade" />
          <span class="book-loader__spine-line" />
        </div>

        <div class="book-loader__side book-loader__side--right">
          <div class="book-loader__board">
            <div class="book-loader__leaf book-loader__leaf--right">
              <span class="book-loader__leaf-under" aria-hidden="true" />
              <span class="book-loader__leaf-crease" aria-hidden="true" />
              <span class="book-loader__leaf-stack" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const sparkles = [
  { id: 1, top: '14%', left: '20%', delay: '0s', duration: '2.1s', size: 'lg' as const },
  { id: 2, top: '10%', left: '78%', delay: '0.4s', duration: '2.4s' },
  { id: 3, top: '78%', left: '18%', delay: '0.85s', duration: '2.6s', size: 'lg' as const },
  { id: 4, top: '76%', left: '80%', delay: '0.25s', duration: '2.2s' },
  { id: 5, top: '40%', left: '8%', delay: '0.55s', duration: '2.5s' },
  { id: 6, top: '42%', left: '90%', delay: '0.7s', duration: '2.3s' },
]
</script>

<style lang="scss" scoped>
@mixin leaf-lines {
  &::after {
    content: '';
    position: absolute;
    top: 14px;
    left: 8px;
    right: 8px;
    height: 1px;
    background: color-mix(in srgb, var(--personal-color) 42%, #d0dad0);
    box-shadow:
      0 10px 0 color-mix(in srgb, var(--personal-color) 36%, #d8e2d8),
      0 20px 0 color-mix(in srgb, var(--personal-color) 30%, #e0eae0),
      0 30px 0 color-mix(in srgb, var(--personal-color) 24%, #e8efe8);
  }
}

.book-loader {
  --sparkle-core: #fffef0;
  --sparkle-mid: #ffe566;
  --sparkle-edge: #f0b429;
  --sparkle-glow: rgba(255, 210, 80, 0.65);

  position: relative;
  width: min(176px, 72vw);
  height: 118px;
  margin: 0 auto 1.75rem;

  &__sparkle {
    position: absolute;
    z-index: 2;
    width: 4px;
    height: 4px;
    pointer-events: none;
    animation: sparkle-soft var(--sparkle-duration, 2.2s) ease-in-out infinite;
    animation-delay: var(--sparkle-delay, 0s);

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      background: linear-gradient(
        180deg,
        transparent,
        var(--sparkle-mid) 45%,
        var(--sparkle-edge) 55%,
        transparent
      );
      border-radius: 1px;
      opacity: 0.85;
    }

    &::before {
      width: 1px;
      height: 140%;
      transform: translate(-50%, -50%);
    }

    &::after {
      width: 140%;
      height: 1px;
      transform: translate(-50%, -50%) rotate(90deg);
    }

    border-radius: 50%;
    background: radial-gradient(
      circle,
      var(--sparkle-core) 0%,
      var(--sparkle-mid) 42%,
      var(--sparkle-edge) 100%
    );
    box-shadow:
      0 0 4px var(--sparkle-glow),
      0 0 10px color-mix(in srgb, var(--sparkle-edge) 45%, transparent);

    &--lg {
      width: 5px;
      height: 5px;

      &::before {
        height: 160%;
      }

      &::after {
        width: 160%;
      }

      box-shadow:
        0 0 5px var(--sparkle-glow),
        0 0 14px color-mix(in srgb, var(--sparkle-edge) 50%, transparent);
    }
  }

  &__motion {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    isolation: isolate;
    transform-origin: center center;
    animation: book-sway 3.4s ease-in-out infinite;
  }

  &__glow {
    position: absolute;
    z-index: 0;
    top: 54%;
    left: 50%;
    width: 108px;
    height: 56px;
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    background: radial-gradient(
      ellipse 80% 70% at 50% 50%,
      color-mix(in srgb, var(--color-accent) 22%, transparent) 0%,
      color-mix(in srgb, var(--sparkle-mid) 8%, transparent) 40%,
      transparent 70%
    );
    filter: blur(5px);
    opacity: 0.75;
    animation: glow-pulse 3.4s ease-in-out infinite;
  }

  &__open {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 118px;
    height: 70px;
    perspective: 280px;
    transform-style: preserve-3d;
    transform: rotateX(18deg) translateZ(0);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;

    &::before {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 12%;
      right: 12%;
      height: 10px;
      background: radial-gradient(
        ellipse 70% 100% at 50% 0%,
        rgba(0, 0, 0, 0.1) 0%,
        transparent 72%
      );
      pointer-events: none;
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      z-index: -1;
      border-radius: 8px;
      pointer-events: none;
      background: transparent;
      box-shadow:
        0 14px 22px color-mix(in srgb, var(--color-accent) 18%, transparent),
        0 4px 8px rgba(0, 0, 0, 0.08);
      transform: translateZ(-1px);
    }
  }

  &__side {
    position: relative;
    flex: 1;
    min-width: 0;
    height: 100%;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;

    &--left {
      transform: rotateY(32deg) translateZ(0);
      transform-origin: 100% 50%;
    }

    &--right {
      transform: rotateY(-32deg) translateZ(0);
      transform-origin: 0% 50%;
    }
  }

  &__board {
    position: relative;
    height: 100%;
    padding: 5px;
    border-radius: 8px;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.25),
      inset 0 -2px 4px rgba(0, 0, 0, 0.06);
  }

  &__side--left &__board {
    padding: 6px 4px 6px 8px;
    border-radius: 10px 2px 4px 10px;
    background: linear-gradient(
      168deg,
      color-mix(in srgb, var(--color-accent) 48%, var(--color-accent-strong)) 0%,
      color-mix(in srgb, var(--color-accent) 62%, var(--color-accent-strong)) 55%,
      color-mix(in srgb, var(--color-accent-strong) 88%, #1a3d2e) 100%
    );

    &::before {
      content: '';
      position: absolute;
      left: 2px;
      top: 8%;
      bottom: 8%;
      width: 3px;
      border-radius: 2px 0 0 2px;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.15),
        rgba(0, 0, 0, 0.12)
      );
    }
  }

  &__side--right &__board {
    padding: 6px 8px 6px 4px;
    border-radius: 2px 10px 10px 4px;
    background: linear-gradient(
      192deg,
      color-mix(in srgb, var(--color-accent) 90%, white) 0%,
      color-mix(in srgb, var(--color-accent) 72%, var(--color-accent-strong)) 50%,
      color-mix(in srgb, var(--color-accent) 55%, var(--color-accent-strong)) 100%
    );

    &::before {
      content: '';
      position: absolute;
      right: 2px;
      top: 8%;
      bottom: 8%;
      width: 3px;
      border-radius: 0 2px 2px 0;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.28),
        rgba(0, 0, 0, 0.08)
      );
    }
  }

  &__spine {
    position: relative;
    z-index: 2;
    flex-shrink: 0;
    align-self: stretch;
    width: 6px;
    margin: 4px -1px;
    border-radius: 3px;
    background: linear-gradient(
      90deg,
      color-mix(in srgb, var(--color-accent) 40%, #152820) 0%,
      color-mix(in srgb, var(--color-accent) 65%, #1a3024) 35%,
      color-mix(in srgb, var(--color-accent) 55%, #14241c) 65%,
      color-mix(in srgb, var(--color-accent) 42%, #152820) 100%
    );
    box-shadow:
      -2px 0 3px rgba(0, 0, 0, 0.12),
      2px 0 2px rgba(255, 255, 255, 0.12);
    transform: translateZ(2px);
  }

  &__spine-shade {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.12) 0%,
      transparent 18%,
      transparent 82%,
      rgba(0, 0, 0, 0.1) 100%
    );
  }

  &__spine-line {
    position: absolute;
    left: 50%;
    top: 10%;
    bottom: 10%;
    width: 1px;
    margin-left: -0.5px;
    background: rgba(255, 255, 255, 0.18);
  }

  &__leaf {
    position: relative;
    z-index: 1;
    height: 100%;
    min-height: 54px;
    overflow: hidden;
    border-radius: 2px 6px 8px 2px;
    background: linear-gradient(
      95deg,
      #f0f4f0 0%,
      #fff 12%,
      #fafcfa 50%,
      #f6faf6 100%
    );
    box-shadow:
      inset 0 0 0 1px rgba(0, 0, 0, 0.04),
      0 1px 2px rgba(0, 0, 0, 0.05);
    @include leaf-lines;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 18%;
      height: 100%;
      border-radius: 0 6px 6px 0;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(0, 0, 0, 0.03) 100%
      );
      pointer-events: none;
    }
  }

  &__side--left &__leaf {
    border-radius: 2px 7px 9px 2px;
    clip-path: polygon(0 0, 100% 2%, 100% 98%, 0 100%);
    box-shadow:
      inset -8px 0 12px rgba(0, 0, 0, 0.07),
      inset 0 0 0 1px rgba(0, 0, 0, 0.04),
      -1px 0 0 #f2f6f2,
      -2px 0 0 #e8eee8;

    &::before {
      right: auto;
      left: 0;
      width: 22%;
      border-radius: 2px 0 0 2px;
      background: linear-gradient(
        270deg,
        transparent 0%,
        rgba(0, 0, 0, 0.08) 100%
      );
    }
  }

  &__leaf--right {
    border-radius: 7px 2px 2px 9px;
    clip-path: polygon(0 2%, 100% 0, 100% 100%, 0 98%);
    box-shadow:
      inset 8px 0 12px rgba(0, 0, 0, 0.07),
      inset 0 0 0 1px rgba(0, 0, 0, 0.04),
      1px 0 0 #f2f6f2,
      2px 0 0 #e8eee8;

    &::before {
      right: 0;
      left: auto;
      width: 22%;
      border-radius: 0 2px 2px 0;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(0, 0, 0, 0.08) 100%
      );
    }
  }

  &__leaf-under {
    position: absolute;
    z-index: -1;
    top: 3px;
    bottom: 3px;
    width: 88%;
    border-radius: inherit;
    background: linear-gradient(180deg, #f6faf6, #eef4ee);
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.03);
    pointer-events: none;
  }

  &__side--left &__leaf-under {
    right: 2px;
    border-radius: 1px 5px 6px 1px;
    transform: rotate(-0.6deg);
  }

  &__leaf--right &__leaf-under {
    left: 2px;
    border-radius: 5px 1px 1px 6px;
    transform: rotate(0.6deg);
  }

  &__leaf-crease {
    position: absolute;
    top: 6%;
    bottom: 6%;
    width: 3px;
    pointer-events: none;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.06) 0%,
      rgba(0, 0, 0, 0.1) 50%,
      rgba(0, 0, 0, 0.06) 100%
    );
  }

  &__side--left &__leaf-crease {
    right: 0;
    border-radius: 2px 0 0 2px;
    box-shadow: 1px 0 0 rgba(255, 255, 255, 0.5);
  }

  &__leaf--right &__leaf-crease {
    left: 0;
    border-radius: 0 2px 2px 0;
    box-shadow: -1px 0 0 rgba(255, 255, 255, 0.5);
  }

  &__leaf-stack {
    position: absolute;
    inset: 3px 5px 3px 4px;
    border-radius: inherit;
    border: 1px solid rgba(0, 0, 0, 0.03);
    box-shadow:
      inset 0 0 0 1px rgba(255, 255, 255, 0.6),
      inset 0 -12px 0 -10px rgba(0, 0, 0, 0.02);
    opacity: 0.32;
    pointer-events: none;
  }

  &__leaf--right &__leaf-stack {
    inset: 3px 4px 3px 5px;
  }
}

@keyframes book-sway {
  0%,
  100% {
    transform: translate3d(0, 0, 0) rotate(-5deg);
  }

  50% {
    transform: translate3d(0, -8px, 0) rotate(5deg);
  }
}

@keyframes glow-pulse {
  0%,
  100% {
    opacity: 0.75;
    transform: scale(0.96);
  }

  50% {
    opacity: 1;
    transform: scale(1.04);
  }
}

@keyframes sparkle-soft {
  0%,
  100% {
    opacity: 0.2;
    transform: scale(0.65) rotate(0deg);
  }

  50% {
    opacity: 0.95;
    transform: scale(1.1) rotate(18deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .book-loader__motion,
  .book-loader__sparkle,
  .book-loader__glow {
    animation: none;
  }
}
</style>

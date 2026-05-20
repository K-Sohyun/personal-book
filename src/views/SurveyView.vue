<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { surveyQuestions } from '@/data/surveyQuestions'
import { surveyMeta } from '@/data/surveyMeta'
import { useSurveyStore } from '@/composables/useSurveyStore'

const router = useRouter()
const {
  answers,
  setAnswer,
  getAnswer,
  calculateResultType,
  saveResultType,
  isComplete,
} = useSurveyStore()

function getInitialStep() {
  const idx = surveyQuestions.findIndex((q) => !answers.value[q.id])
  return idx === -1 ? surveyQuestions.length - 1 : idx
}

const currentStep = ref(getInitialStep())
const selectedChoiceId = ref<string | null>(null)

const totalSteps = surveyQuestions.length
const currentQuestion = computed(() => surveyQuestions[currentStep.value])
const progressValue = computed(() => currentStep.value + 1)
const isLastStep = computed(() => currentStep.value === totalSteps - 1)
const canGoPrev = computed(() => currentStep.value > 0)
const canGoNext = computed(() => selectedChoiceId.value !== null)

watch(
  currentStep,
  () => {
    selectedChoiceId.value = getAnswer(currentQuestion.value.id)
  },
  { immediate: true },
)

function selectChoice(choiceId: string) {
  selectedChoiceId.value = choiceId
  setAnswer(currentQuestion.value.id, choiceId)
}

function goNext() {
  if (!selectedChoiceId.value) return

  if (!isLastStep.value) {
    currentStep.value += 1
    return
  }

  if (!isComplete()) return

  const resultType = calculateResultType()
  saveResultType(resultType)
  router.push({ name: 'loading' })
}

function goPrev() {
  if (currentStep.value > 0) {
    currentStep.value -= 1
  }
}
</script>

<template>
  <main class="survey card">
    <header class="survey__header">
      <div class="survey__header-row">
        <h1 class="survey__title">{{ surveyMeta.title }}</h1>
        <span class="survey__step" aria-current="step">
          {{ progressValue }} / {{ totalSteps }}
        </span>
      </div>
      <p class="survey__subtitle">{{ surveyMeta.subtitle }}</p>

      <label class="sr-only" for="survey-progress">진행률</label>
      <progress
        id="survey-progress"
        class="survey__progress"
        :value="progressValue"
        :max="totalSteps"
        aria-valuemin="1"
        :aria-valuenow="progressValue"
        :aria-valuemax="totalSteps"
      />
    </header>

    <section class="survey__body" aria-live="polite">
      <Transition name="survey-slide" mode="out-in">
        <article :key="currentQuestion.id" class="survey__question">
          <h2 class="survey__question-text">{{ currentQuestion.question }}</h2>
          <ul class="survey__choices">
            <li v-for="choice in currentQuestion.choices" :key="choice.id">
              <button
                type="button"
                class="survey__choice-btn"
                :class="{
                  'survey__choice-btn--selected':
                    selectedChoiceId === choice.id,
                }"
                :aria-pressed="selectedChoiceId === choice.id"
                @click="selectChoice(choice.id)"
              >
                <span class="survey__choice-label">{{ choice.label }}</span>
              </button>
            </li>
          </ul>
        </article>
      </Transition>
    </section>

    <footer class="survey__footer">
      <div class="survey__cta-row">
        <button
          type="button"
          class="survey__cta survey__cta--prev"
          :disabled="!canGoPrev"
          @click="goPrev"
        >
          이전
        </button>
        <button
          v-if="!isLastStep"
          type="button"
          class="survey__cta survey__cta--next"
          :disabled="!canGoNext"
          @click="goNext"
        >
          다음
        </button>
        <button
          v-else
          type="button"
          class="survey__cta survey__cta--submit"
          :disabled="!canGoNext"
          @click="goNext"
        >
          결과 보기
        </button>
      </div>
    </footer>
  </main>
</template>

<style lang="scss" scoped>
@use '@/styles/mixins' as *;

.card {
  @include content-card;
  padding: 1.5rem 1.25rem;
}

.survey {
  &__header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
  }

  &__title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text);
  }

  &__subtitle {
    margin: 0 0 0.75rem;
    font-size: 0.85rem;
    line-height: 1.45;
    color: var(--color-text-muted);
  }

  &__step {
    font-size: 0.9rem;
    color: var(--color-text-muted);
    font-variant-numeric: tabular-nums;
  }

  &__progress {
    width: 100%;
    height: 6px;
    border: none;
    border-radius: 999px;
    overflow: hidden;
    accent-color: var(--color-accent);

    &::-webkit-progress-bar {
      background: color-mix(in srgb, var(--color-accent) 22%, white);
      border-radius: 999px;
    }

    &::-webkit-progress-value {
      background: var(--color-accent);
      border-radius: 999px;
      transition: width 0.35s ease;
    }

    &::-moz-progress-bar {
      background: var(--color-accent);
      border-radius: 999px;
    }
  }

  &__question-text {
    margin: 1rem 0 1rem;
    font-size: 1.125rem;
    line-height: 1.5;
    font-weight: 600;
    color: var(--color-text);
    -webkit-text-fill-color: var(--color-text);
  }

  &__choices {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }

  &__choice-btn {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 48px;
    padding: 0.875rem 1rem;
    border: 1px solid color-mix(in srgb, var(--personal-color) 35%, transparent);
    border-radius: var(--radius-md);
    background: color-mix(in srgb, var(--color-surface-elevated) 95%, transparent);
    color: var(--color-text);
    -webkit-text-fill-color: currentColor;
    text-align: left;
    @include touch-lift;

    &--selected {
      border-color: color-mix(in srgb, var(--personal-color) 70%, var(--color-border-muted));
      background: color-mix(in srgb, var(--personal-color) 28%, white);
      box-shadow: 0 2px 12px color-mix(in srgb, var(--personal-color) 20%, transparent);
    }
  }

  &__choice-label {
    line-height: 1.45;
  }

  &__footer {
    margin-top: 1.5rem;
  }

  &__cta {
    width: 100%;
    min-height: 48px;
    padding: 0.875rem 1.25rem;
    border: none;
    border-radius: var(--radius-md);
    font-weight: 600;
    @include touch-lift;

    &:disabled {
      opacity: 0.45;
      cursor: not-allowed;
      transform: none;
    }

    &--next,
    &--submit {
      background: var(--color-accent);
      color: var(--color-on-primary);
      -webkit-text-fill-color: currentColor;
    }

    &--prev {
      background: var(--color-surface-elevated);
      border: 1.5px solid var(--color-border-muted);
      color: var(--color-text);
    }
  }

  &__cta-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.625rem;

    .survey__cta {
      width: auto;
    }
  }
}

.survey-slide-enter-active,
.survey-slide-leave-active {
  transition:
    opacity 0.28s ease,
    transform 0.28s ease;
}

.survey-slide-enter-from {
  opacity: 0;
  transform: translateX(16px);
}

.survey-slide-leave-to {
  opacity: 0;
  transform: translateX(-16px);
}

@media (prefers-reduced-motion: reduce) {
  .survey-slide-enter-active,
  .survey-slide-leave-active {
    transition: opacity 0.15s ease;
  }

  .survey-slide-enter-from,
  .survey-slide-leave-to {
    transform: none;
  }
}
</style>

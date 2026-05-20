import { ref } from 'vue'
import { surveyQuestions } from '@/data/surveyQuestions'
import type { ResultTypeKey } from '@/types'
import { isResultTypeKey } from '@/types'

const ANSWERS_KEY = 'personal-book-answers'
const RESULT_KEY = 'personal-book-result-type'

const answers = ref<Record<number, string>>({})

function loadAnswers() {
  try {
    const raw = sessionStorage.getItem(ANSWERS_KEY)
    answers.value = raw ? (JSON.parse(raw) as Record<number, string>) : {}
  } catch {
    answers.value = {}
  }
}

function saveAnswers() {
  sessionStorage.setItem(ANSWERS_KEY, JSON.stringify(answers.value))
}

export function useSurveyStore() {
  if (Object.keys(answers.value).length === 0) {
    loadAnswers()
  }

  function setAnswer(questionId: number, choiceId: string) {
    answers.value = { ...answers.value, [questionId]: choiceId }
    saveAnswers()
  }

  function getAnswer(questionId: number) {
    return answers.value[questionId] ?? null
  }

  function calculateResultType(): ResultTypeKey {
    const scores: Partial<Record<ResultTypeKey, number>> = {}

    for (const question of surveyQuestions) {
      const choiceId = answers.value[question.id]
      if (!choiceId) continue

      const choice = question.choices.find((c) => c.id === choiceId)
      const key = choice?.resultKey ?? 'type_A'
      scores[key] = (scores[key] ?? 0) + 1
    }

    const entries = Object.entries(scores) as [ResultTypeKey, number][]
    if (entries.length === 0) return 'type_A'

    /** 동점 시: 사색(A) > 지적 탐구(D) > 공감(C) > 스토리 탐험(B) */
    const tiePriority: ResultTypeKey[] = ['type_A', 'type_D', 'type_C', 'type_B']
    entries.sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1]
      return tiePriority.indexOf(a[0]) - tiePriority.indexOf(b[0])
    })
    return entries[0][0]
  }

  function saveResultType(type: ResultTypeKey) {
    sessionStorage.setItem(RESULT_KEY, type)
  }

  function getResultType(): ResultTypeKey {
    const stored = sessionStorage.getItem(RESULT_KEY)
    return stored && isResultTypeKey(stored) ? stored : 'type_A'
  }

  function reset() {
    answers.value = {}
    sessionStorage.removeItem(ANSWERS_KEY)
    sessionStorage.removeItem(RESULT_KEY)
  }

  function isComplete() {
    return surveyQuestions.every((q) => answers.value[q.id])
  }

  return {
    answers,
    setAnswer,
    getAnswer,
    calculateResultType,
    saveResultType,
    getResultType,
    reset,
    isComplete,
  }
}

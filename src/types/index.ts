/** 추천 도서 한 권 */
export interface Book {
  id: number
  title: string
  author: string
  desc: string
  url: string
}

export type ResultTypeKey = 'type_A' | 'type_B' | 'type_C' | 'type_D'

export const RESULT_TYPE_KEYS: ResultTypeKey[] = [
  'type_A',
  'type_B',
  'type_C',
  'type_D',
]

export function isResultTypeKey(key: string): key is ResultTypeKey {
  return RESULT_TYPE_KEYS.includes(key as ResultTypeKey)
}

/** 진단 결과 유형 (성향) */
export interface ResultType {
  title: string
  color: string
  icon?: string
  badgeLabel?: string
  description: string
  quote?: string
  books: Book[]
}

/** results.json 루트 구조 */
export interface ResultsData {
  results: Record<ResultTypeKey, ResultType>
}

/** 설문 질문 */
export interface SurveyQuestion {
  id: number
  question: string
  choices: SurveyChoice[]
}

export interface SurveyChoice {
  id: string
  label: string
  resultKey: ResultTypeKey
}

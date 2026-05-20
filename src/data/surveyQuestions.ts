import type { SurveyQuestion } from '@/types'

/** 5문항 독서 성향 진단 */
export const surveyQuestions: SurveyQuestion[] = [
  {
    id: 1,
    question: '요즘 당신의 마음에 가장 가까운 감정은?',
    choices: [
      { id: '1a', label: '고요하고 사색적인 기분', resultKey: 'type_A' },
      { id: '1b', label: '설레고 활기찬 기분', resultKey: 'type_B' },
      { id: '1c', label: '조금 지치고 공허한 기분', resultKey: 'type_C' },
      { id: '1d', label: '단조롭지만 평온한 기분', resultKey: 'type_A' },
    ],
  },
  {
    id: 2,
    question: '쉬는 날, 가장 하고 싶은 것은?',
    choices: [
      { id: '2a', label: '조용한 카페에서 책 읽기', resultKey: 'type_A' },
      { id: '2b', label: '새로운 곳을 탐험하기', resultKey: 'type_B' },
      { id: '2c', label: '집에서 영화나 음악 감상', resultKey: 'type_C' },
      { id: '2d', label: '좋아하는 사람과 산책하기', resultKey: 'type_C' },
    ],
  },
  {
    id: 3,
    question: '책을 고를 때 가장 중요하게 생각하는 것은?',
    choices: [
      { id: '3a', label: '깊은 메시지와 여운', resultKey: 'type_A' },
      { id: '3b', label: '빠른 전개와 몰입감', resultKey: 'type_B' },
      { id: '3c', label: '위로와 공감', resultKey: 'type_C' },
      { id: '3d', label: '새로운 시작과 원동력', resultKey: 'type_B' },
    ],
  },
  {
    id: 4,
    question: '지금 당신에게 필요한 것은?',
    choices: [
      { id: '4a', label: '나를 돌아보는 시간', resultKey: 'type_A' },
      { id: '4b', label: '도전을 향한 에너지', resultKey: 'type_B' },
      { id: '4c', label: '따뜻한 위로', resultKey: 'type_C' },
      { id: '4d', label: '작은 변화의 시작', resultKey: 'type_C' },
    ],
  },
  {
    id: 5,
    question: '오늘 밤, 어떤 이야기가 듣고 싶나요?',
    choices: [
      {
        id: '5a',
        label: '인생에 대한 질문을 던지는 이야기',
        resultKey: 'type_A',
      },
      { id: '5b', label: '용기를 주는 이야기', resultKey: 'type_B' },
      { id: '5c', label: '마음을 어루만지는 이야기', resultKey: 'type_C' },
      { id: '5d', label: '유쾌하게 웃게 하는 이야기', resultKey: 'type_B' },
    ],
  },
]

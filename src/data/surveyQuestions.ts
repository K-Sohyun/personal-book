import type { SurveyQuestion } from '@/types'

export const surveyQuestions: SurveyQuestion[] = [
  {
    id: 1,
    question: '집에 가는 길, 내 마음에 가장 가까운 생각은?',
    choices: [
      { id: '1a', label: '혼자 조용히 생각 정리 좀 하고 싶다', resultKey: 'type_A' },
      { id: '1b', label: '재밌는 거 없을까? 도파민이 필요하다', resultKey: 'type_B' },
      { id: '1c', label: '오늘 하루도 참 고됐다... 위로받고 싶다', resultKey: 'type_C' },
      { id: '1d', label: '요즘 유행하는 그거, 뭔지 좀 찾아볼까?', resultKey: 'type_D' },
    ],
  },
  {
    id: 2,
    question: '이번 주말, 내가 가장 가고 싶은 곳은?',
    choices: [
      { id: '2a', label: '나만 아는 조용하고 고즈넉한 서점', resultKey: 'type_A' },
      { id: '2b', label: '사람 많고 핫한 팝업스토어나 페스티벌', resultKey: 'type_B' },
      { id: '2c', label: '따뜻한 햇살이 드는 단골 카페나 내 방 침대', resultKey: 'type_C' },
      { id: '2d', label: '유튜브에서 본 신기하고 흥미로운 장소', resultKey: 'type_D' },
    ],
  },
  {
    id: 3,
    question: '서점에서 책을 고를 때, 내 손이 먼저 가는 것은?',
    choices: [
      { id: '3a', label: '밑줄 긋고 오래 읽게 되는 깊이 있는 문장', resultKey: 'type_A' },
      { id: '3b', label: '스토리가 쫄깃해서 밤새 읽게 되는 소설', resultKey: 'type_B' },
      { id: '3c', label: '내 마음을 토닥여주는 다정한 글귀', resultKey: 'type_C' },
      { id: '3d', label: '어? 이런 것도 있어? 호기심을 자극하는 제목', resultKey: 'type_D' },
    ],
  },
  {
    id: 4,
    question: '지금 나를 충전하기 위해 가장 필요한 것은?',
    choices: [
      { id: '4a', label: '아무에게도 방해받지 않는 혼자만의 시간', resultKey: 'type_A' },
      { id: '4b', label: '지루함을 한 방에 날려줄 짜릿한 재미', resultKey: 'type_B' },
      { id: '4c', label: '내 편이 되어주는 사람과의 따뜻한 대화', resultKey: 'type_C' },
      { id: '4d', label: '뇌를 깨워줄 새롭고 신선한 지식', resultKey: 'type_D' },
    ],
  },
  {
    id: 5,
    question: '오늘 밤, 잠들기 전에 읽고 싶은 이야기는?',
    choices: [
      { id: '5a', label: '인생에 대해 곰곰이 생각해보게 만드는 스토리', resultKey: 'type_A' },
      { id: '5b', label: '새로운 세계관 속으로 빠져드는 숨 막히는 스토리', resultKey: 'type_B' },
      { id: '5c', label: '지친 하루의 끝을 포근하게 안아주는 힐링 스토리', resultKey: 'type_C' },
      { id: '5d', label: '흥미로운 상식이나 트렌드를 다룬 스토리', resultKey: 'type_D' },
    ],
  },
]

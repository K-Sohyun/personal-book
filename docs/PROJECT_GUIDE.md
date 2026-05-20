# PROJECT_GUIDE — 퍼스널 북

> **유지보수:** 이 문서는 실제 코드·데이터와 항상 맞춰 둡니다.  
> 화면·스타일·설문·결과·라우팅을 바꿀 때는 구현과 함께 이 파일도 수정하세요.

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 이름 | 퍼스널 북 (Personal Book) |
| 목적 | 5문항 심리 설문 → 독서 성향 3타입 → 영풍문고 추천 도서 3권 |
| 클라이언트 | 모바일 웹 (max-width 480px, 세로 중앙 레이아웃) |
| 백엔드 | 없음 (정적 JSON + `sessionStorage`) |
| 브랜드 | 영풍문고 (`https://www.ypbooks.co.kr/`) |

### 스택

- Vue 3 (`<script setup>`, Composition API)
- TypeScript
- SCSS (`src/styles/`)
- Vue Router
- Vite

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

---

## 2. 사용자 플로우

```
/  → redirect /survey
/survey  → 5문항 (선택 필수, CTA로만 이동)
/loading → ~2.8초 후 결과 (sessionStorage에 결과 타입 필요)
/result/:type? → 성향 카드 + 추천 도서 + CTA (URL 공유 가능)
「다시하기」→ session 초기화 + /survey
「결과 공유하기」→ 현재 결과 URL 클립보드 복사
「영풍문고 바로가기」→ ypbooks.co.kr 새 탭
```

### 라우팅 (`src/router/index.ts`)

| 경로 | name | 컴포넌트 | document.title |
|------|------|----------|----------------|
| `/` | — | → `/survey` | — |
| `/survey` | `survey` | `SurveyView.vue` | 마음 독서 진단 \| 퍼스널 북 |
| `/loading` | `loading` | `LoadingView.vue` | 분석 중 \| 퍼스널 북 |
| `/result/:type?` | `result` | `ResultView.vue` | 나의 퍼스널 북 \| 퍼스널 북 |
| `/*` (404) | `not-found` | `NotFoundView.vue` | 페이지를 찾을 수 없음 \| 퍼스널 북 |

- `/loading` 직접 접근 시 `personal-book-result-type` 이 없으면 `/survey` 로 리다이렉트
- `/result/:type` — 잘못된 type 은 `type_A` 폴백; **공유 링크용 직접 진입 허용**
- 알 수 없는 경로 → 404 뷰

---

## 3. 폴더 구조

```
public/fonts/              Pretendard woff2 (로컬)
src/
├── App.vue                480px 셸, 설문 시 --personal-color 리셋
├── main.ts                global.scss 로드
├── components/
│   ├── BookCard.vue       순위 + 도서 정보 + 🔗 링크
│   └── BookshelfLoader.vue  로딩 3D 북셸프
├── composables/
│   └── useSurveyStore.ts  답변·점수·sessionStorage
├── data/
│   ├── surveyMeta.ts      설문 타이틀·부제
│   ├── surveyQuestions.ts 5문항 × 4선택지
│   └── results.json       3타입 결과·도서
├── router/index.ts
├── styles/
│   ├── _variables.scss    CSS 변수 (디자인 토큰)
│   ├── _fonts.scss        Pretendard @font-face
│   ├── _mixins.scss       glass-panel, content-card, touch-lift
│   └── global.scss
├── types/index.ts
└── views/
    ├── SurveyView.vue
    ├── LoadingView.vue
    ├── ResultView.vue
    └── NotFoundView.vue
```

---

## 4. 설문 · 결과 산출

### 3가지 독서 성향

| 키 | 이름 | 테마 색 (`results.json`) |
|----|------|---------------------------|
| `type_A` | 사색하는 독서가 | `#2b4167` (네이비) |
| `type_B` | 열정적인 행동가 | `#DF0000` (브랜드 레드) |
| `type_C` | 따뜻한 공감가 | `#5a7d6a` (초록) |

### 점수 규칙 (`useSurveyStore.calculateResultType`)

1. 각 문항 선택지의 `resultKey` 에 +1
2. 최고 점수 타입이 결과
3. **동점:** `type_A` → `type_C` → `type_B`

### sessionStorage 키

| 키 | 용도 |
|----|------|
| `personal-book-answers` | `{ questionId: choiceId }` JSON |
| `personal-book-result-type` | `type_A` \| `type_B` \| `type_C` |

### 설문 UI (`SurveyView`)

- 카피: `surveyMeta` — **마음 독서 진단** / 부제
- 진행: `n/5` + `<progress>` (`accent-color: --color-accent`)
- 4선택지 (블릿 없음), 선택 시 `--personal-color` 배경·테두리 살짝 강조, **선택 후에만** 다음/결과 보기 활성
- 모든 단계: **이전 | 다음** (1단계 이전 disabled)
- 5단계: **이전 | 결과 보기**
- 미답 문항이 있으면 해당 단계부터 재개 (`loadAnswers` + `getInitialStep`)
- 문항 전환: `survey-slide` 트랜지션

---

## 5. 화면별 명세

### LoadingView

- 문구: **분석 중입니다.** / *당신에게 딱 맞는 책을 찾고 있어요...*
- `BookshelfLoader` (중앙): 정적 펼친 책(좌·우 표지+흰 페이지) · 좌우 기울임+떠다님 · 스파클 6개 (CSS only)
- 하단: 그라데이션 **펄스 도트** 3개
- `LOADING_MS = 2800` 후 `router.replace` → `/result/:type`
- `prefers-reduced-motion`: 로더·도트 애니메이션 off

### ResultView

- 진입 시 순차 페이드·슬라이드 업 (헤더 → 도서 목록 → CTA, 도서 카드 스태거)
- `prefers-reduced-motion`: 애니메이션 off

**상단 카드** (`result.color` → 로컬 CSS `--result-theme` 만 적용, 전역 `--personal-color` 는 변경하지 않음)

- pill 배지 (`badgeLabel`, 기본: 당신의 독서 성향)
- 이모지 `icon` + `title`
- `description` (본문) + `quote` (`<blockquote>` 인용만, 앞에 `— ` 자동)

**추천 도서**

- `BookCard`: 왼쪽 순위(1위 강조), 제목·저자·소개, 오른쪽 🔗 → `book.url` (새 탭)

**하단 CTA**

- 1행 (2열): **다시하기** · **결과 공유하기** — 공유 시 토스트 + `window.location.origin` + `/result/{type}` 클립보드 복사
- 2행: **영풍문고 바로가기** (풀 너비, `#DF0000` 단색) — `https://www.ypbooks.co.kr/` 새 탭

---

## 6. 비주얼 · 스타일

### 디자인 토큰 (`_variables.scss`)

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--color-accent` | `#4AAF70` | 메인 UI · progress · 공유 CTA |
| `--color-accent-strong` | `#1F976B` | 진한 초록 · 로딩 책 표지 |
| `--color-red-soft` | `#F87E7E` | B타입 배지 등 |
| `--color-red` | `#DF0000` | B타입 테마 · 바로가기 버튼 |
| `--color-type-a` / `--color-type-c` | `#2b4167` / `#5a7d6a` | 결과 A·C 테마 |
| `--personal-color` | `#d2e5ce` | 설문 선택·로딩 dot |
| `--color-on-primary` | `#ffffff` | 초록·빨강 버튼 글자 |
| `--color-bg` | `#f5f8f4` | 페이지 배경 (단색) |
| `--color-surface` | `rgba(255,255,255,0.72)` | glass 카드 |
| `--glass-blur` | `12px` | `glass-panel` mixin |
| `--radius-md` | `12px` | 카드·버튼 |
| `--font-sans` | Pretendard + 시스템 폴백 | 전역 `body` |

### 레이아웃

- `App.vue`: max-width **480px**, 상·하 `flex` spacer로 콘텐츠 세로 중앙
- 카드: `@mixin glass-panel` (`_mixins.scss`)

### 폰트 (`public/fonts/` + `_fonts.scss`)

| 파일 | weight |
|------|--------|
| `Pretendard-Regular.woff2` | 400 |
| `Pretendard-Medium.woff2` | 500 |
| `Pretendard-SemiBold.woff2` | 600 |
| `Pretendard-Bold.woff2` | 700 |
| `Pretendard-ExtraBold.woff2` | 800 |

5개 모두 `public/fonts/` 에 있어야 함. 없으면 시스템 한글 폰트로 폴백.

---

## 7. 데이터 수정 가이드

### `src/data/surveyQuestions.ts`

- `question`, `choices[].label`, `choices[].resultKey` 만 수정
- 문항 수를 바꾸면 `SurveyView` progress `max`, `isComplete` 로직도 함께 확인

### `src/data/results.json`

```ts
// types/index.ts 와 동일 구조
results: {
  type_A | type_B | type_C: {
    title, icon?, badgeLabel?, color,
    description, quote?,
    books: [{ id, title, author, desc, url }]
  }
}
```

- `quote`: 책 구절 + `작가, 『제목』` (cite `::before` 로 `— ` 붙음 → 본문에 `—` 중복 금지)
- `url`: 영풍문고 도서 상세 링크
- 타입 `color` 변경 시 이 가이드 §4 표도 갱신

### `src/data/surveyMeta.ts`

- 설문 화면 타이틀·부제만

---

## 8. 콘텐츠 현황 (요약)

### type_A — 사색하는 독서가

- 인용: 양귀자, 『모순』
- 도서: 모순, 스토너, 데미안

### type_B — 열정적인 행동가

- 인용: 앤디 위어, 『프로젝트 헤일메리』
- 도서: 프로젝트 헤일메리, 돌이킬 수 없는 약속, 물고기는 존재하지 않는다

### type_C — 따뜻한 공감가

- 인용: 김호연, 『불편한 편의점』
- 도서: 불편한 편의점, 안녕이라 그랬어, 어서 오세요, 휴남동 서점입니다

상세 문구·URL은 `results.json` 이 단일 소스입니다.

---

## 9. 접근성

- 설문: `progress` aria, `aria-live="polite"`, `aria-pressed` on choices, 제출 시 `isComplete()` 검사
- 로딩: `aria-live` on sub copy
- 결과: `blockquote` 인용, 공유 피드백 `role="status"`, `BookCard` 순위 `aria-label`
- `button` / `a` `:focus-visible` (`global.scss`)
- `.sr-only` (`global.scss`)
- `prefers-reduced-motion` 대응: 설문 슬라이드, 로딩 dot, 결과·로더

---

## 10. Vercel 배포

- 루트 `vercel.json`: SPA fallback → 모든 경로 `index.html`
- Build: `npm run build`, Output Directory: `dist`
- OG 이미지: **`public/og-image.png`** → `https://personal-book-yp.vercel.app/og-image.png`
- 프로덕션: https://personal-book-yp.vercel.app/
- HTTPS 필수 (결과 공유 클립보드)

---

## 11. 변경 시 체크리스트

| 변경 내용 | 함께 볼 곳 |
|-----------|------------|
| 색·레이아웃·카피 | 해당 Vue SCSS, `_variables.scss`, **이 문서 §5–6** |
| 설문 문항/매핑 | `surveyQuestions.ts`, **§4**, `useSurveyStore` |
| 결과/도서 | `results.json`, `types/index.ts`, **§8** |
| 로딩 시간 | `LoadingView.vue` `LOADING_MS`, **§5**, README |
| 라우트 추가/가드 | `router/index.ts`, **§2** |
| 폰트 파일 | `public/fonts/`, `_fonts.scss`, **§6** |

---

*마지막 동기화: 코드베이스 기준 (Vue 3 + Vite, API 없음, 매장 지도·AppIcons 없음)*

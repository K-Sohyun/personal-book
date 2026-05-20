# 퍼스널 북 (Personal Book)

감성 심리 분석 기반 도서 추천 모바일 웹앱 — 영풍문고

## 스택

- Vue 3 (Composition API, `<script setup>`)
- TypeScript
- SCSS
- Vue Router
- Vite

## 시작하기

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 접속 (실기기 테스트: `npm run dev -- --host`)

## 화면 흐름 (3-Step)

| 경로 | 뷰 | 설명 |
|------|-----|------|
| `/survey` | `SurveyView.vue` | 5문항 심리 진단 (독서 성향 4타입) |
| `/loading` | `LoadingView.vue` | 분석 로딩 (~2.8초 후 결과 이동) |
| `/result/:type?` | `ResultView.vue` | 성향 결과 · 추천 도서 · 이미지 클립보드 공유 |

## 폴더 구조

```
docs/PROJECT_GUIDE.md
public/fonts/       Pretendard woff2
public/images/      결과 공유 PNG 4장 (result_type_A~D.png)
public/favicon.svg  앱 파비콘
public/og-image.png 사이트 링크 미리보기 (공통)
src/
├── components/     BookCard, BookshelfLoader
├── composables/    useSurveyStore
├── utils/          resultShareImage (클립보드 복사)
├── data/           surveyMeta, surveyQuestions, results.json
├── router/
├── styles/         variables, mixins, fonts, global
├── types/
└── views/          Survey, Loading, Result, NotFound
```

## 문서

- **[`docs/PROJECT_GUIDE.md`](docs/PROJECT_GUIDE.md)** — 아키텍처·화면 명세·데이터·스타일 (구현과 함께 유지)

## 콘텐츠

설문·결과·추천 도서: `src/data/surveyQuestions.ts`, `src/data/results.json`  
결과 공유 이미지: `public/images/result_type_{A|B|C|D}.png` — **결과 공유하기** 시 클립보드 복사 후 채팅 앱에 붙여넣기

## Vercel 배포

1. GitHub 등에 푸시 후 [Vercel](https://vercel.com)에서 Import
2. Framework Preset: **Vite**, Build: `npm run build`, Output: `dist`
3. `vercel.json` 이 SPA 라우팅(`history` fallback)을 처리합니다.
4. OG 공유 이미지: **`public/og-image.png`** (권장 1200×630px)

**배포 URL:** https://personal-book-yp.vercel.app/

배포 후 `npm run preview` 로 로컬에서 `dist` 를 한 번 확인하는 것을 권장합니다.

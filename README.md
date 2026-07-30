# 소준섭 (Junseop So) — AI 강사 퍼스널 사이트

딥러닝 · LLM 강의 의뢰를 받기 위한 공개 랜딩 페이지. → **https://ssojux2.github.io**

빌드 단계가 없는 정적 사이트입니다. HTML · CSS · ES 모듈만 사용하므로 `git push` 하면 그대로 배포되고,
프레임워크 버전 관리가 필요 없습니다.

## 페이지 구성

방문자(기업 교육 담당자)가 **① 무슨 강의를 하는지 → ② 어디서 검증됐는지 → ③ 어떻게 의뢰하는지** 를
한 번의 스크롤로 파악하도록 구성했습니다.

| 섹션 | 내용 |
| --- | --- |
| Hero | 소개 문구, 요약 지표(강의 건수 · 기관 수 · 활동 기간), 의뢰 CTA |
| Trusted by | 대표 기관 로고 12개 |
| 제공 강의 | 6개 과정 카드 — 대상 · 커리큘럼 · 운영 형태 · 대표 고객사 |
| 강의 이력 | 전체 강의 이력. 분야 필터 + 기관명 · 주제 검색, 최신순 정렬, `진행 중` 배지 |
| 소개 | 경력 · 학력 타임라인, 수상 · 대회 · 논문, 연구 관심사 |
| YouTube | 「찹쓰 - 골라먹는 데이터 과학」 채널 안내 |
| 강의 의뢰 | 구글 폼 임베드 + 의뢰서 링크 + 메일 문의(템플릿 자동 입력) |

## 자주 하는 수정

### 강의 이력 추가

`scripts/data/lectures.js` 의 `LECTURES` 배열에 항목 하나만 추가하면 카드 · 필터 건수 · 히어로 지표가
모두 자동으로 갱신됩니다.

```js
{
  id: 'company-2026',              // 중복되지 않는 식별자
  org: '회사명',
  orgEn: 'Company Name',
  period: '2026.03 – 06',          // 화면에 그대로 표시
  startedAt: '2026-03',            // 'YYYY-MM' — 최신순 정렬 기준
  topic: 'LLM Agent with LangChain',
  topicKo: 'LangChain 기반 LLM 에이전트',
  category: 'llm',                 // CATEGORIES 의 id 중 하나
  logos: ['company.png'],          // assets/logos/ 의 파일명
  ongoing: true,                   // 진행 중이면 true, 끝났으면 생략
},
```

> 히어로의 숫자(`32건` 등)는 `index.html` 에도 정적 fallback 으로 들어 있습니다.
> 이력을 추가한 뒤 `npm test` 를 돌리면 두 값이 어긋났을 때 테스트가 알려줍니다.

### 제공 강의 수정

`scripts/data/products.js`. 각 과정의 `category` 가 강의 이력과 연결되어 있어서
**대표 고객사는 이력에서 자동으로 계산**됩니다 (기관명을 두 곳에 적을 필요 없음).

### 링크 · 연락처 수정

`scripts/data/profile.js` 의 `LINKS` 한 곳에만 있습니다.

### 로고 추가

원본 이미지를 `source/notion/assets/` 에 넣고 `tools/prepare-assets.sh` 의 `LOGO_MAP` 에 매핑을 추가한 뒤
`npm run assets` 를 실행하면 ASCII 파일명 + 가로 400px 로 변환됩니다.
(원본이 없는 환경에서는 변환된 `assets/logos/*.png` 만 있으면 사이트는 정상 동작합니다.)

## 개발

```bash
npm run dev     # http://localhost:4173 로컬 서버 (python3 http.server)
npm test        # 데이터 무결성 + 필터 순수 함수 테스트 (node --test)
npm run assets  # 원본 이미지 → 웹 에셋 변환 (macOS sips)
```

`npm test` 가 검증하는 것:

- 강의 이력의 필수 필드 · `startedAt` 형식 · id 중복 · 카테고리 유효성
- 참조하는 로고 파일이 `assets/logos/` 에 실제로 존재하는지
- 6개 과정이 모두 실제 강의 이력과 연결되는지 (근거 없는 카드 방지)
- `index.html` 의 지표 · 폼 주소가 데이터와 일치하는지
- 공개하지 않기로 한 개인 연락처가 산출물에 섞이지 않았는지
- 필터 · 검색 · 정렬 함수의 결과와 **입력 배열 무변이** 계약

## 구조

```
index.html              # 시맨틱 마크업, OG · JSON-LD 메타, 섹션 컨테이너
styles/
  tokens.css            # 색 · 타이포 · 간격 토큰 (라이트 · 다크)
  base.css              # 리셋, 타이포, 접근성 기본값
  layout.css            # 헤더 · 섹션 · 히어로 · 그리드 · 푸터
  components.css        # 버튼 · 카드 · 칩 · 로고 타일 · 타임라인 · 폼 임베드
scripts/
  data/                 # profile · products · lectures (모두 Object.freeze)
  render/               # 섹션별 렌더 함수 (dom · lectures · products · about · contact)
  filters.js            # 필터 · 검색 · 집계 순수 함수
  main.js               # 데이터 ↔ 렌더 연결, 이벤트 바인딩
tests/                  # node --test 유닛 테스트
tools/prepare-assets.sh # 원본 이미지 → 웹 에셋 변환
```

## 배포

`main` 브랜치에 푸시하면 GitHub Pages 가 루트를 그대로 서빙합니다.
Jekyll 처리를 막기 위해 `.nojekyll` 을 두었습니다.

## 참고

- 원본 Notion 프로필(`source/`)에는 휴대폰 번호와 개인 메일이 있어 `.gitignore` 로 제외했습니다.
  공개 페이지의 문의 창구는 `chopsdata@gmail.com` 하나로 통일했습니다.
- 기관 로고는 각 기관의 상표이며, 강의를 진행한 이력을 표시하는 목적으로만 사용했습니다.

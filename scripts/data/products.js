/**
 * 제공 강의(Products).
 *
 * category 는 lectures.js 의 CATEGORIES id 와 1:1로 대응한다.
 * 카드에 노출되는 "대표 고객사"는 이 category 에 속한 강의 이력에서 계산하므로
 * (scripts/render/products.js) 여기에 기관명을 중복해서 적지 않는다.
 *
 * format 문구는 실제 강의 이력의 기간 범위에서 도출한 것이다.
 */

export const PRODUCTS = Object.freeze([
  {
    id: 'foundation',
    category: 'foundation',
    order: 1,
    title: '딥러닝 입문 부트캠프',
    titleEn: 'Deep Learning Foundations',
    tagline: '비전공자도 끝까지 따라오는 딥러닝 첫 걸음',
    audience: '비전공자, AI 도입을 검토하는 실무자 · 관리자, 신입 교육 과정',
    curriculum: [
      '머신러닝 · 딥러닝의 동작 원리를 수식 부담 없이 이해하기',
      'Python · PyTorch 기반 실습 환경 구축과 첫 모델 학습',
      'CNN → RNN → Transformer 로 이어지는 모델 계보 잡기',
      '팀별 소규모 프로젝트로 학습 내용 마무리',
    ],
    format: '1일 특강 · 4주 집중 과정 · 최대 10개월 장기 커리큘럼까지 조정 가능',
  },
  {
    id: 'llm',
    category: 'llm',
    order: 2,
    title: 'LLM · RAG · AI Agent 실무',
    titleEn: 'LLM & AI Agent Engineering',
    tagline: '사내 LLM 과제를 실제로 굴러가게 만드는 과정',
    audience: 'LLM 도입 · PoC 팀, 백엔드 · 데이터 개발자, AI 기획자',
    curriculum: [
      'LangChain · LlamaIndex 로 LLM 애플리케이션 구조 설계',
      '문서 임베딩부터 검색 품질 개선까지 RAG 파이프라인 구축',
      'Tool calling · 멀티스텝 Agent 설계와 디버깅',
      'sLLM(SLM) 온디바이스 에이전트, LLM Safety 와 평가',
    ],
    format: '2일 집중 워크숍 · 3~11개월 사내 정규 과정 · PoC 병행 운영',
    highlight: true,
  },
  {
    id: 'genai',
    category: 'genai',
    order: 3,
    title: '생성형 AI 창작 워크숍',
    titleEn: 'Generative AI Studio',
    tagline: '이미지 · 음악 생성 모델을 직접 다뤄보는 실습형 워크숍',
    audience: '디자이너, 기획자, 크리에이터, 연구소 R&D 조직',
    curriculum: [
      'Diffusion 모델이 이미지를 만들어내는 원리',
      'Stable Diffusion 실습 — 프롬프트, 파인튜닝, 컨트롤',
      '음악 · 사운드 생성 모델과 창작 워크플로우',
      '실무 산출물에 바로 연결하는 적용 사례 분석',
    ],
    format: '반일 · 1일 워크숍 중심, 조직 맞춤 실습 데이터 반영',
  },
  {
    id: 'vision',
    category: 'vision',
    order: 4,
    title: '컴퓨터 비전 & 이상탐지',
    titleEn: 'Vision & Anomaly Detection',
    tagline: '제조 · 공정 현장의 불량과 이상을 찾아내는 비전 모델',
    audience: '제조 · 공정 · 품질 부서, 설비 데이터 분석 조직',
    curriculum: [
      '이미지 분류 · 검출 · 분할 모델의 선택 기준',
      '정상 데이터만으로 학습하는 이상탐지 접근법 (GAN · 재구성 기반)',
      '데이터 불균형 · 라벨 부족 상황에서의 현실적 대응',
      '보유 데이터로 진행하는 현장 적용 프로젝트',
    ],
    format: '2일 집중 과정 · 회차 반복 운영(분기별) · 사내 데이터 기반 실습',
    note: 'CCTV 화재 이상탐지 모델을 GAN 으로 개발한 산업 현장 경력을 바탕으로 진행합니다.',
  },
  {
    id: 'mentoring',
    category: 'mentoring',
    order: 5,
    title: '프로젝트 멘토링 & 강사 양성',
    titleEn: 'Mentoring & Train-the-Trainer',
    tagline: '과제를 끝까지 완주시키고, 가르칠 사람을 길러내는 과정',
    audience: '사내 AI 과제팀, KDT · 부트캠프 운영기관, 교육 담당 조직',
    curriculum: [
      '주제 선정 → 데이터 확보 → 모델링 → 발표까지 단계별 멘토링',
      '과제별 기술 리뷰와 막힌 지점 해소 세션',
      '교육 커리큘럼 설계와 강의 자료 구성법',
      '신규 강사 시연 코칭 및 피드백',
    ],
    format: '2개월 ~ 8개월 장기 멘토링 · 주 1회 정기 세션 형태로 운영',
  },
  {
    id: 'arttech',
    category: 'arttech',
    order: 6,
    title: 'AI 컨설팅 & Art × Tech 기획',
    titleEn: 'AI Consulting & Art × Tech',
    tagline: '강의를 넘어 프로젝트와 전시까지 — 블루펭귄',
    audience: 'AI 도입 기업, 문화예술 기관, 전시 · 행사 주최측',
    curriculum: [
      'AI 프로젝트 · 솔루션 개발과 기술 컨설팅',
      '컴퓨터음악 · 미디어아트 전시 및 행사 기획',
      'AI 창작 협업 프로젝트 (음악 생성, 인터랙티브 작업)',
      '커뮤니티 공간 기반 워크숍 운영',
    ],
    format: '프로젝트 단위 협업 · 전시 · 행사 기획 단위로 별도 협의',
    note:
      '블루펭귄 대표로 AI 프로젝트를 수행하며, Rubato LAB 소속으로 Art Korea Lab 2023 Art × Tech 공모 1위 및 AI Song Contest 2021–2023 참가 이력이 있습니다.',
  },
]);

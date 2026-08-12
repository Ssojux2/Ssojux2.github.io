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
    title: '딥러닝 기초',
    titleEn: 'Deep Learning Foundations',
    tagline: '비전공자도 끝까지 따라오는 딥러닝 첫 걸음',
    audience: '비전공자, AI 도입을 검토하는 실무자 · 관리자, 신입 교육 과정, 제조 · 공정 · 품질 부서',
    curriculum: [
      '머신러닝 · 딥러닝의 동작 원리를 수식 부담 없이 이해하기',
      'Python · PyTorch 기반 실습 환경 구축과 첫 모델 학습',
      'CNN → RNN → Transformer 로 이어지는 모델 계보 잡기',
      '컴퓨터 비전 · 이상탐지 등 제조 · 공정 현장 과제로 이어지는 응용',
      '팀별 프로젝트와 단계별 과제 멘토링으로 마무리',
    ],
    format: '1일 특강 · 4주 집중 과정 · 최대 10개월 장기 커리큘럼까지 조정 가능',
    note: 'CCTV 화재 이상탐지 모델을 GAN 으로 개발한 산업 현장 경력을 바탕으로 진행합니다.',
  },
  {
    id: 'llm',
    category: 'llm',
    order: 2,
    title: 'LLM Agent 실무',
    titleEn: 'LLM & AI Agent Engineering',
    tagline: 'RAG 부터 Agent 까지, 사내 LLM 과제를 실제로 굴러가게 만드는 과정',
    audience: 'LLM 도입 · PoC 팀, 백엔드 · 데이터 개발자, AI 기획자',
    curriculum: [
      'LangChain · LlamaIndex 로 LLM 애플리케이션 구조 설계',
      '문서 임베딩부터 검색 품질 개선까지 RAG 파이프라인 구축',
      'Tool calling · 멀티스텝 Agent 설계와 디버깅',
      'SLM 온디바이스 에이전트, LLM Safety 와 평가',
    ],
    format: '2일 집중 워크숍 · 3~11개월 사내 정규 과정 · PoC 병행 운영',
    highlight: true,
  },
  {
    id: 'genai',
    category: 'genai',
    order: 3,
    title: 'Gen AI 콘텐츠 생성',
    titleEn: 'Generative AI Content Studio',
    tagline: '이미지 · 음악 생성 모델을 직접 다뤄보는 실습형 워크숍',
    audience: '디자이너, 기획자, 크리에이터, 문화예술 기관, 연구소 R&D 조직',
    curriculum: [
      'Diffusion 모델이 이미지를 만들어내는 원리',
      'Stable Diffusion 실습 — 프롬프트, 파인튜닝, 컨트롤',
      '음악 · 사운드 생성 모델과 창작 워크플로우',
      'AI 창작 협업과 미디어아트 적용 사례, 실무 산출물로 연결하기',
    ],
    format: '반일 · 1일 워크숍 중심, 조직 맞춤 실습 데이터 반영',
    note:
      'Rubato LAB 소속으로 Art Korea Lab 2023 Art × Tech 공모 1위, AI Song Contest 2021–2023 에 참가한 창작 경험을 바탕으로 진행합니다.',
  },
]);

/**
 * 세 과정 외에 별도로 협의해 진행하는 일들.
 * 카드로 분리하지 않고 그리드 아래 한 줄로만 안내한다.
 */
export const ADDITIONAL_SERVICES = Object.freeze({
  text: '이 외에도 사내 AI 과제 프로젝트 멘토링과 강사 양성 과정, 블루펭귄을 통한 AI 컨설팅 · Art × Tech 전시 기획을 진행합니다.',
  linkLabel: '문의하기',
  href: '#request',
});

/**
 * 프로필 기본 정보 · 외부 링크 · 경력 · 학력 상수.
 *
 * 사이트 전체에서 쓰는 URL과 연락처는 모두 이 파일에만 둔다.
 * (변경 지점을 하나로 유지하고, 하드코딩 URL이 마크업에 흩어지는 것을 막는다)
 */

export const SITE_URL = 'https://ssojux2.github.io';

/** 공개 페이지에 노출하는 링크. 개인 메일·휴대폰 번호는 의도적으로 포함하지 않는다. */
export const LINKS = Object.freeze({
  /** 강의 의뢰 폼 단축 링크 (버튼용). 목적지는 아래 lectureFormEmbed 와 동일한 구글 폼. */
  lectureForm: 'https://tr.ee/2WtIcPC3Wo',
  /** iframe 임베드용 원본 폼 URL. 단축 링크는 iframe 을 허용하지 않는다. */
  lectureFormEmbed:
    'https://docs.google.com/forms/d/e/1FAIpQLSe7pymclR5YvR4Z4_-fKkDklKcRe46leQlPZfLSGrpkjaxuwQ/viewform?embedded=true',
  youtube: 'https://www.youtube.com/@data_chopsticks',
  youtubeSubscribe: 'https://www.youtube.com/@data_chopsticks?sub_confirmation=1',
  linktree: 'https://linktr.ee/ssojubro',
  instagram: 'https://www.instagram.com/ssojux2',
  bluePenguin: 'https://www.instagram.com/bluepenguin_official/',
  email: 'chopsdata@gmail.com',
});

export const PROFILE = Object.freeze({
  name: '소준섭',
  nameEn: 'Junseop So',
  role: 'AI 강사 · ML Researcher',
  headline: '인공지능을 쉽고 재밌게 전달하는 AI 강사',
  location: '서울, 대한민국',
  locationEn: 'Seoul, South Korea',
  summary: [
    '삼성, 카카오, LG, 현대 등 다수의 기업 및 기관에서 딥러닝 강의를 맡아온 소준섭입니다.',
    '기술을 쉽고 재밌게 전달하며, 비전공자 및 다른 분야 사람들도 쉽게 입문할 수 있도록 강의합니다.',
    'Generative AI와 컴퓨터 음악을 연구하고, 블루펭귄 대표로서 기술과 예술이 공존하는 공간을 만들어가고 있습니다.',
  ],
  researchInterests: [
    { ko: '생성모델', en: 'Generative AI Models' },
    { ko: '컴퓨터음악', en: 'Computer Music' },
    { ko: '미디어아트', en: 'Media Art' },
  ],
  languages: [
    { name: 'Korean', level: 'Native' },
    { name: 'English', level: 'Intermediate' },
  ],
  sideHustles: ['Music Producer', 'DJ'],
});

/** 유튜브 채널 소개 */
export const YOUTUBE = Object.freeze({
  name: '찹쓰 - 골라먹는 데이터 과학',
  description:
    '딥러닝과 생성형 AI를 비전공자도 따라올 수 있게 풀어내는 강의 채널입니다. 강의에서 다루는 개념을 영상으로 미리 확인해 보세요.',
  topics: ['딥러닝 기초', 'LLM · RAG', '생성형 AI', '데이터 과학'],
});

export const WORK_EXPERIENCE = Object.freeze([
  {
    role: 'CEO',
    org: '블루펭귄',
    orgEn: 'Blue Penguin',
    period: '2023.06 – 현재',
    ongoing: true,
    highlights: [
      '인공지능 프로젝트 및 솔루션, 컨설팅',
      'Computer Music / Media Art 관련 전시 및 행사 기획',
      '커뮤니티 공간 운영',
      '유튜브 강의 채널 운영',
    ],
  },
  {
    role: '머신러닝 엔지니어',
    roleEn: 'Machine Learning Engineer',
    org: '뉴튠',
    orgEn: 'Neutune',
    note: 'Contract',
    period: '2021.11 – 2022.02',
    highlights: ['Music Source Separation'],
  },
  {
    role: '머신러닝 엔지니어',
    roleEn: 'Machine Learning Engineer',
    org: 'LG AI Research',
    orgEn: 'LG AI Research',
    note: 'Contract',
    period: '2021.03 – 2021.11',
    highlights: ['AI Loop Music Generation', '<Tilda project>'],
  },
  {
    role: '머신러닝 엔지니어',
    roleEn: 'Machine Learning Engineer',
    org: '포자랩스',
    orgEn: 'Pozalabs',
    period: '2019.09 – 2019.12',
    highlights: ['Pop music generation models'],
  },
  {
    role: '머신러닝 엔지니어',
    roleEn: 'Machine Learning Engineer',
    org: '팡퍼니',
    orgEn: 'Pangpany',
    period: '2017.11 – 2019.09',
    highlights: ['CCTV 기반 이상탐지 | CCTV fire anomaly detection with GAN'],
  },
  {
    role: '안드로이드 개발자',
    roleEn: 'Android App Developer',
    org: '엔큐브',
    orgEn: 'Ncube',
    period: '2016.10 – 2017.02',
    highlights: [
      '위성 통신 패킷 가속기(PEPsal)용 패킷 테스트베드 제작',
      'VR Game 구현 & BGM 제작',
    ],
  },
]);

export const EDUCATION = Object.freeze([
  {
    org: 'MODULABS GTA Lab & Rubato LAB',
    degree: 'Generative AI & Music Generation',
    period: '2018.08 – 2025.03',
    highlights: ['Generative AI', 'Computer Music'],
  },
  {
    org: '한양대학교',
    orgEn: 'Hanyang University',
    degree: '석사과정 중퇴 | Withdrew from a master’s program',
    field: 'Art & Technology',
    period: '2017.03 – 2017.07',
  },
  {
    org: '한밭대학교',
    orgEn: 'Hanbat National University',
    degree: '공학사 | Bachelor of Engineering',
    field: '컴퓨터공학 | Computer Engineering',
    period: '2010.03 – 2017.02',
  },
]);

/** 수상 · 대회 · 논문 */
export const ACHIEVEMENTS = Object.freeze([
  {
    title: '문화체육관광부 Art Korea Lab — 2023 Art × Tech 공모 1위',
    org: 'Rubato LAB',
    type: 'award',
  },
  {
    title: 'AI Song Contest 2023 — 「경, 敬, ɡjʌŋ」',
    org: 'Rubato LAB',
    type: 'contest',
    url: 'https://www.aisongcontest.com/participants-2023/rubato-lab',
  },
  {
    title: 'AI Song Contest 2022 — 「Beam of Seoul」',
    org: 'Rubato LAB',
    type: 'contest',
    url: 'https://www.aisongcontest.com/participants-2022/rubato-lab',
  },
  {
    title: 'AI Song Contest 2021 — 「Daybreak」',
    org: 'Rubato LAB',
    type: 'contest',
    url: 'https://www.aisongcontest.com/participants/rubatolab-2021',
  },
  {
    title:
      'Exploring the taxonomic and associative link between emotion and function for robot sound design',
    org: 'Eunju Jeong, Junseop So, Gyu Hyun Kwon',
    type: 'publication',
  },
]);

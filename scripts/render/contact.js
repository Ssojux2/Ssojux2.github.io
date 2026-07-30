/** 유튜브 카드 · 강의 의뢰 버튼 · 연락처 · 푸터 링크 렌더 */

import { el, externalLink } from './dom.js';

const MAIL_SUBJECT = '[강의 의뢰] 기관명 / 희망 일정';

const MAIL_BODY = [
  '안녕하세요, 소준섭 강사님.',
  '아래 내용으로 강의를 의뢰드립니다.',
  '',
  '- 기관 · 회사명 :',
  '- 담당자 성함 / 연락처 :',
  '- 희망 일정 :',
  '- 총 강의 시간 :',
  '- 수강 인원 :',
  '- 대상 수준 (비전공자 / 개발자 / 연구직) :',
  '- 희망 주제 :',
  '- 진행 방식 (온라인 / 오프라인) 및 장소 :',
  '- 예산 :',
  '- 그 외 요청 사항 :',
  '',
].join('\n');

/** 제목 · 본문 템플릿이 채워진 mailto 링크를 만든다. */
export function buildMailtoUrl(email, { subject = MAIL_SUBJECT, body = MAIL_BODY } = {}) {
  const params = new URLSearchParams({ subject, body });
  // URLSearchParams 는 공백을 '+' 로 인코딩하는데, 메일 클라이언트는 이를 그대로 읽는다.
  return `mailto:${email}?${params.toString().replace(/\+/g, '%20')}`;
}

export function renderYoutubeCard(container, youtube, links) {
  container.replaceChildren(
    el('div', {}, [
      el('h3', { class: 'youtube-card__title', text: youtube.name }),
      el('p', { class: 'youtube-card__desc', text: youtube.description }),
      el(
        'ul',
        { class: 'tag-list youtube-card__tags' },
        youtube.topics.map((topic) => el('li', {}, [el('span', { class: 'tag', text: topic })])),
      ),
    ]),
    el('div', {}, [
      el('a', { class: 'button button--primary', ...externalLink(links.youtubeSubscribe) }, [
        '유튜브 채널 보기',
      ]),
    ]),
  );
}

export function renderRequestActions(container, links) {
  container.replaceChildren(
    el('a', { class: 'button button--primary button--block', ...externalLink(links.lectureForm) }, [
      '강의 의뢰서 작성하기',
    ]),
    el(
      'a',
      { class: 'button button--secondary button--block', href: buildMailtoUrl(links.email) },
      ['메일로 문의하기'],
    ),
  );
}

export function renderContactLine(container, links) {
  container.replaceChildren(
    el('span', { class: 'contact-line__label', text: '문의' }),
    el('a', { href: `mailto:${links.email}` }, [links.email]),
  );
}

export function renderFormFallback(container, links) {
  container.replaceChildren(
    '양식이 보이지 않으면 ',
    el('a', externalLink(links.lectureForm), ['새 창에서 강의 의뢰서 열기']),
    ' 를 눌러주세요.',
  );
}

export function renderFooterLinks(container, links) {
  const items = [
    { label: '강의 의뢰서', href: links.lectureForm },
    { label: '유튜브 — 찹쓰', href: links.youtube },
    { label: '링크트리', href: links.linktree },
    { label: '인스타그램', href: links.instagram },
    { label: '블루펭귄', href: links.bluePenguin },
  ];

  container.replaceChildren(
    ...items.map((item) => el('a', externalLink(item.href), [item.label])),
    el('a', { href: `mailto:${links.email}` }, [links.email]),
  );
}

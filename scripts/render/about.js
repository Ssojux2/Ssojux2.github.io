/** 소개 섹션 렌더 — 경력 · 학력 타임라인, 수상 이력, 연구 관심사, 프로필 요약 */

import { el, externalLink } from './dom.js';

function highlightList(highlights) {
  if (!highlights || highlights.length === 0) {
    return null;
  }
  return el(
    'ul',
    { class: 'timeline__highlights' },
    highlights.map((item) => el('li', { text: item })),
  );
}

export function renderWorkTimeline(container, experiences) {
  container.replaceChildren(
    ...experiences.map((job) =>
      el('li', { class: 'timeline__item' }, [
        el('p', { class: 'timeline__period' }, [
          job.period,
          job.ongoing === true && el('span', { class: 'badge badge--ongoing', text: '진행 중' }),
        ]),
        el('h4', { class: 'timeline__role' }, [
          job.role,
          job.roleEn ? el('span', { class: 'lecture-card__org-en', text: job.roleEn }) : null,
        ]),
        el('p', { class: 'timeline__org' }, [
          // 국문·영문 표기가 같은 기관(예: LG AI Research)은 한 번만 노출한다
          job.orgEn && job.orgEn !== job.org ? `${job.org} · ${job.orgEn}` : job.org,
          job.note ? ` (${job.note})` : null,
        ]),
        highlightList(job.highlights),
      ]),
    ),
  );
}

export function renderEducationTimeline(container, education) {
  container.replaceChildren(
    ...education.map((school) =>
      el('li', { class: 'timeline__item' }, [
        el('p', { class: 'timeline__period', text: school.period }),
        el('h4', { class: 'timeline__role' }, [
          school.org,
          school.orgEn ? el('span', { class: 'lecture-card__org-en', text: school.orgEn }) : null,
        ]),
        el('p', { class: 'timeline__org', text: school.degree }),
        highlightList(school.field ? [school.field, ...(school.highlights ?? [])] : school.highlights),
      ]),
    ),
  );
}

const ACHIEVEMENT_LABEL = Object.freeze({
  award: '수상',
  contest: '대회',
  publication: '논문',
});

export function renderAchievements(container, achievements) {
  container.replaceChildren(
    ...achievements.map((item) =>
      el('li', { class: 'side-card__list-item' }, [
        el('span', {
          class: item.type === 'award' ? 'badge badge--ongoing' : 'badge badge--category',
          text: ACHIEVEMENT_LABEL[item.type] ?? item.type,
        }),
        ' ',
        item.url
          ? el('a', externalLink(item.url), [item.title])
          : el('span', { text: item.title }),
        el('span', { class: 'side-card__list-meta', text: item.org }),
      ]),
    ),
  );
}

export function renderResearchTags(container, interests) {
  container.replaceChildren(
    ...interests.map((interest) =>
      el('li', {}, [el('span', { class: 'tag', text: `${interest.ko} · ${interest.en}` })]),
    ),
  );
}

export function renderProfileFacts(container, profile) {
  const facts = [
    ['위치', `${profile.location} · ${profile.locationEn}`],
    ['언어', profile.languages.map((lang) => `${lang.name} (${lang.level})`).join(' · ')],
    ['그 외', profile.sideHustles.join(' · ')],
  ];

  container.replaceChildren(
    ...facts.map(([key, value]) =>
      el('div', { class: 'definition-list__row' }, [
        el('dt', { text: key }),
        el('dd', { text: value }),
      ]),
    ),
  );
}

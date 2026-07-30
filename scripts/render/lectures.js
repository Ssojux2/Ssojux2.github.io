/** 강의 이력 섹션 렌더 — 로고 스트립 · 필터 칩 · 이력 카드 · 요약 지표 */

import { el, logoTile } from './dom.js';
import { ALL_CATEGORY } from '../filters.js';

const categoryLabel = (categories, id) =>
  categories.find((category) => category.id === id)?.label ?? id;

export function renderLogoStrip(container, featuredLogos) {
  container.replaceChildren(
    ...featuredLogos.map((logo) => el('li', {}, [logoTile(logo.file, logo.name)])),
  );
}

export function renderStats(container, summary) {
  const values = {
    total: `${summary.total}건`,
    orgs: `${summary.orgCount}개`,
    years: `${summary.firstYear} – 현재`,
  };

  for (const [key, value] of Object.entries(values)) {
    const target = container.querySelector(`[data-stat="${key}"]`);
    if (target) {
      target.textContent = value;
    }
  }
}

export function renderCategoryChips(container, categories, counts, activeCategory, total) {
  const chips = [
    { id: ALL_CATEGORY, label: '전체', count: total },
    ...categories.map((category) => ({
      id: category.id,
      label: category.label,
      count: counts[category.id] ?? 0,
    })),
  ];

  container.replaceChildren(
    ...chips.map((chip) =>
      el('li', {}, [
        el(
          'button',
          {
            type: 'button',
            class: 'chip',
            'aria-pressed': String(chip.id === activeCategory),
            dataset: { category: chip.id },
          },
          [chip.label, el('span', { class: 'chip__count', text: String(chip.count) })],
        ),
      ]),
    ),
  );
}

/** 필터 칩의 선택 상태만 갱신한다 (전체를 다시 그리지 않는다) */
export function updateChipState(container, activeCategory) {
  for (const chip of container.querySelectorAll('.chip')) {
    chip.setAttribute('aria-pressed', String(chip.dataset.category === activeCategory));
  }
}

function lectureCard(lecture, categories) {
  return el('li', { class: 'lecture-card' }, [
    el(
      'div',
      { class: 'lecture-card__logos' },
      lecture.logos.map((file) => logoTile(file, lecture.org, { compact: true })),
    ),
    el('h3', { class: 'lecture-card__org' }, [
      lecture.org,
      el('span', { class: 'lecture-card__org-en', text: lecture.orgEn }),
    ]),
    el('p', { class: 'lecture-card__topic' }, [
      lecture.topic,
      el('span', { class: 'lecture-card__topic-ko', text: lecture.topicKo }),
    ]),
    el('div', { class: 'lecture-card__footer' }, [
      el('span', { class: 'lecture-card__period', text: lecture.period }),
      el('span', {
        class: 'badge badge--category',
        text: categoryLabel(categories, lecture.category),
      }),
      lecture.ongoing === true && el('span', { class: 'badge badge--ongoing', text: '진행 중' }),
    ]),
  ]);
}

export function renderLectureCards(container, lectures, categories) {
  if (lectures.length === 0) {
    container.replaceChildren(
      el('li', { class: 'empty-state' }, [
        '조건에 맞는 강의 이력이 없습니다. 다른 분야를 선택하거나 검색어를 지워 보세요.',
      ]),
    );
    return;
  }

  container.replaceChildren(...lectures.map((lecture) => lectureCard(lecture, categories)));
}

export function renderFilterStatus(container, { shown, total, category, query, categories }) {
  const parts = [`전체 ${total}건 중 ${shown}건 표시`];

  if (category !== ALL_CATEGORY) {
    parts.push(`분야: ${categoryLabel(categories, category)}`);
  }
  if (query.trim() !== '') {
    parts.push(`검색어: “${query.trim()}”`);
  }

  container.textContent = parts.join(' · ');
}

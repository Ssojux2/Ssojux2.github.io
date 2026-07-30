/**
 * 페이지 진입점 — 데이터를 각 렌더 모듈에 연결하고 필터 · 테마 이벤트를 바인딩한다.
 */

import { LINKS, PROFILE, YOUTUBE, WORK_EXPERIENCE, EDUCATION, ACHIEVEMENTS } from './data/profile.js';
import { CATEGORIES, LECTURES, FEATURED_LOGOS } from './data/lectures.js';
import { PRODUCTS } from './data/products.js';
import { ALL_CATEGORY, applyFilters, countByCategory, summarize } from './filters.js';
import {
  renderCategoryChips,
  renderFilterStatus,
  renderLectureCards,
  renderLogoStrip,
  renderStats,
  updateChipState,
} from './render/lectures.js';
import { renderProducts } from './render/products.js';
import {
  renderAchievements,
  renderEducationTimeline,
  renderProfileFacts,
  renderResearchTags,
  renderWorkTimeline,
} from './render/about.js';
import {
  renderContactLine,
  renderFooterLinks,
  renderFormFallback,
  renderRequestActions,
  renderYoutubeCard,
} from './render/contact.js';

const SEARCH_DEBOUNCE_MS = 120;

const byId = (id) => document.getElementById(id);

/** 현재 필터 상태. 갱신할 때는 항상 새 객체로 교체한다. */
let filterState = Object.freeze({ category: ALL_CATEGORY, query: '' });

function renderFilteredLectures(elements) {
  const visible = applyFilters(LECTURES, filterState);

  renderLectureCards(elements.lectureGrid, visible, CATEGORIES);
  renderFilterStatus(elements.filterStatus, {
    shown: visible.length,
    total: LECTURES.length,
    category: filterState.category,
    query: filterState.query,
    categories: CATEGORIES,
  });
  updateChipState(elements.categoryChips, filterState.category);
}

function setFilterState(elements, patch) {
  filterState = Object.freeze({ ...filterState, ...patch });
  renderFilteredLectures(elements);
}

function bindFilterEvents(elements) {
  elements.categoryChips.addEventListener('click', (event) => {
    const chip = event.target.closest('.chip');
    if (chip) {
      setFilterState(elements, { category: chip.dataset.category });
    }
  });

  let searchTimer;
  elements.search.addEventListener('input', (event) => {
    const { value } = event.target;
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => setFilterState(elements, { query: value }), SEARCH_DEBOUNCE_MS);
  });

  // 제공 강의 카드의 "관련 이력 보기" — 필터를 맞춘 뒤 앵커 이동은 기본 동작에 맡긴다.
  elements.productGrid.addEventListener('click', (event) => {
    const link = event.target.closest('[data-category-link]');
    if (link) {
      setFilterState(elements, { category: link.dataset.categoryLink, query: '' });
      elements.search.value = '';
    }
  });
}

/** ?category=llm 형태의 공유 링크를 지원한다. */
function initialCategoryFromUrl() {
  const requested = new URLSearchParams(window.location.search).get('category');
  const isKnown = CATEGORIES.some((category) => category.id === requested);
  return isKnown ? requested : ALL_CATEGORY;
}

function bindThemeToggle() {
  const toggle = byId('theme-toggle');
  if (!toggle) {
    return;
  }

  toggle.addEventListener('click', () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const current = document.documentElement.dataset.theme ?? (prefersDark ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';

    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* 저장이 막힌 환경에서도 이번 세션의 전환은 그대로 유지된다 */
    }
  });
}

function init() {
  const elements = {
    lectureGrid: byId('lecture-grid'),
    filterStatus: byId('filter-status'),
    categoryChips: byId('category-chips'),
    search: byId('lecture-search'),
    productGrid: byId('product-grid'),
  };

  const summary = summarize(LECTURES);

  renderStats(byId('hero-stats'), summary);
  renderLogoStrip(byId('logo-strip'), FEATURED_LOGOS);
  renderProducts(elements.productGrid, PRODUCTS, LECTURES);

  renderCategoryChips(
    elements.categoryChips,
    CATEGORIES,
    countByCategory(LECTURES),
    initialCategoryFromUrl(),
    LECTURES.length,
  );

  renderWorkTimeline(byId('work-timeline'), WORK_EXPERIENCE);
  renderEducationTimeline(byId('education-timeline'), EDUCATION);
  renderAchievements(byId('achievement-list'), ACHIEVEMENTS);
  renderResearchTags(byId('research-tags'), PROFILE.researchInterests);
  renderProfileFacts(byId('profile-facts'), PROFILE);

  renderYoutubeCard(byId('youtube-card'), YOUTUBE, LINKS);
  renderRequestActions(byId('request-actions'), LINKS);
  renderContactLine(byId('contact-line'), LINKS);
  renderFormFallback(byId('form-fallback'), LINKS);
  renderFooterLinks(byId('footer-links'), LINKS);

  setFilterState(elements, { category: initialCategoryFromUrl() });
  bindFilterEvents(elements);
  bindThemeToggle();
}

init();

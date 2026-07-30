/**
 * 강의 이력 필터 · 집계 순수 함수 모음.
 *
 * 모든 함수는 입력 배열을 변경하지 않고 항상 새 배열/객체를 반환한다.
 */

export const ALL_CATEGORY = 'all';

/** 최신순(startedAt 내림차순) 정렬. 같은 달이면 기존 순서를 유지한다. */
export function sortByRecent(lectures) {
  return [...lectures].sort((a, b) => b.startedAt.localeCompare(a.startedAt));
}

export function filterByCategory(lectures, categoryId) {
  if (!categoryId || categoryId === ALL_CATEGORY) {
    return [...lectures];
  }
  return lectures.filter((lecture) => lecture.category === categoryId);
}

/** 기관명(한/영), 강의 주제(한/영)를 대상으로 대소문자 구분 없이 부분 일치 검색 */
export function searchLectures(lectures, query) {
  const keyword = (query ?? '').trim().toLowerCase();
  if (keyword === '') {
    return [...lectures];
  }
  return lectures.filter((lecture) =>
    [lecture.org, lecture.orgEn, lecture.topic, lecture.topicKo]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(keyword)),
  );
}

/** 카테고리 필터 → 검색 → 최신순 정렬을 한 번에 적용 */
export function applyFilters(lectures, { category = ALL_CATEGORY, query = '' } = {}) {
  return sortByRecent(searchLectures(filterByCategory(lectures, category), query));
}

/** { categoryId: 건수 } 맵. 필터 칩의 건수 표시에 사용한다. */
export function countByCategory(lectures) {
  return lectures.reduce(
    (counts, lecture) => ({
      ...counts,
      [lecture.category]: (counts[lecture.category] ?? 0) + 1,
    }),
    {},
  );
}

/** 중복을 제거한 기관명 목록 (등장 순서 유지) */
export function distinctOrgs(lectures) {
  return [...new Set(lectures.map((lecture) => lecture.org))];
}

/**
 * 특정 카테고리의 대표 기관명을 최신순으로 추린다.
 * 제공 강의 카드의 "대표 고객사" 줄을 이력에서 직접 계산하기 위한 함수.
 */
export function representativeOrgs(lectures, categoryId, limit = 4) {
  return distinctOrgs(sortByRecent(filterByCategory(lectures, categoryId))).slice(0, limit);
}

/** 히어로 지표용 요약 통계 */
export function summarize(lectures) {
  const years = lectures.map((lecture) => Number(lecture.startedAt.slice(0, 4)));
  return Object.freeze({
    total: lectures.length,
    orgCount: distinctOrgs(lectures).length,
    firstYear: Math.min(...years),
    latestYear: Math.max(...years),
    ongoingCount: lectures.filter((lecture) => lecture.ongoing === true).length,
  });
}

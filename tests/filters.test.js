/**
 * 필터 순수 함수 테스트.
 * 결과의 정확성과 함께 "입력 배열을 절대 변경하지 않는다"는 계약을 검증한다.
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

import {
  ALL_CATEGORY,
  applyFilters,
  countByCategory,
  distinctOrgs,
  filterByCategory,
  representativeOrgs,
  searchLectures,
  sortByRecent,
  summarize,
} from '../scripts/filters.js';

/** 테스트용 최소 데이터셋 */
const SAMPLE = Object.freeze([
  {
    id: 'a',
    org: '카카오',
    orgEn: 'Kakao',
    startedAt: '2024-02',
    topic: 'Deep Learning & LLMs',
    topicKo: '딥러닝과 LLM',
    category: 'llm',
  },
  {
    id: 'b',
    org: '신한은행',
    orgEn: 'Shinhan Bank',
    startedAt: '2020-10',
    topic: 'Deep Learning Basics',
    topicKo: '딥러닝 기초',
    category: 'foundation',
  },
  {
    id: 'c',
    org: '카카오',
    orgEn: 'Kakao',
    startedAt: '2026-06',
    topic: 'LLM Agent with LangChain',
    topicKo: 'LangChain 기반 LLM 에이전트',
    category: 'llm',
    ongoing: true,
  },
]);

describe('sortByRecent', () => {
  test('startedAt 내림차순으로 정렬한다', () => {
    assert.deepEqual(
      sortByRecent(SAMPLE).map((item) => item.id),
      ['c', 'a', 'b'],
    );
  });

  test('입력 배열의 순서를 바꾸지 않는다', () => {
    const before = SAMPLE.map((item) => item.id);
    sortByRecent(SAMPLE);
    assert.deepEqual(
      SAMPLE.map((item) => item.id),
      before,
    );
  });
});

describe('filterByCategory', () => {
  test('카테고리로 걸러낸다', () => {
    assert.deepEqual(
      filterByCategory(SAMPLE, 'llm').map((item) => item.id),
      ['a', 'c'],
    );
  });

  test("'all' 이나 빈 값이면 전체를 반환한다", () => {
    assert.equal(filterByCategory(SAMPLE, ALL_CATEGORY).length, 3);
    assert.equal(filterByCategory(SAMPLE, '').length, 3);
    assert.equal(filterByCategory(SAMPLE, null).length, 3);
  });

  test('원본과 다른 새 배열을 반환한다', () => {
    assert.notEqual(filterByCategory(SAMPLE, ALL_CATEGORY), SAMPLE);
  });

  test('일치하는 항목이 없으면 빈 배열이다', () => {
    assert.deepEqual(filterByCategory(SAMPLE, 'genai'), []);
  });
});

describe('searchLectures', () => {
  test('기관명(한글)으로 찾는다', () => {
    assert.deepEqual(
      searchLectures(SAMPLE, '카카오').map((item) => item.id),
      ['a', 'c'],
    );
  });

  test('영문 기관명은 대소문자를 구분하지 않는다', () => {
    assert.deepEqual(
      searchLectures(SAMPLE, 'shinhan').map((item) => item.id),
      ['b'],
    );
  });

  test('영문 주제로 찾는다', () => {
    assert.deepEqual(
      searchLectures(SAMPLE, 'langchain').map((item) => item.id),
      ['c'],
    );
  });

  test('한글 주제로도 찾는다', () => {
    assert.deepEqual(
      searchLectures(SAMPLE, '기초').map((item) => item.id),
      ['b'],
    );
  });

  test('빈 문자열 · 공백 · undefined 는 전체를 반환한다', () => {
    assert.equal(searchLectures(SAMPLE, '').length, 3);
    assert.equal(searchLectures(SAMPLE, '   ').length, 3);
    assert.equal(searchLectures(SAMPLE, undefined).length, 3);
  });

  test('일치하지 않으면 빈 배열이다', () => {
    assert.deepEqual(searchLectures(SAMPLE, '존재하지않는기관'), []);
  });
});

describe('applyFilters', () => {
  test('카테고리와 검색을 함께 적용하고 최신순으로 정렬한다', () => {
    assert.deepEqual(
      applyFilters(SAMPLE, { category: 'llm', query: '카카오' }).map((item) => item.id),
      ['c', 'a'],
    );
  });

  test('인자를 생략하면 전체를 최신순으로 반환한다', () => {
    assert.deepEqual(
      applyFilters(SAMPLE).map((item) => item.id),
      ['c', 'a', 'b'],
    );
  });

  test('입력 배열을 변경하지 않는다', () => {
    const snapshot = JSON.stringify(SAMPLE);
    applyFilters(SAMPLE, { category: 'llm', query: 'kakao' });
    assert.equal(JSON.stringify(SAMPLE), snapshot);
  });
});

describe('집계 함수', () => {
  test('countByCategory 는 카테고리별 건수를 센다', () => {
    assert.deepEqual(countByCategory(SAMPLE), { llm: 2, foundation: 1 });
  });

  test('distinctOrgs 는 중복 기관을 제거한다', () => {
    assert.deepEqual(distinctOrgs(SAMPLE), ['카카오', '신한은행']);
  });

  test('representativeOrgs 는 최신순 · 중복 제거 · 개수 제한을 적용한다', () => {
    assert.deepEqual(representativeOrgs(SAMPLE, 'llm'), ['카카오']);
    assert.deepEqual(representativeOrgs(SAMPLE, ALL_CATEGORY, 1), ['카카오']);
  });

  test('summarize 는 건수 · 기관수 · 연도 범위 · 진행중 건수를 계산한다', () => {
    assert.deepEqual(summarize(SAMPLE), {
      total: 3,
      orgCount: 2,
      firstYear: 2020,
      latestYear: 2026,
      ongoingCount: 1,
    });
  });
});

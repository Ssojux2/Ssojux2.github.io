/**
 * 데이터 무결성 테스트.
 *
 * 강의를 추가하거나 로고 파일명을 바꿨을 때 실제로 깨지는 지점을 잡는다:
 *   - 필수 필드 누락, 잘못된 카테고리 id, 중복 id
 *   - 참조하는 로고 파일이 assets/logos/ 에 실제로 존재하는지
 *   - index.html 히어로 지표 숫자가 데이터와 일치하는지
 *   - 제공 강의 카드가 근거 없이 비어 있지 않은지
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { CATEGORIES, CATEGORY_IDS, LECTURES, FEATURED_LOGOS } from '../scripts/data/lectures.js';
import { PRODUCTS } from '../scripts/data/products.js';
import { LINKS, WORK_EXPERIENCE, EDUCATION, ACHIEVEMENTS } from '../scripts/data/profile.js';
import { distinctOrgs, representativeOrgs, summarize } from '../scripts/filters.js';

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const logoPath = (file) => join(REPO_ROOT, 'assets', 'logos', file);

describe('강의 이력 데이터', () => {
  test('원본 프로필의 32건이 모두 등록되어 있다', () => {
    assert.equal(LECTURES.length, 32);
  });

  test('id 가 중복되지 않는다', () => {
    const ids = LECTURES.map((lecture) => lecture.id);
    assert.equal(new Set(ids).size, ids.length);
  });

  test('모든 항목이 필수 필드를 갖는다', () => {
    for (const lecture of LECTURES) {
      for (const field of ['id', 'org', 'orgEn', 'period', 'startedAt', 'topic', 'topicKo']) {
        assert.ok(
          typeof lecture[field] === 'string' && lecture[field].length > 0,
          `${lecture.id}: ${field} 누락`,
        );
      }
      assert.ok(Array.isArray(lecture.logos) && lecture.logos.length > 0, `${lecture.id}: logos 누락`);
    }
  });

  test('category 는 CATEGORIES 에 정의된 id 중 하나다', () => {
    for (const lecture of LECTURES) {
      assert.ok(CATEGORY_IDS.includes(lecture.category), `${lecture.id}: 알 수 없는 카테고리`);
    }
  });

  test('startedAt 은 YYYY-MM 형식이다', () => {
    for (const lecture of LECTURES) {
      assert.match(lecture.startedAt, /^\d{4}-(0[1-9]|1[0-2])$/, `${lecture.id}: startedAt 형식 오류`);
    }
  });

  test('참조하는 로고 파일이 모두 존재한다', () => {
    for (const lecture of LECTURES) {
      for (const file of lecture.logos) {
        assert.ok(existsSync(logoPath(file)), `${lecture.id}: assets/logos/${file} 없음`);
      }
    }
  });

  test('대표 로고 스트립의 파일도 모두 존재한다', () => {
    for (const logo of FEATURED_LOGOS) {
      assert.ok(existsSync(logoPath(logo.file)), `assets/logos/${logo.file} 없음`);
    }
  });

  test('모든 카테고리에 최소 1건의 이력이 있다 (빈 필터 칩 방지)', () => {
    for (const category of CATEGORIES) {
      const count = LECTURES.filter((lecture) => lecture.category === category.id).length;
      assert.ok(count > 0, `${category.id}: 해당 이력 없음`);
    }
  });
});

describe('제공 강의 데이터', () => {
  test('세 개 과정이 정의되어 있고 order 가 1..3 이다', () => {
    assert.equal(PRODUCTS.length, 3);
    assert.deepEqual(
      PRODUCTS.map((product) => product.order).sort((a, b) => a - b),
      [1, 2, 3],
    );
  });

  test('각 과정의 category 가 강의 이력과 연결된다', () => {
    for (const product of PRODUCTS) {
      assert.ok(CATEGORY_IDS.includes(product.category), `${product.id}: 알 수 없는 카테고리`);
      assert.ok(
        representativeOrgs(LECTURES, product.category).length > 0,
        `${product.id}: 대표 고객사를 계산할 이력이 없음`,
      );
    }
  });

  // 카드(3개)와 이력 필터 칩(3개)이 다시 어긋나면 페이지 안에서 분류 체계가 둘로 갈린다.
  test('과정과 카테고리가 1:1로 대응한다', () => {
    assert.deepEqual(
      PRODUCTS.map((product) => product.category).sort(),
      [...CATEGORY_IDS].sort(),
    );
  });

  test('필수 서술 필드가 채워져 있다', () => {
    for (const product of PRODUCTS) {
      for (const field of ['title', 'titleEn', 'tagline', 'audience', 'format']) {
        assert.ok(
          typeof product[field] === 'string' && product[field].length > 0,
          `${product.id}: ${field} 누락`,
        );
      }
      assert.ok(product.curriculum.length >= 3, `${product.id}: 커리큘럼 항목 부족`);
    }
  });
});

describe('index.html 과 데이터 일치', () => {
  const html = readFileSync(join(REPO_ROOT, 'index.html'), 'utf8');
  const summary = summarize(LECTURES);

  test('히어로 지표의 정적 fallback 숫자가 계산값과 같다', () => {
    assert.match(html, new RegExp(`data-stat="total">${summary.total}건<`));
    assert.match(html, new RegExp(`data-stat="orgs">${summary.orgCount}개<`));
    assert.match(html, new RegExp(`data-stat="years">${summary.firstYear} – 현재<`));
  });

  test('meta description 의 실적 숫자도 데이터와 같다', () => {
    assert.ok(
      html.includes(`${summary.orgCount}개 기관에서 ${summary.total}건`),
      'meta description 의 건수/기관수가 데이터와 다릅니다',
    );
  });

  test('임베드된 구글 폼 주소가 profile.js 의 링크와 같다', () => {
    assert.ok(html.includes(LINKS.lectureFormEmbed), 'iframe src 가 LINKS.lectureFormEmbed 와 다릅니다');
  });

  // 개인정보를 리터럴로 적으면 이 테스트 파일 자체가 공개 저장소에서 유출 경로가 되므로,
  // 특정 값 대신 "전화번호 형태" 와 "허용된 메일 외 주소" 를 패턴으로 막는다.
  test('전화번호 형태의 문자열이 노출되지 않는다', () => {
    assert.doesNotMatch(
      html,
      /(\+?82[\s-]?)?0?1[0-9][\s-]?\d{3,4}[\s-]?\d{4}/,
      '휴대폰 번호로 보이는 문자열이 있습니다',
    );
  });

  test('노출된 메일 주소는 강의 문의용 계정뿐이다', () => {
    const emails = new Set(html.match(/[\w.+-]+@[\w-]+\.[\w.]+/g) ?? []);
    assert.deepEqual([...emails], [LINKS.email], '허용되지 않은 메일 주소가 노출되어 있습니다');
  });
});

describe('프로필 데이터', () => {
  test('경력 · 학력 · 수상 이력이 비어 있지 않다', () => {
    assert.ok(WORK_EXPERIENCE.length >= 6);
    assert.ok(EDUCATION.length >= 3);
    assert.ok(ACHIEVEMENTS.length >= 5);
  });

  test('모든 외부 링크가 https 이고 강의 문의 메일이 chopsdata 계정이다', () => {
    for (const [key, value] of Object.entries(LINKS)) {
      if (key === 'email') {
        assert.equal(value, 'chopsdata@gmail.com');
        continue;
      }
      assert.match(value, /^https:\/\//, `${key}: https 링크가 아닙니다`);
    }
  });

  test('요약 통계가 실제 데이터와 맞는다', () => {
    const summary = summarize(LECTURES);
    assert.equal(summary.total, LECTURES.length);
    assert.equal(summary.orgCount, distinctOrgs(LECTURES).length);
    assert.equal(summary.firstYear, 2019);
    assert.ok(summary.ongoingCount > 0, '진행 중 표시가 하나도 없습니다');
  });
});

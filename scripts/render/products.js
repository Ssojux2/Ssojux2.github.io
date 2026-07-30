/** 제공 강의 카드 렌더. 대표 고객사는 실제 강의 이력에서 계산한다. */

import { el } from './dom.js';
import { representativeOrgs } from '../filters.js';

function metaRow(key, value) {
  return el('div', { class: 'product-card__meta-row' }, [
    el('span', { class: 'product-card__meta-key', text: key }),
    el('span', { class: 'product-card__meta-value', text: value }),
  ]);
}

function productCard(product, lectures) {
  const clients = representativeOrgs(lectures, product.category, 4);

  return el(
    'article',
    {
      class: product.highlight === true ? 'product-card product-card--highlight' : 'product-card',
    },
    [
      el('div', { class: 'product-card__header' }, [
        el('span', { class: 'product-card__index', text: String(product.order), 'aria-hidden': true }),
        el('div', {}, [
          el('h3', { class: 'product-card__title' }, [
            product.title,
            el('span', { class: 'product-card__title-en', text: product.titleEn }),
          ]),
        ]),
      ]),

      el('p', { class: 'product-card__tagline', text: product.tagline }),

      el(
        'ul',
        { class: 'product-card__list' },
        product.curriculum.map((item) => el('li', { text: item })),
      ),

      el('div', { class: 'product-card__meta' }, [
        metaRow('대상', product.audience),
        metaRow('운영 형태', product.format),
        clients.length > 0 && metaRow('대표 고객사', clients.join(' · ')),
      ]),

      product.note && el('p', { class: 'product-card__note', text: product.note }),

      el('div', { class: 'product-card__actions' }, [
        el('a', { class: 'button button--primary button--sm', href: '#request' }, [
          '이 과정 문의하기',
        ]),
        el(
          'a',
          {
            class: 'button button--secondary button--sm',
            href: '#history',
            dataset: { categoryLink: product.category },
          },
          ['관련 이력 보기'],
        ),
      ]),
    ],
  );
}

export function renderProducts(container, products, lectures) {
  const ordered = [...products].sort((a, b) => a.order - b.order);
  container.replaceChildren(...ordered.map((product) => productCard(product, lectures)));
}

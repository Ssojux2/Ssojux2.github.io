/** 렌더 모듈이 공유하는 최소한의 DOM 헬퍼. */

/**
 * 엘리먼트를 만든다.
 *
 * @param {string} tag
 * @param {Object} [props] class / text / dataset 은 특별 처리하고, 나머지는 속성으로 설정한다.
 *   값이 null · undefined · false 이면 해당 속성을 건너뛴다.
 * @param {Node|string|Array<Node|string|null|false>} [children]
 */
export function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);

  for (const [key, value] of Object.entries(props)) {
    if (value === null || value === undefined || value === false) {
      continue;
    }
    if (key === 'class') {
      node.className = value;
    } else if (key === 'text') {
      node.textContent = value;
    } else if (key === 'dataset') {
      Object.assign(node.dataset, value);
    } else {
      node.setAttribute(key, value === true ? '' : String(value));
    }
  }

  const list = Array.isArray(children) ? children : [children];
  for (const child of list) {
    if (child === null || child === undefined || child === false || child === '') {
      continue;
    }
    node.append(child);
  }

  return node;
}

/** 새 탭으로 여는 외부 링크의 공통 속성 */
export function externalLink(href) {
  return { href, target: '_blank', rel: 'noopener noreferrer' };
}

/** 기관 로고 타일 */
export function logoTile(file, name, { compact = false } = {}) {
  return el('span', { class: compact ? 'logo-tile logo-tile--compact' : 'logo-tile' }, [
    el('img', {
      src: `assets/logos/${file}`,
      alt: `${name} 로고`,
      loading: 'lazy',
      decoding: 'async',
    }),
  ]);
}

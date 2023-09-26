/**
 * @jest-environment jsdom
 */

import { isHTMLElement, isTextAreaElement } from 'utils';

describe('predicates', () => {
  const fragment = document.createDocumentFragment();
  const header = document.createElement('header');
  const textarea = document.createElement('textarea');

  test('Check is header instanceof HTMLElement', () => {
    expect(isHTMLElement(header)).toBeTruthy();
  });

  test('Check is header is not instanceof HTMLTextAreaElement', () => {
    expect(isTextAreaElement(header)).toBeFalsy();
  });

  test('Check is Fragment is not instanceof HTMLElement', () => {
    expect(isHTMLElement(fragment)).toBeFalsy();
  });

  test('Check is null is not instanceof HTMLElement', () => {
    expect(isHTMLElement(null)).toBeFalsy();
  });

  test('Check textarea instanceof HTMLTextAreaElement', () => {
    expect(isTextAreaElement(textarea)).toBeTruthy();
  });
});

/**
 * @jest-environment jsdom
 */

import { makeCodeString } from 'utils';

test(`Make codestring with content '<div class="apple">'`, () => {
  const element = makeCodeString('<div class="apple">');

  expect(element).toBeInstanceOf(HTMLSpanElement);
  expect(element.innerText).toBe('<div class="apple">');
  expect(element.classList.contains('language-html'));
});

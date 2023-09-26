/**
 * @jest-environment jsdom
 */

import { drawElement } from 'utils';
import { IDrawElementProps } from 'types';

describe('drawElement', () => {
  const SINGLE: IDrawElementProps<'a'> = {
    tag: 'a',
    classList: 'anchor',
    attributes: {
      name: 'href',
      value: 'https://example.com',
    },
    innerText: 'Click me!',
  };

  const MULTI: IDrawElementProps<'div'> = {
    tag: 'div',
    classList: ['container', 'mobile'],
    attributes: [
      {
        name: 'data-theme',
        value: 'dark',
      },
      {
        name: 'disabled',
        value: 'true',
      },
    ],
  };

  test('Test with a single class and attribute', () => {
    const element = drawElement(SINGLE);

    expect(element.tagName.toLowerCase()).toBe('a');
    expect(element.classList.contains('anchor')).toBeTruthy();
    expect(element.classList.length).toBe(1);
    expect(element.getAttribute('href')).toBe('https://example.com');
    expect(element.innerText).toBe('Click me!');
  });

  test('Test with multi classes and attributes', () => {
    const element = drawElement(MULTI);

    expect(element.classList.length).toBe(2);
    expect(element.classList.contains('container')).toBeTruthy();
    expect(element.classList.contains('mobile')).toBeTruthy();
    expect(element.getAttribute('data-theme')).toBe('dark');
    expect(element.getAttribute('disabled')).toBe('true');
  });
});

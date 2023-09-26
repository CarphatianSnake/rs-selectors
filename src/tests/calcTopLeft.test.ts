/**
 * @jest-environment jsdom
 */
import { calcTopLeft } from 'utils';

describe('calcTopLeft', () => {
  const helper = document.createElement('div');
  const container = document.createElement('div');
  const outerElement = document.createElement('div');
  const innerElement = document.createElement('div');

  container.append(outerElement);
  outerElement.append(innerElement);

  beforeEach(() => {
    Object.defineProperties(helper, {
      clientWidth: { value: 100 },
      clientHeight: { value: 30 },
    });

    Object.defineProperties(container, {
      clientWidth: { value: 500 },
      offsetWidth: { value: 500 },
    });

    Object.defineProperties(outerElement, {
      offsetLeft: { value: 100, writable: true },
      offsetTop: { value: 100 },
    });

    Object.defineProperties(innerElement, {
      offsetLeft: { value: 50 },
      offsetTop: { value: 50 },
    });
  });

  test('Calculate margins for inner element inside centered outer element', () => {
    const testResult = {
      top: innerElement.offsetTop + outerElement.offsetTop - helper.clientHeight,
      left: innerElement.offsetLeft + outerElement.offsetLeft,
    };

    expect(calcTopLeft(innerElement, container, helper)).toStrictEqual(testResult);
  });

  test('Calculate margins for outer element when left margin + helper width > container width', () => {
    Object.defineProperty(outerElement, 'offsetLeft', { value: 450 });

    const testResult = {
      top: outerElement.offsetTop - helper.clientHeight,
      left: container.clientWidth - helper.clientWidth,
    };

    expect(calcTopLeft(outerElement, container, helper)).toStrictEqual(testResult);
  });
});

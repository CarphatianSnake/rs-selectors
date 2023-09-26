/**
 * @jest-environment jsdom
 */

import { onMouseEvent } from 'utils';
import { OnMouseEventCallback } from 'types';

describe('onMouseEvent test', () => {
  const target = document.createElement('div');
  const parentElement = document.createElement('div');
  const currentTarget = document.createElement('div');

  currentTarget.append(parentElement);
  parentElement.append(target);

  const event = new MouseEvent('click', { bubbles: true });
  Object.defineProperties(event, {
    target: {
      value: target,
    },
    currentTarget: {
      value: currentTarget,
    },
  });

  test('Do callback function calls', () => {
    const callback: OnMouseEventCallback = jest.fn(() => true);

    onMouseEvent(event, callback);

    expect(callback).toBeCalledWith(target, currentTarget);
  });

  test('Test traverse from target to currentTarget', () => {
    const callback: OnMouseEventCallback = jest.fn((t, cT) => t === cT);

    onMouseEvent(event, callback);

    expect(callback).toBeCalledTimes(2);
    expect(callback).toBeCalledWith(target, currentTarget);
    expect(callback).toBeCalledWith(parentElement, currentTarget);
  });

  test('Test stop traversing on callback result === true', () => {
    const callback: OnMouseEventCallback = jest.fn((t) => t.classList.contains('stop'));

    target.classList.add('stop');

    onMouseEvent(event, callback);

    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith(target, currentTarget);
    expect(callback).not.toBeCalledWith(parentElement, currentTarget);
  });
});

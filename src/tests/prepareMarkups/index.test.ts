/**
 * @jest-environment jsdom
 */

import { prepareMarkups } from 'utils';
import { ONE_ELEMENT, ONE_ELEMENT_WITH_CHILD } from './__stubs__';

test('Check markup with 1 element', () => {
  const { markup, data } = ONE_ELEMENT;
  expect(prepareMarkups(markup)).toEqual(data);
});

test('Check markup with 1 element with 1 child', () => {
  const { markup, data } = ONE_ELEMENT_WITH_CHILD;
  expect(prepareMarkups(markup)).toEqual(data);
});
